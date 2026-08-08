# Fraud Detection Streaming Pipeline — Step by Step

> **Project repo:** `~/Documents/Project/fraud-detection-pipeline/`
> **Resume:** [[Vikas Movva Resume Data Engineering]]
> **Tech:** Kafka, Spark Structured Streaming, Cassandra, PostgreSQL, Prometheus, Grafana, Docker

---

## Overview

A real-time credit card fraud detection pipeline built from scratch. Synthetic transactions stream through Kafka, get evaluated by Spark Structured Streaming against three fraud rules, and the results land in both Cassandra (for low-latency alert lookups) and PostgreSQL (for full audit trail). A custom Python metrics exporter queries Postgres and feeds business KPIs to Prometheus and Grafana.

**Pipeline at a glance:**

```
Transaction Generator → Kafka (3 brokers) → Spark Streaming → {Cassandra, PostgreSQL}
                                                                ↓
                                          Metrics Exporter ← Postgres
                                                                ↓
                                                     Prometheus → Grafana
```

---

## Step 1 — Kafka Cluster (3-Broker)

The entry point of the pipeline. We use Confluent's `cp-kafka:7.6.0` image with Zookeeper coordination.

**What it does:**
- 3 Kafka brokers (`kafka-1`, `kafka-2`, `kafka-3`) form a cluster
- Zookeeper manages broker coordination
- The `transactions` topic has 3 partitions with replication factor 3
- A `kafka-ui` container gives a web UI for topic inspection at `http://localhost:8080`

**Key config in `docker-compose.yml`:**

```yaml
kafka-1:
  image: confluentinc/cp-kafka:7.6.0
  environment:
    KAFKA_BROKER_ID: 1
    KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
    KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka-1:29092,PLAINTEXT_HOST://localhost:9092
    KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 3
```

Each broker advertises two listeners: an internal one (`29092`) for Docker network traffic and an external one (`9092`) for host access.

**Topic creation:**

```bash
docker exec fraud-kafka-1 /usr/bin/kafka-topics \
    --create --bootstrap-server kafka-1:29092,kafka-2:29093,kafka-3:29094 \
    --topic transactions --partitions 3 --replication-factor 3
```

3 partitions means up to 3 concurrent Spark consumers. RF=3 means any single broker can fail without data loss.

---

## Step 2 — Transaction Producer (Python)

File: `producer/transaction_producer.py`

A Python script using `kafka-python` that generates synthetic credit card transactions and publishes them to the `transactions` topic.

**What it generates per transaction:**

| Field | Example | Source |
|-------|---------|--------|
| `transaction_id` | UUID | `uuid.uuid4()` |
| `card_id` | `CARD-1234-5678` | Random 4-digit segments |
| `user_id` | UUID | Persisted per card in `_card_state` |
| `user_name` | `James Smith` | Random first + last name |
| `amount` | `42.99` | Uniform within merchant category range |
| `merchant` | `Amazon` | From 15-merchant list with categories |
| `is_online` | `true` | Inherited from merchant definition |
| `location` | `New York, NY` | From 10-city list (70% reuse last location) |
| `timestamp` | ISO 8601 UTC | `datetime.now(timezone.utc).isoformat()` |

**Fraud injection:**

The producer cycles through 4 fraud types when `--fraud-rate` is set:

- **HIGH_AMOUNT** — amount is forced to $5,000–$15,000
- **OFFLINE_HIGH** — offline merchant, amount $2,000–$8,000
- **GEO_IMPOSSIBILITY** — location jumps to a distant city
- **VELOCITY** — generates rapid-fire transactions for the same card

**Card state tracking:**

The `_card_state` defaultdict tracks per-card metadata so transactions are realistic:
- `last_location_idx` — 70% chance to reuse the last city (realistic behavior)
- `recent_transactions` — list of timestamps within the last 5 minutes (for velocity)
- `user_id` — consistent UUID per card

**Running it:**

```bash
cd producer
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

python transaction_producer.py \
    --bootstrap-servers localhost:9092 \
    --topic transactions \
    --rate 100 \
    --cards 50 \
    --fraud-rate 0.1
```

This produces 100 tx/sec across 50 cards with 10% injected fraud. Messages are keyed by `card_id` so all transactions for a card go to the same Kafka partition (important for ordered processing in Spark).

---

## Step 3 — Spark Structured Streaming (Fraud Detection)

File: `spark/jobs/fraud_detection.py`

