# Tasks

## 1. Move tests onto Dialog

- [ ] 1.1 Alert role unit cases (Cancel closes, centered inset, scroll bounds, RTL, Action stays a Button) in `dialog/__tests__/dialog-alert.test.tsx`.
- [ ] 1.2 Alert browser cases (outside click ignored, Escape cancels with focus restored, Action does not dismiss, Cancel closes, axe) in `dialog/__tests__/dialog-alert.browser.test.tsx`.
- [ ] 1.3 Edge-sheet unit cases (edge classes, `data-side` for each side, RTL, X close button, header and footer padding) in `dialog/__tests__/dialog-side.test.tsx`.
- [ ] 1.4 Edge-sheet browser cases (open, close button restores focus, Escape, axe) in `dialog/__tests__/dialog-side.browser.test.tsx`.
- [ ] 1.5 `mobile-overlays.browser.test.tsx` uses `Dialog` for alerts and sheets.

## 2. Docs

- [ ] 2.1 Fold Sheet and AlertDialog into the Dialog showcase ("Side sheet", "Alert dialog"); remove `sheet.tsx`, `alert-dialog` showcase and their registry entries.

## 3. Remove the adapters

- [ ] 3.1 Delete `alert-dialog/` and `sheet/`, their exports, pack entries and barrel lines; update remaining references.

## 4. Gate

- [ ] 4.1 `vp check`, `vp test run`, `vp pack`, `vpx size-limit` and `vpr docs` pass.
