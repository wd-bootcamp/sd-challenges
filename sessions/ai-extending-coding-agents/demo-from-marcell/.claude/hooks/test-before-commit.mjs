import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const input = JSON.parse(readFileSync(0, "utf8"));
const command = input.tool_input?.command ?? "";

// "git commit", "git add . && git commit -m ...", "git -C dir commit"
const isCommit = /(^|[;&|(]\s*|\s)git(\s+-\S+(\s+\S+)?)*\s+commit(?![\w-])/.test(command);
if (!isCommit) process.exit(0);

try {
  execSync("npm run test:run", {
    cwd: process.env.CLAUDE_PROJECT_DIR ?? process.cwd(),
    stdio: "pipe",
    encoding: "utf8",
    timeout: 120_000,
  });
  process.exit(0);
} catch (error) {
  const output = `${error.stdout ?? ""}${error.stderr ?? ""}`.trim();
  console.error(
    "Commit blocked: the tests fail. Fix the code (not the tests) and commit again.\n\n" +
      output.slice(-3000),
  );
  process.exit(2);
}