The core of the pipeline. A PySpark Structured Streaming job that reads from Kafka, applies fraud detection rules, and writes results to dual sinks.

### 3a — Reading from Kafka

```python
raw = (spark.readStream
    .format("kafka")
    .option("kafka.bootstrap.servers", bootstrap_servers)
    .option("subscribe", topic)
    .option("startingOffsets", "latest")
    .load())

transactions = (raw
    .select(from_json(col("value").cast("string"), TRANSACTION_SCHEMA).alias("data"))
    .select("data.*")
    .withColumn("event_time", to_timestamp(col("timestamp"))))
```

Kafka delivers raw bytes. Spark parses them against `TRANSACTION_SCHEMA` (a `StructType` with 13 fields) and adds an `event_time` column (needed for watermarking in the velocity query).

### 3b — Per-Row Fraud Detection (HIGH_AMOUNT, OFFLINE_HIGH)

Two rules don't need aggregation — they're evaluated per row directly on the stream:

```python
per_row_enriched = (transactions
    .withColumn("alert_type",
        when(col("amount") > 5000, lit("HIGH_AMOUNT"))
        .when((col("is_online") == False) & (col("amount") > 2000), lit("OFFLINE_HIGH"))
        .otherwise(lit("NONE")))
    .withColumn("is_fraudulent", col("alert_type") != "NONE")
    .withColumn("risk_score",
        when(col("amount") > 5000,
            least(lit(30) + (col("amount") - 5000) / 500, lit(50.0)))
        .otherwise(lit(0.0)) +
        when((col("is_online") == False) & (col("amount") > 2000), lit(15.0))
        .otherwise(lit(0.0)))
    .withColumn("risk_score", least(col("risk_score"), lit(100.0)))
    .withColumn("severity",
        when(col("risk_score") >= 70, lit("CRITICAL"))
        .when(col("risk_score") >= 50, lit("HIGH"))
        .when(col("risk_score") >= 30, lit("MEDIUM"))
        .otherwise(lit("LOW"))))
```

**How risk scores work:**

| Rule | Base Score | Scaling | Max |
|------|-----------|---------|-----|
| HIGH_AMOUNT | 30 pts | +1 pt per $500 above $5,000 | 50 pts |
| OFFLINE_HIGH | 15 pts | flat | 15 pts |
| VELOCITY | 25 pts | +5 pts per tx above 5 in window | 100 pts |

Scores are composited and capped at 100. Severity is bucketed:
- LOW: 0–30
- MEDIUM: 30–50
- HIGH: 50–70
- CRITICAL: 70+

### 3c — Velocity Detection (Windowed Aggregation)

A separate streaming query handles the VELOCITY rule, which requires aggregation over a time window:

```python
velocity_alerts = (transactions
    .withWatermark("event_time", "120 seconds")
    .groupBy(
        window(col("event_time"), "60 seconds").alias("time_window"),
        col("card_id"))
    .agg(count("*").alias("velocity_count"),
         spark_max("transaction_id").alias("orig_transaction_id"),
         spark_max("amount").alias("amount"),
         spark_max("merchant").alias("merchant"),
         spark_max("location").alias("location"))
    .filter(col("velocity_count") > 5))
```

**How it works:**
- `withWatermark("event_time", "120 seconds")` — drops events older than 2 minutes to bound state
- `window(col("event_time"), "60 seconds")` — groups transactions into 60-second tumbling windows per card
- `filter(col("velocity_count") > 5)` — flags cards with more than 5 transactions in a 60-second window

The velocity alert gets a synthetic `transaction_id` prefixed with `VELOCITY-` to avoid primary key collisions with the per-row results in PostgreSQL.

### 3d — foreachBatch Sink Writing

Both queries use `foreachBatch` to write each micro-batch to Cassandra + PostgreSQL:

```python
query = (per_row_enriched
    .writeStream
    .foreachBatch(write_batch_to_sinks)
    .outputMode("append")
    .option("checkpointLocation", "/tmp/checkpoint/fraud_per_row")
    .trigger(processingTime="10 seconds")
    .start())
```

**Why foreachBatch?** It treats each micro-batch as a static DataFrame, enabling:
- Multiple sink writes (Cassandra + Postgres) from the same batch
- Complex operations not supported by direct streaming sinks
- Per-batch error handling and logging

The `write_batch_to_sinks` function writes:
1. **All transactions** (fraud + non-fraud) → PostgreSQL `fraud_detection_results`
2. **Fraud alerts only** → Cassandra `fraud_alerts` (via Python driver)
3. **Fraud alerts only** → PostgreSQL `fraud_alerts_audit`

