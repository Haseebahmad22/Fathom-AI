# Agent Capture Rule

This repository requires automated capture of all prompts and final model responses for the 8x assignment into `.agent-logs/`.

- The lifecycle hook in `.agents/hooks.json` automatically processes and records turns on `Stop` and `PostInvocation`.
- To ensure continuous synchronization across all sessions and turns, verify that the session log in `.agent-logs/` is updated and committed alongside code changes.
- Never add `.agent-logs/` to `.gitignore`.
- Never edit, tidy, or delete log entries after the fact.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
