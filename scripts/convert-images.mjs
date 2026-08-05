/**
 * convert-images.mjs — build-time WebP conversion for DMC media assets.
 *
 * Converts every `.jpg`, `.jpeg` and `.png` under `public/media` to WebP
 * (quality 80, max width 1600px, preserving aspect ratio and alpha), then
 * removes the original. Run with `npm run images:convert`.
 *
 * This is a local/build-time script — it never writes to a deployed server
 * filesystem at runtime. Uses `sharp` (already present in the dependency tree).
 *
 * Usage:
 *   node scripts/convert-images.mjs [--dir public/media]
 */

import { readdir, stat, unlink } from "node:fs/promises";
import { join, extname, dirname, basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const TARGET_DIR = resolve(process.argv.includes("--dir") ? process.argv[process.argv.indexOf("--dir") + 1] : join(ROOT, "public/media"));

const INPUT_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);
const QUALITY = 80;
const MAX_WIDTH = 1600;

/** Recursively collect raster images below a directory. */
async function collectImages(dir) {
  const found = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await collectImages(full)));
    } else if (entry.isFile() && INPUT_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      found.push(full);
    }
  }
  return found;
}

async function fileSize(path) {
  try {
    const s = await stat(path);
    return s.size;
  } catch {
    return 0;
  }
}

async function convert(path) {
  const dir = dirname(path);
  const name = basename(path, extname(path));
  const outPath = join(dir, `${name}.webp`);

  const image = sharp(path);
  const metadata = await image.metadata();
  const width = metadata.width ?? 0;

  let pipeline = image;
  // Resize only when the source is wider than the target so large downloads
  // shrink without upscaling small icons/logos.
  if (width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  const before = await fileSize(path);
  await pipeline.webp({ quality: QUALITY, effort: 4 }).toFile(outPath);
  const after = await fileSize(outPath);

  // Only remove the original once the WebP has been written successfully.
  await unlink(path);

  const savedPct = before > 0 ? Math.round((1 - after / before) * 100) : 0;
  console.log(
    `✓ ${path.replace(ROOT + "/", "")}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB  (-${savedPct}%)`,
  );
}

const images = await collectImages(TARGET_DIR);
if (images.length === 0) {
  console.log(`No raster images found under ${TARGET_DIR.replace(ROOT + "/", "")} — nothing to convert.`);
  process.exit(0);
}

console.log(`Converting ${images.length} image(s) under ${TARGET_DIR.replace(ROOT + "/", "")} → WebP (q${QUALITY}, max ${MAX_WIDTH}px)…\n`);

let converted = 0;
let errors = 0;
for (const image of images) {
  try {
    await convert(image);
    converted += 1;
  } catch (error) {
    errors += 1;
    console.error(`✗ FAILED ${image}: ${error.message}`);
  }
}

console.log(`\nDone. ${converted} converted, ${errors} failed.`);
if (errors > 0) process.exitCode = 1;
