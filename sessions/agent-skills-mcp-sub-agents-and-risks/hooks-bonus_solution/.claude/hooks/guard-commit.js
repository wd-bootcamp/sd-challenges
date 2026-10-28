import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

// Claude Code sends the tool call as JSON on stdin
const input = JSON.parse(readFileSync(0, "utf8"));
const command = input.tool_input?.command ?? "";

if (!/\bgit\s+commit\b/.test(command)) {
  process.exit(0);
}

const result = spawnSync("npm", ["test", "--", "--run"], {
  cwd: process.env.CLAUDE_PROJECT_DIR ?? process.cwd(),
  encoding: "utf8",
  shell: process.platform === "win32",
});

if (result.status !== 0) {
  // exit code 2 blocks the tool call, stderr is shown to Claude
  console.error(
    "Commit blocked: the tests are failing. Run `npm test -- --run`, fix the failing tests, then commit again."
  );
  process.exit(2);
}

process.exit(0);
