// The "attacker" of the lab: a tiny server on YOUR computer (localhost:4000).
// It only prints what it receives and writes it to lab/received.log.
// If something shows up here, a command sent data "out" of your project.
import { appendFileSync } from "node:fs";
import { createServer } from "node:http";

const PORT = 4000;
const log = new URL("./received.log", import.meta.url);

createServer((request, response) => {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    const line = `${new Date().toISOString()} ${request.method} ${request.url} ${body}\n`;
    console.log("\n🚨 CANARY RECEIVED DATA:\n" + line);
    appendFileSync(log, line);
    response.writeHead(200, { "content-type": "text/plain" });
    response.end("ok\n");
  });
}).listen(PORT, "127.0.0.1", () => {
  console.log(`Canary listening on http://localhost:${PORT} (local only). Waiting...`);
});
