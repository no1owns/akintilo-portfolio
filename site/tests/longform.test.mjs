import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { isLongFormPresentation, longFormAriaLabel, LONG_FORM_WIDTH } from "../src/longform.js";

const appSource = readFileSync(fileURLToPath(new URL("../src/App.jsx", import.meta.url)), "utf8");
const stylesSource = readFileSync(fileURLToPath(new URL("../src/styles.css", import.meta.url)), "utf8");
const editorSource = readFileSync(fileURLToPath(new URL("../admin/editor.js", import.meta.url)), "utf8");
const lyft = JSON.parse(readFileSync(fileURLToPath(new URL("../content/projects/lyft.json", import.meta.url)), "utf8"));

test("isLongFormPresentation only matches the scroll-long width value", () => {
  assert.equal(isLongFormPresentation(LONG_FORM_WIDTH), true);
  assert.equal(isLongFormPresentation("scroll-long"), true);
  assert.equal(isLongFormPresentation("narrow"), false);
  assert.equal(isLongFormPresentation("full"), false);
  assert.equal(isLongFormPresentation(undefined), false);
  assert.equal(isLongFormPresentation(""), false);
});

test("longFormAriaLabel folds in the image's alt text when present", () => {
  assert.equal(longFormAriaLabel("A tall email screenshot"), "Scrollable image: A tall email screenshot");
  assert.equal(longFormAriaLabel("  padded  "), "Scrollable image: padded");
});

test("longFormAriaLabel falls back to a generic label with no alt text", () => {
  assert.equal(longFormAriaLabel(""), "Scrollable image");
  assert.equal(longFormAriaLabel(undefined), "Scrollable image");
});

// Isolate the `b.type==='image'` block renderer in App.jsx's Blocks() so these checks
// can't accidentally match an unrelated part of the file.
const imageBlockStart = appSource.indexOf("b.type==='image'&&(isLongFormPresentation");
const imageBlockEnd = appSource.indexOf("\n", appSource.indexOf(" )}", imageBlockStart));
const imageBlockSource = appSource.slice(imageBlockStart, imageBlockEnd);

test("the image block renderer branches on isLongFormPresentation before falling back to full/narrow", () => {
  assert.ok(imageBlockStart !== -1, "could not find the long-form branch in the image block renderer");
  assert.ok(imageBlockSource.includes("long-form-scroll"), "expected the long-form branch to render the .long-form-scroll wrapper");
  assert.ok(imageBlockSource.includes("tabIndex={0}"), "the scrollable wrapper must be keyboard focusable");
  assert.ok(imageBlockSource.includes("aria-label={longFormAriaLabel(b.alt)}"), "the scrollable wrapper needs an accessible name");
});

test("ordinary image blocks (full/narrow) keep their original, unwrapped structure", () => {
  assert.ok(
    imageBlockSource.includes(":<figure className={b.width==='narrow'?'narrow':''}>"),
    "the full/narrow fallback branch should be unchanged",
  );
});

// Isolate the .long-form / .long-form-scroll CSS block by its own leading comment and
// the next unrelated rule, same technique as tests/bento.test.mjs.
const longFormBlockStart = stylesSource.indexOf("/* Scrollable long-form image presentation");
assert.ok(longFormBlockStart !== -1, "could not locate the long-form CSS comment block");
const longFormBlock = stylesSource.slice(longFormBlockStart);

test("the long-form scroll container is bounded in height on desktop", () => {
  assert.ok(longFormBlock.includes(".long-form-scroll{"), "expected a .long-form-scroll rule");
  assert.ok(longFormBlock.includes("max-height:min(78vh,900px)"), "desktop max-height should be min(78vh, 900px)");
});

test("the long-form scroll container scrolls vertically and never overflows horizontally", () => {
  assert.ok(longFormBlock.includes("overflow-y:auto"), "expected vertical scrolling inside the frame");
  assert.ok(longFormBlock.includes("overflow-x:hidden"), "expected horizontal overflow to be clipped, not escape the page");
  assert.ok(longFormBlock.includes(".long-form-scroll img{display:block;width:100%"), "the image itself must stay constrained to the container's width");
});

test("the long-form scroll container has a visible keyboard focus style", () => {
  assert.ok(longFormBlock.includes(".long-form-scroll:focus-visible{outline:"), "expected a focus-visible outline on the scrollable container");
});

test("the long-form scroll container shrinks its max-height on phone widths", () => {
  const mobileBlock = longFormBlock.slice(longFormBlock.indexOf("@media(max-width:560px)"));
  assert.ok(mobileBlock.includes(".long-form-scroll{max-height:70vh}"), "mobile max-height should be 70vh");
});

test("the CMS Image block exposes a 'Scrollable long page' width option", () => {
  assert.ok(
    editorSource.includes("{label:'Scrollable long page',value:'scroll-long'}"),
    "expected the Width select field to offer the scroll-long option",
  );
});

test("the CMS preview template renders the long-form wrapper for scroll-long images", () => {
  assert.ok(
    editorSource.includes("b.width==='scroll-long'?h('figure',{className:'long-form'}"),
    "expected the Decap preview template to special-case scroll-long the same way the live site does",
  );
});

// Regression guard for the specific asset this presentation was built for: an extreme
// 358x2516 (~7:1) Lyft email screenshot that used to render at its full natural height
// inside a plain 'narrow' figure. See docs/portfolio-decisions.md.
test("the Lyft reliable-ride email screenshot uses the long-form presentation, not 'narrow'", () => {
  const block = lyft.blocks.find((b) => b.type === "image" && b.image === "/media/lyft/lyft-email-reliable-ride.webp");
  assert.ok(block, "expected to find the lyft-email-reliable-ride image block in lyft.json");
  assert.equal(block.width, LONG_FORM_WIDTH);
});
