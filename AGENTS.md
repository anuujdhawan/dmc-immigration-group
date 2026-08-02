<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# DMC Immigration Group — handoff file

Before writing any code in a fresh session or after context compaction, reread in order:

1. `/Users/themacintosh/Documents/My Files/Projects/DM-Consultants/prompts/DMC/DMC_MASTER_PROMPT.md` — permanent project specification and source of truth.
2. `docs/PROGRESS.md` — what is done, current work, next work, blockers, latest test results.
3. `docs/DECISIONS.md` — architectural/content decisions and unresolved `TODO(client)` items.

Also consult `docs/IMPLEMENTATION_PLAN.md` (phases + gates), `docs/ROUTE_INVENTORY.md` (every route, five-market status), `docs/CONTENT_MIGRATION_INVENTORY.md` (old-site crawl/migration dispositions), and `docs/QA_CHECKLIST.md` (acceptance checks) as the work touches them.

Rules of the project: exactly one active environment file (root `.env`, gitignored; committed `.env.example` is documentation only); all five market routes only (`dubai`, `abu-dhabi`, `qatar`, `kuwait`, `india`); `Market` is an audience/office market, never a destination country; no database/CMS/payments/portal/newsletter in v1; verify every immigration fact against official sources and record `lastVerified`; never fabricate credentials, testimonials, approvals, or outcomes. Update `docs/PROGRESS.md` and `docs/DECISIONS.md` after every meaningful batch.