### 3e — Running in local[2] Mode

The Spark job runs in `local[2]` mode (2 threads in a single JVM) rather than cluster mode. This was a deliberate decision after hitting a Spark 3.5 bug (`DataSourceRDDPartition` ClassCastException) when running in cluster mode with Kafka source.

```bash
spark-submit --master local[2] \
    --conf spark.sql.streaming.checkpointLocation=/tmp/checkpoint \
    /opt/spark/jobs/fraud_detection.py \
    kafka-1:29092,kafka-2:29093,kafka-3:29094 transactions
```

### 3f — Cassandra Writes via Python Driver

Instead of the Spark Cassandra connector (which had classpath issues), writes go through the Python `cassandra-driver` directly inside `foreachBatch`:

```python
cluster = CassandraCluster(['cassandra'], port=9042)
session = cluster.connect()
session.execute("USE fraud_detection")
insert_stmt = session.prepare("""
    INSERT INTO fraud_alerts
    (alert_id, transaction_id, card_id, user_id, amount, merchant,
     location, alert_type, severity, risk_score, detected_at, transaction_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
""")
for row in fraud_only.collect():
    session.execute(insert_stmt, (
        uuid_mod.uuid4(), row.transaction_id, row.card_id,
        row.user_id, float(row.amount), row.merchant,
        row.location, row.alert_type, row.severity,
        float(row.risk_score), row.detected_at, row.transaction_time,
    ))
cluster.shutdown()
```

---

## Step 4 — Cassandra Schema

File: `cassandra/init.cql`

Three tables optimized for different access patterns:

```cql
CREATE KEYSPACE fraud_detection
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

-- Main alerts table (PK = alert_id for uniqueness)
CREATE TABLE fraud_alerts (
    alert_id uuid, transaction_id text, card_id text, user_id text,
    amount double, merchant text, location text,
    alert_type text, severity text, risk_score double,
    detected_at timestamp, transaction_time timestamp,
    PRIMARY KEY (alert_id)
);

-- Lookup by card_id (clustering by detected_at DESC for "latest alerts first")
CREATE TABLE alerts_by_card (
    card_id text, detected_at timestamp, alert_id uuid,
    transaction_id text, amount double, merchant text,
    alert_type text, severity text, risk_score double,
    PRIMARY KEY (card_id, detected_at)
) WITH CLUSTERING ORDER BY (detected_at DESC);

-- Daily counter for aggregate stats
CREATE TABLE daily_alert_count (
    date date, alert_type text, alert_count counter,
    PRIMARY KEY (date, alert_type)
);
```

**Why RF=1?** Single-node Cassandra. Production would use RF=3 with `NetworkTopologyStrategy`.

**Why dual tables?** Cassandra requires different primary keys for different query patterns. `fraud_alerts` is for uniqueness; `alerts_by_card` is for "show me the latest alerts for this card."

---

## Step 5 — PostgreSQL Schema

File: `postgres/init.sql`

Three tables for the audit trail:

```sql
-- Every transaction evaluated by the streaming job
CREATE TABLE fraud_detection_results (
    transaction_id VARCHAR(36) PRIMARY KEY,
    card_id VARCHAR(20), user_id VARCHAR(36),
    amount DECIMAL(12,2), merchant VARCHAR(100),
    location VARCHAR(100), is_online BOOLEAN,
    risk_score DECIMAL(5,2), is_fraudulent BOOLEAN,
    alert_type VARCHAR(50),   -- HIGH_AMOUNT, OFFLINE_HIGH, VELOCITY, NONE
    severity VARCHAR(20),     -- LOW, MEDIUM, HIGH, CRITICAL, NULL
    detected_at TIMESTAMPTZ, transaction_time TIMESTAMPTZ
);
-- Indexes on card_id, is_fraudulent, alert_type, detected_at

-- Fraud alerts only (mirrors Cassandra for dual-sink validation)
CREATE TABLE fraud_alerts_audit (
    alert_id VARCHAR(36) PRIMARY KEY,
    transaction_id VARCHAR(36), card_id VARCHAR(20),
    user_id VARCHAR(36), amount DECIMAL(12,2),
    merchant VARCHAR(100), location VARCHAR(100),
    alert_type VARCHAR(50), severity VARCHAR(20),
    risk_score DECIMAL(5,2),
    transaction_time TIMESTAMPTZ, detected_at TIMESTAMPTZ
);
```

