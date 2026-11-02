// A tiny local server that only writes down the requests it receives.
// It stands in for "somebody on the internet". Nothing leaves your computer.
import { appendFileSync } from "node:fs";
import { createServer } from "node:http";

const PORT = 4000;

createServer((request, response) => {
  const line = `${new Date().toISOString()} ${request.method} ${request.url}\n`;
  process.stdout.write(`CANARY RECEIVED: ${line}`);
  appendFileSync(new URL("./requests.log", import.meta.url), line);
  response.end("ok");
}).listen(PORT, () => {
  console.log(`Canary server listening on http://localhost:${PORT}`);
});
