# Answers: Agent Transcript

## 1. Label Every Step

Give each numbered step in `TRANSCRIPT.md` one (or more) of these labels:

- **Prompt**: the developer gives an instruction or feedback
- **Reasoning**: Claude explains what it thinks or plans
- **Tool call**: Claude uses a tool (reads a file, runs a command, edits a file)
- **Tool result**: the output of a tool comes back to Claude
- **Permission**: Claude asks before it acts
- **Answer**: Claude reports back to the developer

| Step | Label(s) | What happens (one short sentence) |
| ---- | -------- | --------------------------------- |
| 1    |          |                                   |
| 2    |          |                                   |
| 3    |          |                                   |
| 4    |          |                                   |
| 5    |          |                                   |
| 6    |          |                                   |
| 7    |          |                                   |
| 8    |          |                                   |
| 9    |          |                                   |
| 10   |          |                                   |
| 11   |          |                                   |
| 12   |          |                                   |

## 2. The Loop

An agent works in a loop: **gather context → act → verify → repeat**.

a) Which steps belong to "gather context"?

b) Which steps are "act"?

c) Which steps are "verify"?

d) How many times did Claude go through the loop before giving its final answer?

## 3. Tools

List every tool Claude used and what it used it for.

| Tool | Used for |
| ---- | -------- |
|      |          |

## 4. The Human in the Loop

a) In step 5 and 6, Claude suggests a shortcut. What is the problem with it? Why would the tests still be "green"?

b) Which feature of Claude Code gave the developer the chance to stop it?

c) What could have happened if the developer had picked option 2 ("allow all edits during this session") at the beginning?

d) In step 12, Claude asks the developer to make a decision. Why is this a decision for a human and not for the agent?

## 5. Same Task, Chat AI

Describe how the same bug fix would have looked with a chat AI in the browser.

a) What would the developer have had to copy into the chat?

b) Who would have run the tests?

c) Would the chat AI have suggested the same shortcut? Would anybody have noticed?

## 6. Your Take

Write two or three sentences: what did the agent do better than a chat AI, and what did it still need the developer for?
