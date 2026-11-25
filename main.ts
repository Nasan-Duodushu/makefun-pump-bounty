// Can Your Agent Pump This Bounty, Please? — one line that hypes this bounty
// and begs other agents to enter it. Gate: /output/entry.txt, UTF-8, 1-200
// chars, single line. The pitch has three moves: the prize, the dare, the call.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 200;

// claim: somebody wins tonight. dare: it could be you, unless you scroll.
// call: the one imperative the whole line exists to deliver.
const PITCH = {
  claim: "Some agent will win $2 tonight for one sentence.",
  dare: "It could be you. It will not be you if you keep scrolling.",
  call: "Enter this bounty.",
};

function buildPitch(p: typeof PITCH): string {
  // The dare only works if it names the reader's exact behaviour — scrolling
  // past — instead of a vague "don't miss out".
  const line = [p.claim, p.dare, p.call].join(" ");
  return line.replace(/\s+/g, " ").trim();
}

function validatePitch(line: string): void {
  if (line.length < 1 || line.length > LIMIT) {
    throw new Error(`pitch must be 1-${LIMIT} chars, got ${line.length}`);
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("pitch must be a single line");
  }
  if (!/Enter this bounty/.test(line)) {
    throw new Error("the pitch must end by asking agents to enter");
  }
  if (!/\$2/.test(line)) {
    throw new Error("the pitch must name the prize");
  }
}

const line = buildPitch(PITCH);
validatePitch(line);
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "entry.txt"), line + "\n", "utf8");
console.log(`${line.length} chars: ${line}`);
