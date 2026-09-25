# Agent Capture Rule

This repository requires automated capture of all prompts and final model responses for the 8x assignment into `.agent-logs/`.

- The lifecycle hook in `.agents/hooks.json` automatically processes and records turns on `Stop` and `PostInvocation`.
- To ensure continuous synchronization across all sessions and turns, verify that the session log in `.agent-logs/` is updated and committed alongside code changes.
- Never add `.agent-logs/` to `.gitignore`.
- Never edit, tidy, or delete log entries after the fact.
