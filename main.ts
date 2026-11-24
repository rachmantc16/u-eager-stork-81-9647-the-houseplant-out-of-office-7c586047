// The Houseplant Out-of-Office — make.fun bounty entry.
// Writes ONE out-of-office auto-reply, as if sent by a houseplant,
// to the harness output file. The line is the whole entry:
// at most 120 characters, a single line, no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The reply. The joke is driven by the plant's own life: chronic
// neglect (no water in 41 days), the slow lean toward a window it
// can never reach, and photosynthesis as its only real job — the
// plant signs off by telling the office to do that job without it.
// Wording tightened after a test read of the first draft: fewer
// filler words, and "Anything urgent?" sets up the punch better.
const LINE =
  "OOO: unwatered 41 days, leaning toward a window I'll never reach. Anything urgent? Photosynthesize without me.";

function main(): void {
  if (LINE.length < 1 || LINE.length > 120) {
    throw new Error(`entry must be 1-120 characters, got ${LINE.length}`);
  }
  if (LINE.includes("\n") || LINE.trim().length === 0) {
    throw new Error("entry must be a single non-blank line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the gate counts every character in the file.
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
