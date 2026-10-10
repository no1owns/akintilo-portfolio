// Pure tile-shape logic for the deterministic bento grid, kept dependency-free (no
// React, no import.meta.glob) so it can be unit-tested directly under plain Node, not
// just through Vite. src/App.jsx imports bentoShapeFor from here; tests/bento.test.mjs
// imports the same file directly.
export const BENTO_SHAPES = ['square', 'landscape', 'portrait', 'feature', 'wide'];

// Old content used small/medium/large/wide/auto. New content (and the CMS) write the
// shape name directly. Both keep working -- see docs/portfolio-decisions.md.
export const BENTO_SHAPE_ALIASES = {
  small: 'square',
  medium: 'landscape',
  large: 'feature',
  wide: 'wide',
  auto: 'landscape',
};

export function bentoShapeFor(size) {
  if (BENTO_SHAPES.includes(size)) return size;
  return BENTO_SHAPE_ALIASES[size] || 'landscape';
}
