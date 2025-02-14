## Introduction to Pipelining
- **Definition**: Breaking a problem into sequential tasks, each executed by a separate process/processor.
- **Analogy**: Similar to an assembly line, where each stage performs a specific task and passes the result to the next.

---

## Key Concepts

### Loop Unfolding
- **Example**: Summing elements of an array:
  ```c
  for (i=0; i<n; i++) sum += a[i];
  ```
  - **Unfolded** into sequential additions (e.g., `sum += a[0]; sum += a[1]; ...`).
- **Pipeline Implementation**:
  - Each addition is a stage in the pipeline.
  - **Diagram**:
    ```mermaid
    graph LR
    A[a_0] --> P0[P0: Sum]
    P0 --> B[Sum]
    A1[a_1] --> P1[P1: Sum]
    P1 --> B
    A2[a_2] --> P2[P2: Sum]
    P2 --> B
    ```
  - **Sin/Sout**: Input/output ports for passing intermediate results.

---

### Applications of Pipelining
#### a. Frequency Filter
- **Goal**: Remove specific frequencies (e.g., $f_0, f_1, ...$) from a signal.
- **Pipeline Stages**:
  - Each stage removes one frequency.
  - Signal flows left to right.
  ```mermaid
  graph LR
  Signal --> F0[Filter f0] --> F1[Filter f1] --> F2[Filter f2] --> Filtered
  ```

#### b. When to Use Pipelining
1. **Multiple Instances**: Processing multiple problem instances concurrently.
2. **Multi-Operation Data**: Data requiring sequential operations (e.g., filtering).
3. **Early Information Passing**: Start next stage before current stage finishes.

---

## Pipeline Types & Performance

### Type 1 Pipeline
- **Scenario**: Multiple instances of the same problem.
- **Execution Time**: 
  $\text{Time} = m + p - 1 \quad \text{(for  m  instances,  p  stages)}$
- **Space-Time Diagram**:
  ```mermaid
  timeline
    title Type 1 Pipeline (m=3, p=3)
    section Time
      P0 : Inst1, Inst2, Inst3
      P1 : Inst1, Inst2, Inst3
      P2 : Inst1, Inst2, Inst3
  ```

### Type 2 Pipeline
- **Scenario**: Stream of data items requiring sequential processing.
- **Example**: Insertion sort.
  ```mermaid
  graph LR
  Unsorted --> P0[P0] --> P1[P1] --> P2[P2] --> Sorted
  ```

### Type 3 Pipeline
- **Scenario**: Overlapping computations by passing partial results.
- **Example**: Back substitution in linear algebra (pages 25-30).

---

## Example: Insertion Sort
- **Algorithm**:
  1. Numbers enter the pipeline one by one.
  2. Each process compares and swaps to place numbers in order.
- **Bidirectional Configuration**:
  ```mermaid
  graph LR
  Master --> P0 --> P1 --> P2 --> P3 --> P4
  P4 --> P3 --> P2 --> P1 --> P0 --> Master
  ```
- **Time Complexity**: $2n - 1$ cycles for $n$ numbers.

---

## Prime Number Generation
- **Sieve of Eratosthenes**:
  - **Pipeline Stages**:
    1. $P_0$ keeps 2 (prime) and removes multiples.
    2. $P_1$ keeps 3 (prime) and removes multiples, etc.
  - **Terminator Message**: Signals end of input to processes.
  - **Code Snippet**:
    ```c
    recv(&x, prev_process);
    while (1) {
      recv(&number, prev_process);
      if (number == terminator) break;
      if (number % x != 0) send(&number, next_process);
    }
    ```

---

## Solving Linear Equations
### Back Substitution Pipeline
- **Upper-Triangular System**:
  $a_{i,i}x_i = b_i - \sum_{j=0}^{i-1} a_{i,j}x_j$
- **Pipeline Stages**:
  - $P_i$ computes $x_i$ using $x_0, x_1, ..., x_{i-1}$.
  - **Diagram**:
    ```mermaid
    graph LR
    P0[Compute x0] --> P1[Compute x1] --> P2[Compute x2] --> P3[...]
    ```
- **Parallel Code**:
  ```c
  // Process Pi (i > 0)
  for (j=0; j<i; j++) {
    recv(&x[j], Pi-1);
    send(&x[j], Pi+1);
  }
  sum = 0;
  for (j=0; j<i; j++) sum += a[i][j] * x[j];
  x[i] = (b[i] - sum) / a[i][i];
  send(&x[i], Pi+1);
  ```

---

## Computing Platforms
- **Cluster Support**: Pipelines can run on clusters with switched connections.
- **Line Configuration**: Processors arranged linearly for sequential data flow.

---

## Summary of Formulas
4. **Execution Time (Type 1)**:
   $\text{Time} = m + p - 1$
5. **Back Substitution**:
   $x_i = \frac{b_i - \sum_{j=0}^{i-1} a_{i,j}x_j}{a_{i,i}}$

---

> [!NOTE] Key Takeaways
> - **Speedup**: Achieved by overlapping tasks across stages.
> - **Flexibility**: Suitable for stream processing, multiple instances, and partial result passing.
> - **Trade-offs**: Setup latency vs. throughput.
