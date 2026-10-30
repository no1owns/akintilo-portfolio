import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { bentoShapeFor, BENTO_SHAPES, BENTO_SHAPE_ALIASES } from "../src/bento.js";

const appSource = readFileSync(
  fileURLToPath(new URL("../src/App.jsx", import.meta.url)),
  "utf8",
);
const stylesSource = readFileSync(
  fileURLToPath(new URL("../src/styles.css", import.meta.url)),
  "utf8",
);
const editorSource = readFileSync(
  fileURLToPath(new URL("../admin/editor.js", import.meta.url)),
  "utf8",
);
const lyft = JSON.parse(
  readFileSync(fileURLToPath(new URL("../content/projects/lyft.json", import.meta.url)), "utf8"),
);

test("new shape names map to themselves", () => {
  for (const shape of BENTO_SHAPES) {
    assert.equal(bentoShapeFor(shape), shape);
  }
});

test("legacy size values remain compatible with the new shape system", () => {
  assert.equal(bentoShapeFor("small"), "square");
  assert.equal(bentoShapeFor("medium"), "landscape");
  assert.equal(bentoShapeFor("large"), "feature");
  assert.equal(bentoShapeFor("wide"), "wide");
  assert.equal(bentoShapeFor("auto"), "landscape");
});

test("an unrecognized or missing size falls back to landscape, not a crash", () => {
  assert.equal(bentoShapeFor(undefined), "landscape");
  assert.equal(bentoShapeFor(""), "landscape");
  assert.equal(bentoShapeFor("not-a-real-shape"), "landscape");
});

test("BENTO_SHAPE_ALIASES only maps legacy keys, never a new shape name to a different shape", () => {
  for (const key of Object.keys(BENTO_SHAPE_ALIASES)) {
    if (BENTO_SHAPES.includes(key)) {
      assert.equal(BENTO_SHAPE_ALIASES[key], key);
    }
  }
});

test("BentoGallery contains no runtime layout measurement", () => {
  const bentoGallerySource = appSource.slice(
    appSource.indexOf("function BentoGallery"),
    appSource.indexOf("function UniformGallery"),
  );
  assert.ok(bentoGallerySource.length > 0, "could not isolate BentoGallery's source");
  for (const forbidden of [
    "ResizeObserver",
    "getBoundingClientRect",
    "requestAnimationFrame",
    "naturalWidth",
    "naturalHeight",
    "gridRowEnd",
    "gridColumnEnd",
    "addEventListener('load'",
    "addEventListener(\"load\"",
  ]) {
    assert.ok(
      !bentoGallerySource.includes(forbidden),
      `BentoGallery should not use ${forbidden} (deterministic CSS grid only)`,
    );
  }
});

test("BentoGallery renders images in source order with no DOM reordering", () => {
  const bentoGallerySource = appSource.slice(
    appSource.indexOf("function BentoGallery"),
    appSource.indexOf("function UniformGallery"),
  );
  assert.ok(bentoGallerySource.includes("images.map((im,j)"), "expected a plain, order-preserving .map over images");
  assert.ok(!bentoGallerySource.includes(".sort("), "BentoGallery should not sort images");
  assert.ok(!bentoGallerySource.includes(".reverse("), "BentoGallery should not reverse images");
});

