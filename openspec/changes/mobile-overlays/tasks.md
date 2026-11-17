# Tasks

## 1. Responsive overlays

- [x] 1.1 Add fullscreen phone dialogs, bounded alerts/sheets/popovers/submenus and phone field sizing. Evidence: mobile-overlays.browser.test.tsx tests for bounds, long content, final actions and desktop widths (16 passed); unit suite (340 passed).
- [x] 1.2 Document phone behavior and add long-content dialog example. Evidence: `vp pack` and `vpr docs` passed (docs bundle-size warning).

## 2. Integration

- [x] 2.1 Run vp check, vp test --run, React Doctor and strict OpenSpec validation; results: `vp check` passed; `vp test --run` 392 passed; React Doctor 96/100, no errors, two existing export-pattern warnings; `vpx openspec validate mobile-overlays --strict` passed.

## Device follow-up

- Verify iOS/Android software keyboards, safe-area spacing and touch scrolling on physical hardware; Chromium viewport tests do not verify these.