**Dual-sink architecture:**

| Sink | What it stores | Why |
|------|---------------|-----|
| Cassandra | Fraud alerts only | Low-latency card-level lookups |
| PostgreSQL `fraud_detection_results` | All transactions (fraud + clean) | Full audit trail, batch analytics |
| PostgreSQL `fraud_alerts_audit` | Fraud alerts only | Mirrors Cassandra for validation |

---

## Step 6 — Custom Metrics Exporter

File: `exporter/metrics_exporter.py`

This is what makes the Grafana dashboard work. Instead of relying on JMX exporters on Kafka brokers (which had authentication issues with the Confluent image), a custom Python service queries PostgreSQL every 10 seconds and exposes business-level KPIs in Prometheus exposition format.

**Architecture:**

```
PostgreSQL ← (query every 10s) ← Metrics Exporter (:9100)
                                        ↓
                                  /metrics endpoint
                                        ↓
                                  Prometheus scrapes
                                        ↓
                                  Grafana dashboard
```

**9 exposed metrics:**

| Metric | Type | Description |
|--------|------|-------------|
| `fraud_detection_total_results` | counter | Total transactions processed |
| `fraud_detection_total_alerts` | counter | Total fraud alerts |
| `fraud_detection_alerts_by_type` | counter (labeled) | Alerts broken down by type |
| `fraud_detection_fraud_rate` | gauge | Current fraud rate (%) |
| `fraud_detection_high_amount_alerts` | counter | HIGH_AMOUNT alert count |
| `fraud_detection_velocity_alerts` | counter | Velocity alert count |
| `fraud_detection_offline_high_alerts` | counter | OFFLINE_HIGH alert count |
| `fraud_detection_kafka_topic_offset` | gauge | Latest Kafka topic end offset |
| `fraud_detection_pipeline_uptime` | counter | Exporter uptime in seconds |

**How it works:**

1. A background thread polls PostgreSQL every 10 seconds
2. Queries `fraud_detection_results` for total/ fraud counts and `fraud_alerts_audit` for alert-type breakdowns
3. Also queries Kafka for the topic's end offset (total messages published)
4. Caches results in a thread-safe dict
5. An HTTP server on port 9100 serves `/metrics` in Prometheus exposition format

**Prometheus exposition output looks like:**

```
# HELP fraud_detection_total_results Total transactions processed
# TYPE fraud_detection_total_results counter
fraud_detection_total_results 805827

# HELP fraud_detection_alerts_by_type Fraud alerts broken down by type
# TYPE fraud_detection_alerts_by_type counter
fraud_detection_alerts_by_type{alert_type="HIGH_AMOUNT"} 30193
fraud_detection_alerts_by_type{alert_type="OFFLINE_HIGH"} 10008
fraud_detection_alerts_by_type{alert_type="VELOCITY"} 3300

# HELP fraud_detection_fraud_rate Current fraud rate percentage
# TYPE fraud_detection_fraud_rate gauge
fraud_detection_fraud_rate 4.99
```

**Why a custom exporter instead of JMX?**

| Approach | Problem |
|----------|---------|
| Kafka JMX Exporter | Confluent image has auth issues with JMX password files |
| Spark UI scraping | Returns HTML, not Prometheus format |
| Custom Postgres exporter | Guaranteed to work, gives business-level metrics (fraud rate, alert breakdowns) that are more meaningful than JVM/JMX metrics |

---

## Step 7 — Prometheus + Grafana

### Prometheus

File: `prometheus/prometheus.yml`

Scrapes two targets:

```yaml
scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'fraud-detection-exporter'
    static_configs:
      - targets: ['metrics-exporter:9100']
```

10-second scrape interval matches the exporter's poll interval, so metrics are always fresh.

### Grafana

Auto-provisioned via file-based configuration:

- **Datasource:** `grafana/datasources/prometheus.yml` — auto-registers Prometheus as a datasource
- **Dashboard:** `grafana/dashboards/fraud-detection.json` — 10-panel dashboard auto-loaded on startup

**10 dashboard panels:**

