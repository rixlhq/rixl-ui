# Tasks

## 1. Move tests onto Dialog

- [x] 1.1 Alert role unit cases in `dialog/__tests__/dialog-alert.test.tsx`. Evidence: "closes when a DialogClose rendered as a Button is activated", "styles the DialogClose as an outline Button", "keeps the dialog open when a plain Button is activated", "constrains height and scrolls internally without forcing full-screen on mobile", "uses logical text alignment while preserving symmetric centering in RTL".
- [x] 1.2 Alert browser cases in `dialog/__tests__/dialog-alert.browser.test.tsx`. Evidence: "ignores an outside click, then Escape cancels it and restores focus to the trigger", "closes a normal dialog on an outside click", "runs the confirm action without dismissing, and closes on Cancel", "has no WCAG 2.2 AA violations when open". Making the alert role render the plain Base UI dialog root fails the first test.
- [x] 1.3 Edge-sheet unit cases in `dialog/__tests__/dialog-side.test.tsx`. Evidence: "applies the edge surface, drawer easing and width cap", "sets data-side and anchors to the %s edge" (each side), "renders a centered dialog, not an edge sheet, without side", "keeps the right side physical in RTL", "renders the X close button with an sr-only label", header and footer spacing cases. Removing `data-[side=left]:left-0` from `dialogEdgeClasses` fails the left case.
- [x] 1.4 Edge-sheet browser cases in `dialog/__tests__/dialog-side.browser.test.tsx`. Evidence: "keeps the sheet closed until the trigger is clicked, then shows it on the right edge", "closes on the close control and restores focus to the trigger", "closes on Escape and restores focus to the trigger", "has no WCAG 2.2 AA violations when open".
- [x] 1.5 `mobile-overlays.browser.test.tsx` renders alerts and every sheet side with `Dialog`. Evidence: "keeps long alerts inset and their cancel action reachable", "scrolls long %s sheets within a short phone viewport".

## 2. Docs

- [x] 2.1 Fold Sheet into the Dialog showcase ("Alert dialog", "Side sheet"); remove `sheet.tsx` and its registry entry. There was no separate AlertDialog showcase; the Dialog page already had the alert example, now titled "Alert dialog". Evidence: `vpr docs` builds; `git grep -n "@rixl/ui/sheet\|@rixl/ui/alert-dialog" apps` finds nothing.

## 3. Remove the adapters

- [x] 3.1 Delete `alert-dialog/` and `sheet/`, their exports, pack entries and barrel lines. Evidence: `vp pack` emits no `sheet` or `alert-dialog` entry in `dist/`; `git grep -niE "alert-?dialog|sheet" -- packages apps` lists only Dialog's own alert/edge code, tests and docs for them, and Sidebar's comments about its edge panel.

## 4. Gate

- [x] 4.1 `vp check` (258 files formatted, no lint or type errors), `vp test run` (71 files, 682 tests), `vp pack`, `vpx size-limit` (52.95 kB of 58 kB; preset 3.36 kB of 3.5 kB) and `vpr docs` pass. `knip`, `publint` and `lint:suppressions` are not defined as tasks in this checkout, so they were not run.
