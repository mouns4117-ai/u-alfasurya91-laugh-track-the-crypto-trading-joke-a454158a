// SPDX-License-Identifier: MIT
// Laugh Track: The Crypto Trading Joke Contest — one line about crypto trading life.
// The program writes the entry to /output/entry.txt.
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";

const ENTRY =
  "My trading strategy is simple: buy the dip, hold the bag, and tell my group chat the chart is just consolidating.";

// Fail-fast gate validation: 1–200 characters, a single non-blank line, UTF-8.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

// Empty /output by removing its contents only (never the directory itself).
mkdirSync("/output", { recursive: true });
for (const name of readdirSync("/output")) {
  rmSync(`/output/${name}`, { recursive: true, force: true });
}

writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Post-write read-back verification: what landed must be exactly the entry.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not match the entry");
}