| Panel | Query | Type |
|-------|-------|------|
| Total Transactions Processed | `fraud_detection_total_results` | stat |
| Total Fraud Alerts | `fraud_detection_total_alerts` | stat |
| Fraud Rate (%) | `fraud_detection_fraud_rate` | stat |
| Kafka Topic Offset | `fraud_detection_kafka_topic_offset` | stat |
| Fraud Alerts by Type | `fraud_detection_alerts_by_type` | timeseries |
| Processing Rate (tx/min, alerts/min) | `rate(...[5m]) * 60` | timeseries |
| HIGH_AMOUNT Alerts | `fraud_detection_high_amount_alerts` | stat |
| Velocity Alerts | `fraud_detection_velocity_alerts` | stat |
| OFFLINE_HIGH Alerts | `fraud_detection_offline_high_alerts` | stat |
| Pipeline Uptime | `fraud_detection_pipeline_uptime` | stat |

Access at `http://localhost:3000` with `admin` / `admin`.

---

## Step 8 — Docker Compose (13 Services)

File: `docker-compose.yml`

| # | Service | Container | Port | Purpose |
|---|---------|-----------|------|---------|
| 1 | zookeeper | fraud-zookeeper | 2181 | Kafka coordination |
| 2 | kafka-1 | fraud-kafka-1 | 9092 | Broker 1 |
| 3 | kafka-2 | fraud-kafka-2 | 9093 | Broker 2 |
| 4 | kafka-3 | fraud-kafka-3 | 9094 | Broker 3 |
| 5 | kafka-ui | fraud-kafka-ui | 8080 | Topic management UI |
| 6 | cassandra | fraud-cassandra | 9042 | Alert storage |
| 7 | postgres | fraud-postgres | 5432 | Audit trail |
| 8 | spark-master | fraud-spark-master | 7077, 8081 | Spark master |
| 9 | spark-worker | fraud-spark-worker | 8082 | Spark worker |
| 10 | spark-job | fraud-spark-job | — | Streaming job |
| 11 | metrics-exporter | fraud-metrics-exporter | 9100 | Custom Prometheus exporter |
| 12 | prometheus | fraud-prometheus | 9090 | Metrics scraping |
| 13 | grafana | fraud-grafana | 3000 | Dashboard UI |

All services share the `fraud-net` Docker bridge network.

**Custom Spark image** (`Dockerfile.spark`): Based on `apache/spark:3.5.1` with pre-baked JARs for Kafka, PostgreSQL, and Cassandra connectors, plus `pip3 install cassandra-driver`. This avoids runtime `--packages` downloads.

---

## Step 9 — Unit Tests

File: `tests/test_pipeline.py`

35 tests across 7 test classes:

```
tests/test_pipeline.py::TestTransactionGenerator       16 tests
tests/test_pipeline.py::TestFraudDetectionRules         4 tests
tests/test_pipeline.py::TestSchemaValidation           4 tests
tests/test_pipeline.py::TestMetricsExporter             4 tests
tests/test_pipeline.py::TestIntegrationScenarios        4 tests
tests/test_pipeline.py::TestDataQuality                 3 tests
```

**What's covered:**

- **Transaction generator** — card ID format, UUID uniqueness, merchant/location validity, fraud injection (all 4 types), velocity state tracking, online/offline distribution
- **Fraud detection rules** — HIGH_AMOUNT threshold, OFFLINE_HIGH threshold, VELOCITY window logic (5 tx in 5 min), risk score computation (all tiers)
- **Schema validation** — PostgreSQL `fraud_detection_results` (13 columns), `fraud_alerts_audit` (12 columns), Cassandra `fraud_alerts` (12 columns), `velocity_counters` (3 columns)
- **Metrics exporter** — Prometheus exposition format, label formatting, fraud rate calculation, metric naming conventions
- **Integration scenarios** — end-to-end fraud flow, Kafka partitioning by `card_id`, 11-stage data flow
- **Data quality** — no null required fields, positive amounts, risk score bounds (0-100)

**Running tests:**

```bash
cd tests
pip install -r requirements.txt
python -m pytest test_pipeline.py -v
```

---

## Step 10 — Verification

File: `scripts/verify-pipeline.sh`

End-to-end verification script that checks:

1. Kafka topics exist and have offsets (message counts per partition)
2. Cassandra `fraud_alerts` table has data
3. PostgreSQL `fraud_detection_results` has alert-type breakdown
4. PostgreSQL `fraud_alerts_audit` has recent fraud alerts

**Sample output (real data from last run):**

