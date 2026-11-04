# Agent security baseline

Settings that every project of mine has before I start working with a coding agent.

## Checklist

- [ ] `.env` and other secret files are in `.gitignore`
- [ ] `.claude/settings.json` has deny rules for secret files and for network commands
- [ ] I know which mode Claude Code is in (Manual or Plan), and I check it at every start
- [ ] The sandbox is switched on (`/sandbox`) for work on code I do not know. It needs macOS, Linux or WSL2
- [ ] I commit before every task, so `git diff` shows what the agent did
- [ ] I read every command and every diff before I approve
- [ ] I never paste a real secret into a prompt
- [ ] I read new MCP servers, skills, hooks and dependencies before I install them
- [ ] I only use Auto mode for well-scoped tasks in a clean git state, and I review the diff afterwards

## What each layer does and does not do

| Layer                        | Stops                                                                                                                              | Does not stop                                                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Manual mode and my attention | Everything I notice                                                                                                                | Prompts that I approve without reading                                                                                     |
| Deny rules                   | Reads of the listed files with Claude's file tools, the listed commands                                                            | Ways around them, such as `grep -r` or a script the agent writes and runs (they are a guard rail, not a wall)             |
| Sandbox                      | Writes outside the project and network access to hosts that are not allowed, for commands the agent runs and their child processes | Reading files on the computer (by default), the file tools of Claude, MCP servers, hooks, and changes to the project files |
| Git                          | Lost work                                                                                                                          | Data that already left the computer                                                                                        |
