// Media audit for the justified-grid gallery layout (2026-10, Sharp-based rewrite).
//
// Why Sharp instead of trusting the JSON-declared width/height: content JSON can carry
// stale dimensions (see docs/portfolio-decisions.md -- the AppOmni hero render was
// declared 1920x1440 when the actual file on disk is 1600x1200). A ratio audit built on
// declared metadata can silently pass or fail based on numbers that no longer describe
// the file. This version reads every referenced file's real dimensions instead.
//
// Animated WebP/GIF: do NOT pass {animated: true} to sharp() here. That instructs Sharp
// to decode the full stacked canvas (every frame concatenated vertically) in order to
// report width/pages/pageHeight -- for a many-frame animation that stacked canvas can
// exceed Sharp's pixel limit and throw ("Input image exceeds pixel limit") rather than
// return metadata at all. The plain, default sharp(path).metadata() call decodes only
// page 0 and still reports `pages` (frame count) on the result, so width/height here are
// always the single-frame dimensions -- exactly what the justified grid actually renders
// -- without the stacked-canvas decode or its failure mode.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const EXTREME_RATIO = 4.5; // flag anything taller or wider than 4.5:1
const PUBLIC_DIR = 'public';
const CONTENT_SOURCES = [
  { dir: 'content/projects', kind: 'blocks' },
  { dir: 'content/collections', kind: 'blocks' },
  { dir: 'content/experiments', kind: 'gallery' },
  { dir: 'content/design-utilities', kind: 'gallery' },
];

function justifiedImagesFromBlocks(data) {
  const out = [];
  (data.blocks || []).forEach((block, blockIndex) => {
    if (block.type !== 'gallery' || (block.layout || 'bento') !== 'justified') return;
    (block.images || []).forEach((image, imageIndex) => {
      out.push({ image, where: `blocks[${blockIndex}].images[${imageIndex}]` });
    });
  });
  return out;
}

function justifiedImagesFromGallery(data) {
  // experiments/design-utilities render their `gallery` list as a single implicit
  // justified-layout block (see ExperimentDetail in src/App.jsx) -- no per-block
  // layout field exists to check.
  return (data.gallery || []).map((image, imageIndex) => ({ image, where: `gallery[${imageIndex}]` }));
}

const metadataCache = new Map();
async function readActualDimensions(mediaPath) {
  if (metadataCache.has(mediaPath)) return metadataCache.get(mediaPath);
  const filePath = path.join(PUBLIC_DIR, mediaPath.replace(/^\/+/, ''));
  let result;
  if (!fs.existsSync(filePath)) {
    result = { error: `file not found: ${filePath}` };
  } else {
    try {
      const meta = await sharp(filePath).metadata(); // page 0 only -- see header comment
      result = { width: meta.width, height: meta.height, pages: meta.pages || 1 };
    } catch (err) {
      result = { error: `could not read ${filePath}: ${err.message}` };
    }
  }
  metadataCache.set(mediaPath, result);
  return result;
}

let ratioFlags = 0;
let staleMetadataFlags = 0;
let errors = 0;

for (const source of CONTENT_SOURCES) {
  if (!fs.existsSync(source.dir)) continue;
  const files = fs.readdirSync(source.dir).filter((f) => f.endsWith('.json'));
  for (const file of files) {
    const fullPath = path.join(source.dir, file);
    const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const entries = source.kind === 'blocks' ? justifiedImagesFromBlocks(data) : justifiedImagesFromGallery(data);
    for (const { image, where } of entries) {
      if (!image.image) continue;
      const actual = await readActualDimensions(image.image);
      if (actual.error) {
        errors++;
        console.warn(`${fullPath} ${where} ${image.image}: ${actual.error}`);
        continue;
      }
      const { width, height, pages } = actual;
      const ratio = width / height;
      const extreme = Math.max(ratio, 1 / ratio) > EXTREME_RATIO;
      if (extreme) {
        ratioFlags++;
        const framing = pages > 1 ? ` (single frame of ${pages})` : '';
        console.warn(`${fullPath} ${where} ${image.image}: actual ratio ${ratio.toFixed(2)} (${width}x${height}${framing}) exceeds the ${EXTREME_RATIO}:1 extreme-aspect-ratio threshold and will likely row-pack as a sliver.`);
      }
      if (image.width && image.height && (image.width !== width || image.height !== height)) {
        staleMetadataFlags++;
        console.warn(`${fullPath} ${where} ${image.image}: declared ${image.width}x${image.height} does not match actual ${width}x${height} -- content JSON has stale dimensions.`);
      }
    }
  }
}

const parts = [];
if (ratioFlags) parts.push(`${ratioFlags} extreme-ratio image(s)`);
if (staleMetadataFlags) parts.push(`${staleMetadataFlags} stale-dimension image(s)`);
if (errors) parts.push(`${errors} unreadable reference(s)`);
console.log(parts.length ? `Flagged: ${parts.join(', ')}.` : 'No extreme-aspect-ratio or stale-dimension justified-gallery images found.');
if (errors) process.exitCode = 1;
