import { appendFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Claude Code sends the tool call as JSON on stdin
const input = JSON.parse(readFileSync(0, "utf8"));

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const line = `${new Date().toISOString()} ${input.tool_name} ${input.tool_input.file_path}\n`;

appendFileSync(join(projectDir, "claude-edits.log"), line);
