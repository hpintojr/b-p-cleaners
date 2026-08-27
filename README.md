# B&P Cleaners — Backend Setup & Configuration

*Forked from the AdvantageFirst Financial template and repurposed for Benny & Penny Cleaning Services (residential + commercial cleaning quote estimator and lead gen).*

## Architecture Overview

The site uses a **multi-pipe lead routing system**. When a user submits the quote estimator form or subscribes to the newsletter, data fires to **all enabled backends simultaneously**. No single backend failure blocks the others.

```text
User submits form
       │
       ▼
  /api/submit-lead  (or /api/subscribe-newsletter)
       │
       ▼
  lib/backends/index.ts  ← Orchestrator
       │
       ├── Supabase?     → INSERT into your table
       ├── GHL Webhook?  → POST to your workflow URL
       ├── GHL API?      → Create contact via REST
       └── Salesforce?   → Web-to-Lead or REST API
```

**Key files:**

| File | Purpose |
| --- | --- |
| `lib/backendconnect.ts` | Enable/disable backends + connection credentials |
| `lib/backendcolumns.ts` | Customize field names per backend |
| `lib/backends/index.ts` | Routing orchestrator (don't edit unless adding a new backend) |
| `lib/leadTypes.ts` | Lead data type definitions |
| `lib/newsletterTypes.ts` | Newsletter subscriber type definitions |

---

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and fill in your values
3. Run the dev server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

---

## Project status

This repo currently holds the **unmodified AdvantageFirst lender template**, imported as a starting point. It has not yet been restyled or repurposed for cleaning services. See the workspace project overview (`My Workspace/02 Projects/B&P Cleaners/B&P Cleaners Overview.md`) for the branding spec, estimator pricing logic, DB schema, and GHL architecture this will be rebuilt against.

**Known rename still needed:** several internal identifiers (e.g. `AFF-000001` quote-ID prefix, `advantagefirst.com/calculator` source strings, lender-specific copy in `components/` and `app/`) still reference the original template brand and must be replaced during the restyle pass.
