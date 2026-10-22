import fs from 'node:fs';

const MIN_RATIO = 0.3, MAX_RATIO = 3.5;
const files = fs.readdirSync('content/projects').filter((f) => f.endsWith('.json'));
let flagged = 0;
for (const file of files) {
  const data = JSON.parse(fs.readFileSync('content/projects/' + file, 'utf8'));
  (data.blocks || []).forEach((block, blockIndex) => {
    if (block.type !== 'gallery' || (block.layout || 'bento') !== 'justified') return;
    (block.images || []).forEach((image, imageIndex) => {
      if (!image.width || !image.height) return;
      const ratio = image.width / image.height;
      if (ratio < MIN_RATIO || ratio > MAX_RATIO) {
        flagged++;
        console.warn(`${file} blocks[${blockIndex}].images[${imageIndex}] ${image.image}: ratio ${ratio.toFixed(2)} (${image.width}x${image.height}) is outside ${MIN_RATIO}-${MAX_RATIO} and will likely render as a sliver.`);
      }
    });
  });
}
console.log(flagged ? `${flagged} image(s) flagged.` : 'No extreme-aspect-ratio justified-gallery images found.');
