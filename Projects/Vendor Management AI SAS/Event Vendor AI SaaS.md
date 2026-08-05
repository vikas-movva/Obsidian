---
title: "Project Pitch: Event Vendor Communication AI SaaS"
date: 2026-08-05
tags: #startup #SaaS #AI #wedding-tech #product-pitch #B2B
---
# Project Pitch: Event Vendor Communication AI SaaS

> [!summary] Executive Summary
> Event planners are drowning in vendor emails, resulting in lost documents, dropped communication ("Reply All" issues), and outdated day-of timelines. 
> **Our Solution:** A B2B SaaS platform that seamlessly decouples event logistics from the standard email inbox using an **AI-powered email bridge** and zero-friction vendor portals.

---

## 1. The Core Problem
Based on deep dives into industry pain points (e.g., `r/weddingplanning`), wedding coordinators and planners face a massive communication bottleneck:
- **Email Volume & Thread Bloat:** 10-20 vendors per event creates hundreds of overlapping threads, burying critical details like meal choices and load-in times.
- **The "Reply All" Drop-Off:** Vendors frequently drop stakeholders from chains, fragmenting the conversation.
- **Scattered Attachments:** Contracts, COIs (insurance), and invoices are lost in email attachments rather than centralized.
- **Multi-Channel Chaos:** Communication is scattered across email, SMS, and Instagram DMs.

---

## 2. The Solution (Phase 1 MVP)

To ensure zero-friction adoption, we aren't forcing users out of their inbox on day one. We are layering intelligent organization on top of it. 

### A. The AI Email Bridge (The Engine)
An intelligent integration that ingests standard emails and structures the data automatically.
- **Event & Entity Reconciliation:** Maps incoming threads to specific events and vendors.
- **Taxonomy & Tagging:** Auto-tags by Vendor Type (Floral, Catering), Intent (Quote, Logistics), and Urgency (High/Low).
- **Structured Extraction:** Pulls dates, dollar amounts, and times out of unstructured text or PDF attachments.
- **Actionable Summaries:** Replaces lengthy email reads with bullet-point decision logs.

### B. Wedding Planner View (Command Center)
A centralized dashboard for the planner to oversee all logistics.
- **Unified Inbox / Activity Stream:** AI-sorted inbox focused on actionable items.
- **Vendor Directory & Status Tracker:** CRM-like grid tracking missing deliverables (e.g., *Waiting on DJ's COI*).
- **Document Vault:** Centralized storage auto-populated by the AI extractor.
- **Master Interactive Timeline:** Dynamic timeline highlighting vendor conflicts.

### C. Vendor View (Magic Link Portal)
A **no-login-required** view for vendors to guarantee adoption.
- **Single Event Snapshot:** A clean, mobile-first view of only *their* responsibilities.
- **One-Click Uploads:** Simple buttons to submit missing COIs, final invoices, or menus.
- **Instant Confirmation Toggle:** One-click confirmation of arrival times without needing to type an email reply.

---

## 3. Extended Capabilities ("The Secret Sauce")

To build a truly sticky product, we must implement these workflow engines:
- **Dual-Direction Email Sync:** Planners reply in the app, but vendors receive a standard email (preserving original threads).
- **Automated "Chaser" Sequences:** Drip campaigns that automatically follow up on missing vendor deliverables.
- **Action Item Generation:** AI converts requests (e.g., "approve cake design") into click-to-approve tasks.
- **Out-of-Band SMS Ingestion:** A dedicated SMS number that pipes vendor text messages directly into the central event log.
- **Human-in-the-Loop Safeguards:** AI-extracted timeline/budget changes require a "Confirm/Reject" click from the planner before updating the master database.

---

## 4. Proposed Technical Architecture

To deliver on this vision efficiently and securely, the MVP tech stack should focus on rapid deployment and stringent data privacy:
- **Frontend / Client UI:** A modular, component-driven **React** architecture for the main Planner Command Center and lightweight Vendor Magic Link portals.
- **AI / NLP Pipeline:** Given the highly sensitive nature of wedding contracts and pricing, we can build the AI extraction engine using self-hosted, local LLMs (utilizing tools like **llama.cpp** or **Hermes Agent** for backend processing). This guarantees zero data leakage to third-party APIs, a massive selling point for high-end planners.

---

## 5. Monetization & Go-To-Market (GTM)

### Tiered Pricing Structure
- **Starter Tier ($29-$49/mo):** ~5 Active Weddings. Includes magic links, basic timeline, and document storage.
- **Pro Tier ($89-$129/mo):** ~25 Active Weddings. Unlocks AI email sync, auto-reminders, and PDF exports.
- **Agency Tier ($249-$399/mo):** Unlimited weddings, multi-user permissions, white-labeled vendor hubs.

### Secondary Revenue Streams
- **Micro-SaaS Pay-Per-Event ($49-$79/event):** Targeted at DIY couples managing 10-15 vendors.
- **Vendor Premium Dashboard ($10-$15/mo):** Consolidates multiple events for vendors working across different planners.

### GTM Strategy: The "Trojan Horse"
Every time a planner adopts our platform, 10-15 vendors interact with our zero-friction Magic Links. Each portal features subtle *"Powered by [App Name]"* branding, serving as a viral loop to acquire new planners and event pros organically.

---

> [!warning] Key Risks to Mitigate
> - **Email Forwarding Friction:** The onboarding OAuth connection (Gmail/Outlook) must be flawless.
> - **Multi-Event Mapping:** The AI must accurately disambiguate when a popular vendor (e.g., a high-end florist) is emailing about multiple weddings simultaneously.