```
--- Kafka Topic: transactions (latest offsets) ---
transactions:0:285777
transactions:1:328003
transactions:2:412296

--- Cassandra: Fraud Alerts ---
 count
-------
 29895

--- PostgreSQL: Detection Results ---
  alert_type  | count  | avg_risk
--------------+--------+----------
 NONE         | 765626 |     0.00
 HIGH_AMOUNT  |  30193 |    48.02
 OFFLINE_HIGH |  10008 |    15.00

--- PostgreSQL: Recent Fraud Alerts (last 5) ---
 HIGH_AMOUNT | MEDIUM   |  6592.59 | Best Buy   | Toronto, ON     | 48.19
 HIGH_AMOUNT | MEDIUM   |  8906.94 | Amazon     | Miami, FL       | 37.81
 HIGH_AMOUNT | HIGH     | 12435.66 | Starbucks | Dallas, TX      | 59.87
```

---

## Key Design Decisions

### Why foreachBatch instead of direct streaming sinks?
Treats each micro-batch as a static DataFrame, enabling multiple sink writes (Cassandra + Postgres), complex operations, and per-batch error handling.

### Why local[2] instead of Spark cluster mode?
Spark 3.5 has a `DataSourceRDDPartition` ClassCastException bug when running Kafka source in cluster mode. local[2] runs the job in a single JVM with 2 threads, avoiding the bug.

### Why Python cassandra-driver instead of the Spark Cassandra connector?
The connector had persistent `CassandraSourceUtil$ ClassNotFoundException` issues even with pre-baked JARs. The Python driver writes directly in `foreachBatch` with zero classpath issues.

### Why a custom metrics exporter instead of JMX?
Kafka JMX exporters had authentication issues with the Confluent image (password file problems). The custom exporter queries Postgres directly for business-level KPIs (fraud rate, alert breakdowns), which are more meaningful for a dashboard than raw JVM metrics.

### Why dual sinks (Cassandra + PostgreSQL)?

| Use Case | Sink | Why |
|----------|------|-----|
| Real-time card alert lookup | Cassandra | Optimized for partition-key lookups (`card_id`) |
| Full audit trail / batch analytics | PostgreSQL | Relational queries, joins, aggregations |
| Dashboard metrics | Postgres → Exporter | Business KPIs from structured SQL queries |

### Why Kafka key = card_id?
Ensures all transactions for a given card go to the same partition, preserving per-card ordering. This is critical for the velocity check — events must arrive in timestamp order per card.

---

## Running Everything

### Start

```bash
cd ~/Documents/Project/fraud-detection-pipeline

# Start all 13 services
docker compose up -d

# Create Kafka topics
docker exec fraud-kafka-1 /usr/bin/kafka-topics \
    --create --bootstrap-server kafka-1:29092,kafka-2:29093,kafka-3:29094 \
    --topic transactions --partitions 3 --replication-factor 3

# Start the producer
cd producer && source venv/bin/activate
python transaction_producer.py --bootstrap-servers localhost:9092 \
    --topic transactions --rate 100 --cards 50 --fraud-rate 0.1
```

### Verify

```bash
./scripts/verify-pipeline.sh

cd tests && python -m pytest test_pipeline.py -v
```

### Stop

```bash
# Stop all containers (keep data)
docker compose down

# Stop and wipe all data
docker compose down -v
```

---

## UIs Quick Reference

| Service | URL | Credentials |
|---------|-----|-------------|
| Kafka UI | http://localhost:8080 | None |
| Spark Master UI | http://localhost:8081 | None |
| Spark Worker UI | http://localhost:8082 | None |
| Prometheus | http://localhost:9090 | None |
| Metrics Exporter | http://localhost:9100/metrics | None |
| Grafana | http://localhost:3000 | admin / admin |

---

## Project File Structure

```
fraud-detection-pipeline/
├── docker-compose.yml          # 13 services
├── Dockerfile.spark            # Custom Spark image
├── Dockerfile.exporter         # Custom metrics exporter image
├── producer/
│   ├── transaction_producer.py # Kafka producer
│   └── requirements.txt
├── spark/
│   └── jobs/
│       └── fraud_detection.py  # Spark Structured Streaming job
├── exporter/
│   ├── metrics_exporter.py     # Prometheus metrics exporter
│   └── requirements.txt
├── cassandra/
│   └── init.cql                # Cassandra schema
├── postgres/
│   └── init.sql                # PostgreSQL schema
├── prometheus/
│   └── prometheus.yml          # Scrape config
├── grafana/
│   ├── datasources/            # Prometheus datasource
│   └── dashboards/             # 10-panel dashboard JSON
├── tests/
│   ├── test_pipeline.py        # 35 unit tests
│   └── requirements.txt
└── scripts/
    ├── create-topics.sh
    └── verify-pipeline.sh
```
