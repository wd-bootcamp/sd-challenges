# Notes: Controls Rally

Exact numbers depend on your plan, your Claude Code version and the conversation. These are the answers to look for.

## Station 1: Model

`/model` shows the active model (on the Pro plan usually Opus) and the alternatives, for example Sonnet and Haiku. Smaller models are faster and use less of your usage limit.

## Station 2: Context

`/context` shows the used tokens out of the context window, split into categories such as the system prompt, tools, memory files (`CLAUDE.md`) and messages. At the start of a session, the system prompt and the tool definitions usually take up the most. After Claude read a few files, the messages grow.

## Station 3: Shell Mode

10 tests pass. Claude can answer the follow-up question because the output of `!npm test -- --run` became part of the conversation. Shell mode saves a model turn: the command runs directly, and Claude only reads the result.

## Station 4: File Mentions

`@` adds the file to your message. Claude doesn't need to search for it, which is faster and more precise.

## Station 5: Interrupt

`Esc` stops Claude immediately. The task is not finished: maybe a part of `EXPLANATION.md` was written, maybe nothing. The conversation keeps everything that happened so far, so Claude continues with the new instruction from there. You don't need to start over.

## Station 6: Rewind

- The rewind menu lists your earlier prompts. For the selected point, you can restore the code, the conversation, or both (the exact wording depends on your version).
- After restoring the code, the comment in `App.tsx` is gone.
- `hello.txt` stays. Checkpoints only track edits made with Claude's file editing tools. Changes made by shell commands (like `echo ... > hello.txt`, `npm install` or `rm`) are not tracked. That's why you still need git as your safety net.

## Station 7: Plan Mode vs. Manual Mode

In plan mode, Claude reads files and writes a plan, but it doesn't edit anything. When you approve the plan, Claude asks how to continue: with automatic approval of edits or with manual approval. With manual approval (Manual mode), every edit shows a diff and waits for your answer.

## Station 8: Find a Command

- `/usage` shows how much of your usage limit is left and when it resets. `/cost` is an alias.
- Many answers are possible, for example `/export` (save the conversation to a file), `/status` (version, account, model) or `/memory` (open the memory files).

## Station 9: Continue Later

- `claude -c` continues the most recent conversation in this folder. You see the earlier messages again.
- `claude -r` opens a list of earlier conversations, so you can pick the one you want to resume.
