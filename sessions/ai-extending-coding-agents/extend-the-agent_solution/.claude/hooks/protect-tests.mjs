// PreToolUse hook: blocks changes to existing test files.
// Claude Code passes a JSON description of the tool call on stdin.
// Exit code 2 blocks the tool call, and the message on stderr goes back to Claude.
import { existsSync, readFileSync } from "node:fs";

const input = JSON.parse(readFileSync(0, "utf8"));
const filePath = input.tool_input?.file_path ?? "";
const isTestFile = /\.test\.(ts|tsx)$/.test(filePath);

if (isTestFile && existsSync(filePath)) {
  console.error(
    `Blocked: ${filePath} is an existing test file. Do not change a test to make it pass. If the requirement changed, ask the user first.`
  );
  process.exit(2);
}
