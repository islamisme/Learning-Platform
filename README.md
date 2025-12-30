# AI-Powered Web Learning Platform

**A Unified System for Courses, Notes, and AI-Assisted Knowledge Management**

## Overview

This project presents a full-stack web learning platform designed to address fragmentation in modern e-learning environments. Current platforms primarily focus on video delivery and assessments, while personal knowledge construction, note integration, and AI-assisted understanding remain weak or disconnected.

Our platform integrates **career-oriented course discovery**, **course enrollment tracking**, **personal note-taking**, and **embedded AI assistance** into a single, research-driven learning environment. The system is designed not only as a functional prototype, but as a foundation for studying how AI and knowledge management can improve learning outcomes.

---

## Motivation

Students today rely on multiple disconnected tools:

* Online course platforms (Coursera, Udemy) for videos
* PDF readers and external resources for theory
* Separate note-taking applications for understanding and revision

This fragmentation increases cognitive load and prevents learners from building coherent, connected knowledge structures. AI is often added as a standalone chatbot, rather than being embedded meaningfully into the learning workflow.

---


Existing e-learning platforms:

* Are **video-centric**, not knowledge-centric
* Provide weak or no integration between **courses, notes, and resources**
* Use AI in a **shallow, non-contextual** manner

There is a need for a learning system that treats **knowledge construction** as the core process and embeds AI as an assistive cognitive tool.

---
The primary objectives of this project are to:

1. Design a unified learning platform that connects courses, enrollments, and personal knowledge.
2. Integrate AI to assist understanding, summarization, and concept clarification within notes.
3. Organize learning around **career roles**, not isolated courses.
4. Provide a scalable, research-ready architecture suitable for future academic evaluation.

---

## System Architecture

The platform follows a clean, modular full-stack design:

* **Frontend:** React
* **Backend:** PHP 8 (RESTful API)
* **Database:** PostgreSQL

### Core Domains

* Users (authentication, profiles)
* Courses (external & platform-hosted)
* Enrollments (user ↔ course relationship)
* Notes & Tags (personal knowledge management)
* AI Assistance (embedded within note workflows)

---

## Key Features (Implemented)

* Career-based course browsing (Course Store)
* Course enrollment and personalized dashboard
* Enrolled courses tracking
* Course-linked personal notes (Markdown-based)
* AI-assisted note explanation and summarization
* Clean UI with consistent navigation

---

## AI Integration

The platform integrates AI using **research-grade language models** (Mistral AI) not as a chatbot, but as an **embedded learning assistant**.

AI is used to:

* Explain difficult concepts inside notes
* Summarize learning materials
* Support understanding across multiple learning sources

This approach positions AI as a **cognitive aid**, rather than a content generator.



## Future Work

Planned extensions include:

* Obsidian-style bidirectional links between notes, courses, PDFs, and videos
* Personalized knowledge graph visualization
* Instructor-led online courses and dashboards
* Adaptive AI tutors and semantic search
* Learning analytics and collaborative study spaces
* Academic evaluation of learning outcomes and cognitive impact

---

## Project Status

This repository represents a **functional prototype** developed for research and undergraduate competition (UGRF).
Some features are fully implemented, while others are presented as **research-driven future work**.

---

## Team

* Islam Hamdy Mohammed
* Yahya Mohamed
* Mohamed Ashraf Elshamy
* Farida Haitham Elsayed

---

## License

This project is intended for educational and research purposes.

---

If you want, next I can:

* Make a **shorter README (1-page)** for recruiters
* Add **architecture diagrams** text placeholders
* Rewrite it in a **more academic paper-style tone**
* Convert this into your **2-page UGRF submission text**

Just tell me.

# Prerequisites
- Node.js 18+ and npm
- PHP 8+


# How to Run :

- #### Install npm package if you dont have it
```
npm install
```
- #### Then use this command while you in the root directory to run the React front end

```
npm run dev
```
- #### Run the PHP API 
```
php -S localhost:8000 -t backend\php


