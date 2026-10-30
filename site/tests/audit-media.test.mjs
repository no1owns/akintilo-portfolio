// Regression coverage for scripts/audit-gallery-ratios.mjs's exit code. This runs the
// script for real, as a subprocess, against a disposable fixture content/media tree --
// not a unit test of an extracted pure function -- because the thing being guaranteed
// here is specifically the process exit code CI/npm actually see, and that's easy to
// silently break again (e.g. by adding a new flag category and forgetting to fold it
// into the final `if (...) process.exitCode = 1` check).
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import sharp from "sharp";

const scriptPath = fileURLToPath(new URL("../scripts/audit-gallery-ratios.mjs", import.meta.url));

function makeFixture() {
  const dir = mkdtempSync(path.join(tmpdir(), "audit-media-test-"));
  mkdirSync(path.join(dir, "content", "projects"), { recursive: true });
  mkdirSync(path.join(dir, "public", "media"), { recursive: true });
  return dir;
}

function writeProject(dir, images) {
  writeFileSync(
    path.join(dir, "content", "projects", "fixture.json"),
    JSON.stringify({ blocks: [{ type: "gallery", layout: "justified", images }] }),
  );
}

async function writeImage(dir, name, width, height) {
  const filePath = path.join(dir, "public", "media", name);
  await sharp({ create: { width, height, channels: 3, background: { r: 10, g: 10, b: 10 } } }).webp().toFile(filePath);
}

function runAudit(cwd) {
  try {
    const stdout = execFileSync("node", [scriptPath], { cwd, encoding: "utf8" });
    return { status: 0, stdout };
  } catch (err) {
    // execFileSync throws on a non-zero exit code; the actual status/stdout are on the error.
    return { status: err.status, stdout: err.stdout };
  }
}

test("exits 0 and reports clean when every justified-gallery image is within the ratio threshold and matches its declared dimensions", async () => {
  const dir = makeFixture();
  try {
    await writeImage(dir, "ordinary.webp", 1200, 800);
    writeProject(dir, [{ image: "/media/ordinary.webp", width: 1200, height: 800, alt: "ordinary" }]);
    const { status, stdout } = runAudit(dir);
    assert.equal(status, 0);
    assert.match(stdout, /No extreme-aspect-ratio or stale-dimension/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("exits with a non-zero status when an image exceeds the extreme-ratio threshold", async () => {
  const dir = makeFixture();
  try {
    await writeImage(dir, "tall.webp", 100, 1000); // ratio 0.1, well past 4.5
    writeProject(dir, [{ image: "/media/tall.webp", width: 100, height: 1000, alt: "tall" }]);
    const { status, stdout } = runAudit(dir);
    assert.notEqual(status, 0, "an extreme-ratio image should fail the audit, not just warn");
    assert.match(stdout, /extreme-ratio image/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("exits with a non-zero status when declared dimensions don't match the actual file (stale metadata)", async () => {
  const dir = makeFixture();
  try {
    await writeImage(dir, "stale.webp", 1200, 800);
    writeProject(dir, [{ image: "/media/stale.webp", width: 1920, height: 1280, alt: "stale" }]); // wrong, but same ~1.5 ratio
    const { status, stdout } = runAudit(dir);
    assert.notEqual(status, 0, "stale declared dimensions should fail the audit, not just warn");
    assert.match(stdout, /stale-dimension image/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("exits with a non-zero status when a referenced file is missing", () => {
  const dir = makeFixture();
  try {
    writeProject(dir, [{ image: "/media/does-not-exist.webp", width: 100, height: 100, alt: "missing" }]);
    const { status, stdout } = runAudit(dir);
    assert.notEqual(status, 0);
    assert.match(stdout, /unreadable reference/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
