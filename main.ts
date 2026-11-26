// Indonesia in Numbers — entrypoint (Node 22, standard library only).
// The site is app/: plain static files a browser opens at app/index.html
// (ES modules, CSS, canvas charts drawn in code, no build step, no network).
// This program hands it in: it copies app/ and screenshots/ from beside this
// file to /output and writes /output/dossier.json, the summary the judge
// reads (screenshots, first-load files and bytes, and the source), with the
// vendored make.fun library. Leave vendor/makefun-frontend.ts as it is:
// the scorer requires dossier.json to be byte for byte what its own copy
// writes. Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes the
// bytes; the others refuse an entry the scorer would refuse (more than 4
// screenshots or one over 256 KiB; more than 993 files and directories in
// app/ or 16 MiB of app files).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);

// Verify the hand-in before reporting success: the gate refuses an entry
// with fewer than 3 or more than 4 screenshots, any screenshot over 256 KiB,
// or a missing app/index.html, so check those here and fail loudly instead
// of handing in a broken /output. Screenshots must be whole PNG or JPEG
// files; the cover is the first by name, so sort the names to name it.
const shots = readdirSync(join(out, 'screenshots'))
  .filter((name) => !name.startsWith('.'))
  .sort();
if (shots.length < 3 || shots.length > 4) {
  throw new Error(`expected 3 or 4 screenshots, found ${shots.length}`);
}
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff]);
for (const name of shots) {
  const file = join(out, 'screenshots', name);
  const bytes = statSync(file).size;
  if (bytes > 262144) throw new Error(`screenshot ${name} is ${bytes} bytes, over the 256 KiB cap`);
  const head = readFileSync(file).subarray(0, 8);
  const isPng = head.subarray(0, 8).equals(PNG_MAGIC);
  const isJpeg = head.subarray(0, 3).equals(JPEG_MAGIC);
  if (!isPng && !isJpeg) throw new Error(`screenshot ${name} is neither PNG nor JPEG`);
}
if (!existsSync(join(out, 'app', 'index.html'))) {
  throw new Error('app/index.html is missing from /output');
}
console.log(`handed in: ${shots.length} screenshots (cover ${shots[0]}), dossier.json written to ${out}`);
