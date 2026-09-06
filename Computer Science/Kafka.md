---
title: Kafka
tags:
  - cs-learning
---

# Kafka

## High level overview

### What is Kafka?
Kafka is a broker that lets different services send and receive messages to each other.

The main pain point it solves is removing tight coupling between services so that a failure in one service doesn't bring down the entire system

### How it works
Services (producers) generate an event record and pass it to Kafka, which then forwards it to other services (consumers).

An event in Kafka contains a key-value pair, a timestamp, and optional metadata.

Internally, Kafka has topics that group similar events and processes them in parallel.
