// Pure helper for the bounded, scrollable long-form image presentation (2026-10) --
// for portfolio artwork with an extreme aspect ratio (e.g. a tall email screenshot)
// that shouldn't be stretched down a whole page at its natural height. Dependency-free
// so it's directly unit-testable, mirroring bento.js/justified.js. src/App.jsx imports
// these from here; tests/longform.test.mjs imports the same file directly.
export const LONG_FORM_WIDTH = 'scroll-long';

export function isLongFormPresentation(width) {
  return width === LONG_FORM_WIDTH;
}

export function longFormAriaLabel(alt) {
  const trimmed = (alt || '').trim();
  return trimmed ? `Scrollable image: ${trimmed}` : 'Scrollable image';
}
