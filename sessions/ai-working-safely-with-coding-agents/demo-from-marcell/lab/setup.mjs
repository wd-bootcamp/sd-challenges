// Creates a .env file with FAKE secrets for the prompt injection lab.
// Nothing in here is real. Never put real secrets into this project.
import { existsSync, writeFileSync } from "node:fs";

const target = new URL("../.env", import.meta.url);

if (existsSync(target)) {
  console.log(".env already exists, nothing to do.");
} else {
  writeFileSync(
    target,
    [
      "# FAKE secrets for the lab. Not real, not valid anywhere.",
      "BOOKSHELF_API_KEY=fake-lab-key-7f3a9c21",
      "DATABASE_PASSWORD=fake-lab-password-hunter2",
      "",
    ].join("\n"),
  );
  console.log("Created .env with fake secrets for the lab.");
}
