// Pure justified-grid packing math, dependency-free (no React/DOM) so it's directly
// unit-testable -- see tests/justified.test.mjs. Mirrors the src/bento.js split that
// already separates the bento grid's shape logic from App.jsx for the same reason.

// Responsive target row heights for the justified grid. Adjust these three
// numbers to change the grid's density; the algorithm below does the rest.
export function justifiedTargetHeight(containerWidth) {
  if (containerWidth >= 1000) return 340;
  if (containerWidth >= 640) return 260;
  return 190;
}

const FINAL_ROW_WIDTH_FRACTION = 0.70; // incomplete final row below this fraction of the container is "sparse"
const ROW_HEIGHT_MIN_FACTOR = 0.75;
const ROW_HEIGHT_MAX_FACTOR = 1.20;
const PHONE_MAX_WIDTH = 560;
const PHONE_MIN_IMAGE_WIDTH = 112;
const RATIO_WARN_MIN = 0.3;
const RATIO_WARN_MAX = 3.5;

function stretchedHeight(items, containerWidth, gap) {
  const totalRatio = items.reduce((sum, item) => sum + item.ratio, 0);
  const availableWidth = containerWidth - (items.length - 1) * gap;
  return availableWidth / totalRatio;
}
function withinHeightBand(height, targetHeight) {
  return height >= targetHeight * ROW_HEIGHT_MIN_FACTOR && height <= targetHeight * ROW_HEIGHT_MAX_FACTOR;
}

// Try every way to split `combined` (order preserved, both sides non-empty) into two
// rows; return whichever split balances the two resulting heights best while keeping
// BOTH within the acceptable band (|heightA-heightB| is the primary score -- a direct
// read of "do these rows belong together" -- deviation-from-target is a deterministic
// tiebreaker). Returns null if nothing qualifies.
function bestTwoRowSplit(combined, containerWidth, gap, targetHeight) {
  let best = null;
  for (let k = 1; k < combined.length; k++) {
    const a = combined.slice(0, k), b = combined.slice(k);
    const heightA = stretchedHeight(a, containerWidth, gap);
    const heightB = stretchedHeight(b, containerWidth, gap);
    if (!withinHeightBand(heightA, targetHeight) || !withinHeightBand(heightB, targetHeight)) continue;
    const balance = Math.abs(heightA - heightB);
    const deviation = Math.abs(heightA - targetHeight) + Math.abs(heightB - targetHeight);
    const better = !best || balance < best.balance - 1e-9 ||
      (Math.abs(balance - best.balance) < 1e-9 && deviation < best.deviation - 1e-9);
    if (better) best = { a, b, heightA, heightB, balance, deviation };
  }
  if (!best) return null;
  return [{ images: best.a, height: best.heightA }, { images: best.b, height: best.heightB }];
}

// Reflow a sparse/incomplete final row together with the row before it. Returns
// replacement row(s), or null meaning "leave the original two rows exactly as they
// were" (the existing left-aligned, unstretched fallback).
function rebalanceFinalRows(prevRow, lastRow, containerWidth, gap, targetHeight) {
  const combined = [...prevRow.images, ...lastRow.images];
  const twoRow = bestTwoRowSplit(combined, containerWidth, gap, targetHeight);
  if (twoRow) return twoRow;
  if (lastRow.images.length === 1) {
    const height = stretchedHeight(combined, containerWidth, gap);
    if (withinHeightBand(height, targetHeight)) return [{ images: combined, height }];
  }
  return null;
}

// Classic justified packing, left to right, closing a row once it reaches the
// container width at target height, then stretching it to fill exactly. Real aspect
// ratios, no cropping, manual order always preserved.
//
// At phone widths (<=560px): rows capped at 2 images; a single image whose own
// target-height width already fills the container becomes a full-width banner row by
// itself; a pairing that would push either image below ~112px rendered width backs
// out into two single-image rows instead.
//
// At desktop/tablet widths: a sparse (<70% of container) incomplete final row is
// rebalanced together with the row before it instead of left alone; if nothing
// improves on it, it renders at target height, left-aligned, unstretched (unchanged
// Adobe Portfolio-style fallback).
export function computeJustifiedRows(images, containerWidth, gap) {
  if (!containerWidth) return [];
  const targetHeight = justifiedTargetHeight(containerWidth);
  const phone = containerWidth <= PHONE_MAX_WIDTH;
  const rows = [];
  let row = [], widthAtTarget = 0;

  const closeRow = (incomplete) => {
    if (!row.length) return;
    const height = incomplete ? targetHeight : stretchedHeight(row, containerWidth, gap);
    rows.push({ images: row, height, incomplete: !!incomplete });
    row = []; widthAtTarget = 0;
  };

  images.forEach((image, index) => {
    const ratio = image.width && image.height ? image.width / image.height : 1.5;
    if (ratio < RATIO_WARN_MIN || ratio > RATIO_WARN_MAX) {
      console.warn(`Justified gallery image ${image.image || index} has an extreme aspect ratio (${ratio.toFixed(2)}); it will likely row-pack as a sliver -- consider cropping or segmenting it.`);
    }
    const item = { ...image, index, ratio };
    const isLast = index === images.length - 1;

    if (phone) {
      const isBanner = ratio * targetHeight >= containerWidth;
      if (isBanner) { closeRow(false); row = [item]; closeRow(false); return; }
      row.push(item);
      if (row.length === 2) {
        const height = stretchedHeight(row, containerWidth, gap);
        const tooNarrow = row.some((r) => r.ratio * height < PHONE_MIN_IMAGE_WIDTH);
        if (tooNarrow) {
          const current = row.pop();
          closeRow(false);
          row = [current];
          if (isLast) closeRow(false);
          return;
        }
        closeRow(false);
        return;
      }
      if (isLast) closeRow(false);
      return;
    }

    row.push(item);
    widthAtTarget += ratio * targetHeight;
    const gapsWidth = (row.length - 1) * gap;
    if (widthAtTarget + gapsWidth >= containerWidth) closeRow(false);
    else if (isLast && row.length) closeRow(true);
  });

  if (!phone && rows.length > 1) {
    const lastRow = rows[rows.length - 1];
    if (lastRow.incomplete) {
      const prevRow = rows[rows.length - 2];
      const occupiedWidth = lastRow.images.reduce((sum, item) => sum + item.ratio * targetHeight, 0) + (lastRow.images.length - 1) * gap;
      const sparse = occupiedWidth / containerWidth < FINAL_ROW_WIDTH_FRACTION;
      if (lastRow.images.length === 1 || sparse) {
        const rebalanced = rebalanceFinalRows(prevRow, lastRow, containerWidth, gap, targetHeight);
        if (rebalanced) rows.splice(rows.length - 2, 2, ...rebalanced);
      }
    }
  }
  return rows;
}
