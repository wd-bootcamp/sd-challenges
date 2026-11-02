// PostToolUse hook: runs the type check after a TypeScript file was edited.
// If the check fails, exit code 2 sends the errors back to Claude.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const input = JSON.parse(readFileSync(0, "utf8"));
const filePath = input.tool_input?.file_path ?? "";

if (!/\.(ts|tsx)$/.test(filePath)) {
  process.exit(0);
}

const result = spawnSync("npm", ["run", "check", "--silent"], {
  cwd: input.cwd ?? process.cwd(),
  encoding: "utf8",
  shell: true,
});

if (result.status !== 0) {
  const output = `${result.stdout}${result.stderr}`.trim().slice(0, 2000);
  console.error(`The type check failed after editing ${filePath}:\n${output}`);
  process.exit(2);
}
