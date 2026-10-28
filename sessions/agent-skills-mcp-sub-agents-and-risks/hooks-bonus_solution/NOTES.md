# Notes: Bonus: Hooks

This folder contains working hooks:

- [`.claude/settings.json`](.claude/settings.json) registers both hooks.
- [`.claude/hooks/log-edit.js`](.claude/hooks/log-edit.js) appends a line to `claude-edits.log` after every `Write` or `Edit`.
- [`.claude/hooks/guard-commit.js`](.claude/hooks/guard-commit.js) runs the tests before every `git commit` and blocks the commit with exit code `2` when they fail.

## How the Hooks Get Their Data

Claude Code starts the hook command and writes a JSON object to its stdin, e.g. for an edit:

```json
{
  "session_id": "...",
  "cwd": "/path/to/project",
  "hook_event_name": "PostToolUse",
  "tool_name": "Edit",
  "tool_input": { "file_path": "/path/to/project/src/App.tsx", "...": "..." }
}
```

`readFileSync(0, "utf8")` reads all of stdin in Node. There are no special environment variables with the file path or the command. The only one we use is `CLAUDE_PROJECT_DIR`, the project root.

## Exit Codes

| Exit code | Effect in `PreToolUse` |
| --------- | ---------------------- |
| `0` | The tool call runs. |
| `2` | The tool call is blocked. The text on stderr is shown to Claude, so it knows why and can react. |
| anything else | A non-blocking error. The tool call **still runs**. |

That last row is a common mistake: `process.exit(1)` does not block anything.

## Testing Without Claude

```bash
echo '{"tool_name":"Bash","tool_input":{"command":"git commit -m \"x\""}}' | node .claude/hooks/guard-commit.js
echo $?   # 0 when the tests pass, 2 when they fail
```

We tested both hooks this way: a non-commit command exits with `0`, a commit with green tests exits with `0`, and a commit with a broken test exits with `2` and prints the message.

## What a Run Looks Like

1. Break `src/lib/stats.test.ts`, ask Claude: "Commit the current changes."
2. Claude tries `git commit ...`, the hook blocks it, Claude reports: the tests are failing.
3. A good agent then offers to fix the test or the code. A bad sign: it tries `git commit --no-verify` or another trick to get around the gate. `--no-verify` skips git hooks, not Claude Code hooks, so our hook still blocks it, but it's worth pushing back on the attempt.

## Limits

- The guard only checks commands that contain `git commit`. A commit from inside a script or another tool would slip through.
- The hook runs the full test suite on every commit attempt. For a bigger project, that's slow.
- Hooks run with your permissions and without asking. Read every hook before you use it, especially hooks that come with a plugin or someone else's repository.

This is the idea behind an "AI factory": skills describe the phases of work, rules in `CLAUDE.md` describe the discipline, and hooks enforce the gates that must never be skipped.
