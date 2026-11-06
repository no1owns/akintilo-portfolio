// Converts a folder of Figma-exported PNGs (named after their Figma frame) into
// WebP files under public/media, and prints a manifest grouping them by role so a
// human/model can hand-assemble content-JSON blocks. Frame-naming convention:
//   {slug}-{asset}-hero              -- single hero/mockup frame
//   {slug}-{asset}-explorations-NN   -- numbered comparison/process frames
//   {slug}-{asset}-NN                -- numbered final-option frames
//
// Usage:
//   node scripts/import-figma-assets.mjs --slug loft --company loft --staging <dir-of-pngs>
//
// Re-running is safe: it only writes/overwrites the converted WebP files and
// reprints the manifest -- it never touches content JSON.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) { out[a.slice(2)] = argv[i + 1]; i++; }
  }
  return out;
}

const { slug, company, staging } = parseArgs(process.argv.slice(2));
if (!slug || !company || !staging) {
  console.error('Usage: node scripts/import-figma-assets.mjs --slug <slug> --company <companyFolder> --staging <dir-of-pngs>');
  process.exit(1);
}

const outDir = path.join('public/media', company, slug);
fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(staging).filter((f) => f.toLowerCase().endsWith('.png') && f.startsWith(`${slug}-`));
if (files.length === 0) {
  console.error(`No PNGs found in ${staging} matching "${slug}-*.png"`);
  process.exit(1);
}

function parseRole(baseName) {
  // baseName has the slug prefix already stripped by the caller.
  const explorationsMatch = baseName.match(/-explorations-(\d+)$/);
  if (explorationsMatch) return { role: 'explorations', order: Number(explorationsMatch[1]) };
  const heroMatch = baseName.match(/-hero$/);
  if (heroMatch) return { role: 'hero', order: 0 };
  const numberedMatch = baseName.match(/-(\d+)$/);
  if (numberedMatch) return { role: 'option', order: Number(numberedMatch[1]) };
  return { role: 'other', order: 0 };
}

const manifest = { hero: [], explorations: [], option: [], other: [] };

for (const file of files.sort()) {
  const base = path.basename(file, '.png');
  const { role, order } = parseRole(base);
  const outPath = path.join(outDir, `${base}.webp`);
  const info = await sharp(path.join(staging, file)).webp({ quality: 90 }).toFile(outPath);
  manifest[role].push({
    file: base,
    order,
    path: `/media/${company}/${slug}/${base}.webp`,
    width: info.width,
    height: info.height,
    bytes: info.size,
  });
}

for (const role of Object.keys(manifest)) manifest[role].sort((a, b) => a.order - b.order);

console.log(`Imported ${files.length} asset(s) into ${outDir}\n`);
for (const [role, items] of Object.entries(manifest)) {
  if (items.length === 0) continue;
  console.log(`-- ${role} (${items.length}) --`);
  for (const it of items) console.log(`  ${it.path}  ${it.width}x${it.height}  (${it.bytes} bytes)`);
  console.log('');
}