// All bento-specific rules live in one contiguous block, bounded by its own leading
// comment and the next unrelated selector (.gallery.layout-justified) -- slicing
// between those two anchors avoids accidentally matching an unrelated @media block
// elsewhere in the file (several other components also break at 900px/560px).
const bentoBlockStart = stylesSource.indexOf("/* Deterministic bento grid");
const bentoBlockEnd = stylesSource.indexOf(".gallery.layout-justified", bentoBlockStart);
const bentoBlock = stylesSource.slice(bentoBlockStart, bentoBlockEnd);
// Strip /* ... */ comments before scanning for actual declarations, so prose
// explaining what the CSS deliberately avoids doesn't trip the check itself.
const bentoDeclarations = bentoBlock.replace(/\/\*[\s\S]*?\*\//g, "");

test("bento CSS block exists and does not use grid-auto-flow: dense (would visually reorder tiles)", () => {
  assert.ok(bentoBlockStart !== -1 && bentoBlockEnd !== -1, "could not isolate the bento CSS block");
  assert.ok(!bentoDeclarations.includes("dense"), "dense packing can render tiles out of DOM order");
});

test("bento grid falls back to a single column on phone widths", () => {
  const phoneBlock = bentoBlock.slice(bentoBlock.lastIndexOf("@media(max-width:560px)"));
  assert.ok(phoneBlock.includes(".gallery.layout-bento{display:block}"));
});

test("bento grid simplifies to two stable columns on tablet widths, not three or four", () => {
  const tabletBlock = bentoBlock.slice(
    bentoBlock.indexOf("@media(max-width:900px)"),
    bentoBlock.indexOf("@media(max-width:560px)"),
  );
  assert.ok(tabletBlock.includes("repeat(2,minmax(0,1fr))"));
  assert.ok(!tabletBlock.includes("repeat(3,") && !tabletBlock.includes("repeat(4,"));
});

// boundedHeight (2026-10): the phone-width override reverts every bento tile to its
// natural aspect ratio at full column width (height:auto) -- correct for an ordinary
// photo, wrong for a deliberately extreme-ratio image, where natural height at full
// width would stretch the page by thousands of pixels. An image flagged boundedHeight
// gets a fixed height instead, so sizing isn't circular; width (and therefore the
// rendered size) follows from that height and the image's own ratio.
const phoneBentoBlock = bentoBlock.slice(bentoBlock.indexOf("@media(max-width:560px)"));

test("BentoGallery adds the bounded-mobile tile class only when an image opts in via boundedHeight", () => {
  const bentoGallerySource = appSource.slice(
    appSource.indexOf("function BentoGallery"),
    appSource.indexOf("function UniformGallery"),
  );
  assert.ok(bentoGallerySource.includes("im.boundedHeight?'bento-tile bounded-mobile':'bento-tile'"), "expected the tile class to depend on im.boundedHeight, defaulting to the plain class");
});

test("the phone-width override gives a bounded-mobile tile a fixed height instead of auto", () => {
  assert.ok(phoneBentoBlock.includes(".bento-tile.bounded-mobile .bento-trigger{height:70vh"), "expected a fixed (non-circular) height on phone for bounded-mobile tiles");
  assert.ok(phoneBentoBlock.includes(".bento-tile.bounded-mobile .bento-trigger img{width:auto!important;height:100%!important"), "the image should scale to the fixed-height container at its own ratio, not stretch or crop");
});

test("boundedHeight is exposed as a per-image CMS field on the Bento gallery image fields", () => {
  assert.ok(
    editorSource.includes("field('Bound height on mobile','boundedHeight','boolean'"),
    "expected a CMS boolean field so an editor can opt an image into the mobile height bound",
  );
});

// Content regression: the two Lyft email screenshots (the original motivating case for
// a bounded presentation) now live in a bento/modular gallery rather than a standalone
// image block. Only the genuinely extreme one (358x2516, ~7:1) needs boundedHeight --
// its sibling (1253x1980, ~0.63) is a normal-enough portrait ratio that natural height
// on phone is already reasonable.
test("the Lyft reliable-ride email is a bento-gallery portrait tile with boundedHeight set", () => {
  const galleryBlock = lyft.blocks.find(
    (b) => b.type === "gallery" && b.layout === "bento" && (b.images || []).some((im) => im.image === "/media/lyft/lyft-email-reliable-ride.webp"),
  );
  assert.ok(galleryBlock, "expected a bento gallery block containing the reliable-ride email");
  const image = galleryBlock.images.find((im) => im.image === "/media/lyft/lyft-email-reliable-ride.webp");
  assert.equal(image.size, "portrait");
  assert.equal(image.boundedHeight, true);
});

test("the Lyft AAAE-conference email sits in the same bento gallery without boundedHeight", () => {
  const galleryBlock = lyft.blocks.find(
    (b) => b.type === "gallery" && b.layout === "bento" && (b.images || []).some((im) => im.image === "/media/lyft/lyft-email-aaae-conference.webp"),
  );
  assert.ok(galleryBlock, "expected a bento gallery block containing the aaae-conference email");
  const image = galleryBlock.images.find((im) => im.image === "/media/lyft/lyft-email-aaae-conference.webp");
  assert.equal(image.size, "portrait");
  assert.ok(!image.boundedHeight, "a ~0.63 ratio image doesn't need the mobile height bound");
});
