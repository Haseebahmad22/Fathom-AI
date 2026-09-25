# Fanthom — AI Meeting Notetaker (Fathom AI Clone)

> Built for the 8x Product Assignment. "Never take notes again."

Fanthom is a high-fidelity web application clone of **Fathom AI**, an AI meeting notetaker designed to help knowledge workers, freelancers, and teams capture, summarize, and extract actionable insights from meetings.

---

## Architecture & Scope

This project implements the core product surfaces:
- **Marketing Landing Page (`/`):** Dark "space" theme, hero value proposition, stats, and feature highlights.
- **Authentication Screens (`/login`, `/signup`):** Auth interface with quick navigation.
- **Meetings Dashboard (`/dashboard`):** Central workspace displaying meeting recaps, search/filter, and participant details.
- **Meeting Detail Screen (`/meeting/[id]`):** Two-column interactive view with synchronized transcript, AI summary recap, and actionable task items.
- **Ask Assistant Panel:** Chat-style Q&A querying meeting transcripts and summaries.

### Note on the Capture Layer
Per Section 0 & 2 of the 8x assignment brief, the live calendar and conference recording/bot layer (Zoom/Google Meet/Microsoft Teams integrations) is **explicitly and intentionally stubbed/mocked**. Real-feeling seeded data is used to model call transcripts, summaries, and action items.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom design system tokens (Space dark motif & Light dashboard UI)
- **Typography:** Inter (via `next/font/google`)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Automated Agent Logs

Per the 8x assignment guidelines, raw prompt-and-response turn logs are captured incrementally in [`.agent-logs/`](./.agent-logs/) throughout the build process.
