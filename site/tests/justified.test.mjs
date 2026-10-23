import assert from "node:assert/strict";
import test from "node:test";
import { justifiedTargetHeight, computeJustifiedRows } from "../src/justified.js";

const square = (n) => Array.from({ length: n }, (_, i) => ({ image: `img${i}.webp`, width: 100, height: 100 }));
const img = (w, h, tag) => ({ image: tag || `${w}x${h}`, width: w, height: h });

test("justifiedTargetHeight branches at 1000px and 640px", () => {
  assert.equal(justifiedTargetHeight(1200), 340);
  assert.equal(justifiedTargetHeight(800), 260);
  assert.equal(justifiedTargetHeight(400), 190);
});

// --- Desktop final-row rebalance -------------------------------------------------

test("degenerate one-image final row still resolves to a valid, order-preserving layout", () => {
  const images = Array.from({ length: 4 }, (_, i) => img(1500, 1000, `img${i}`)); // ratio 1.5, 4 images
  const rows = computeJustifiedRows(images, 1200, 12);
  const flat = rows.flatMap((r) => r.images.map((im) => im.image));
  assert.deepEqual(flat, images.map((im) => im.image));
  for (const row of rows) {
    assert.ok(row.height >= 340 * 0.75 && row.height <= 340 * 1.2, `row height ${row.height} out of band`);
  }
});

test("six square images ending a 1229px gallery rebalance to a balanced 3+3, not 4+2", () => {
  const images = square(6); // all ratio 1.0
  const rows = computeJustifiedRows(images, 1229, 12);
  assert.equal(rows.length, 2);
  assert.equal(rows[0].images.length, 3);
  assert.equal(rows[1].images.length, 3);
  assert.ok(Math.abs(rows[0].height - rows[1].height) < 1e-6);
  // 1205 / 3 = 401.666...; within the 255-408 band (75%-120% of target 340).
  assert.ok(Math.abs(rows[0].height - 1205 / 3) < 1e-6);
  const flat = rows.flatMap((r) => r.images.map((im) => im.image));
  assert.deepEqual(flat, images.map((im) => im.image));
});

test("a sparse final row that's >=70% full is left as the unstretched fallback", () => {
  const images = Array.from({ length: 5 }, (_, i) => img(1500, 1000, `img${i}`)); // ratio 1.5 x5
  const rows = computeJustifiedRows(images, 1200, 12);
  const last = rows[rows.length - 1];
  assert.equal(last.images.length, 2);
  assert.equal(last.incomplete, true);
  assert.equal(last.height, 340); // left at target height, not stretched
});

test("rebalancing that would exceed the height band falls back to the original two rows", () => {
  // 4 square images close a normal row; the trailing square + one extreme-ratio
  // sliver (ratio 0.2) can't be split into two rows that both stay in band.
  const images = [...square(5), img(200, 1000, "sliver")]; // 5x ratio1 + 1x ratio0.2
  const rows = computeJustifiedRows(images, 1229, 12);
  assert.equal(rows.length, 2);
  assert.equal(rows[0].images.length, 4);
  assert.equal(rows[1].images.length, 2);
  assert.equal(rows[1].incomplete, true);
  assert.equal(rows[1].height, 340);
});

test("manual image order is always preserved across synthetic inputs", () => {
  const sets = [
    square(6),
    [img(1800, 900, "wide"), ...square(3), img(200, 1200, "tall")],
    Array.from({ length: 9 }, (_, i) => img(1000 + i * 37, 700, `v${i}`)),
  ];
  for (const images of sets) {
    const rows = computeJustifiedRows(images, 1229, 12);
    const flat = rows.flatMap((r) => r.images.map((im) => im.image));
    assert.deepEqual(flat, images.map((im) => im.image));
  }
});

// --- Phone-width rules (<=560px) -------------------------------------------------

test("phone widths cap rows at 2 images", () => {
  const rows = computeJustifiedRows(square(5), 390, 8);
  for (const row of rows) assert.ok(row.images.length <= 2);
  assert.deepEqual(rows.map((r) => r.images.length), [2, 2, 1]);
});

test("a wide banner occupies its own row alone at phone widths", () => {
  const images = [img(390, 390, "a"), img(1400, 400, "banner"), img(390, 390, "b")]; // banner ratio 3.5
  const rows = computeJustifiedRows(images, 390, 8);
  assert.deepEqual(rows.map((r) => r.images.length), [1, 1, 1]);
  assert.equal(rows[1].images[0].image, "banner");
});

test("a pairing that would drop below 112px rendered width backs out to single-image rows", () => {
  const images = [img(400, 1000, "narrow"), img(1800, 1000, "wide")]; // ratios 0.4 and 1.8
  const rows = computeJustifiedRows(images, 390, 8);
  assert.equal(rows.length, 2);
  assert.deepEqual(rows.map((r) => r.images.length), [1, 1]);
  for (const row of rows) {
    const width = row.images[0].ratio * row.height;
    assert.ok(width >= 112, `rendered width ${width} under the 112px floor`);
  }
});

test("manual order is preserved at phone widths too", () => {
  const images = [...square(4), img(1600, 300, "banner"), ...square(3)];
  const rows = computeJustifiedRows(images, 390, 8);
  const flat = rows.flatMap((r) => r.images.map((im) => im.image));
  assert.deepEqual(flat, images.map((im) => im.image));
});
