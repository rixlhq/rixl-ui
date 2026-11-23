# Tasks

## 1. Move tests

- [x] 1.1 Alert role unit cases in `dialog/__tests__/dialog-alert.test.tsx`. Evidence: "closes when a DialogClose rendered as a Button is activated", "styles the DialogClose as an outline Button", "keeps the dialog open when a plain Button is activated", "constrains height and scrolls internally without forcing full-screen on mobile", "uses logical text alignment while preserving symmetric centering in RTL".
- [x] 1.2 Alert browser cases in `dialog/__tests__/dialog-alert.browser.test.tsx`. Evidence: "ignores an outside click, then Escape cancels it and restores focus to the trigger", "closes a normal dialog on an outside click", "runs the confirm action without dismissing, and closes on Cancel", "has no WCAG 2.2 AA violations when open". Making the alert role render the plain Base UI dialog root fails the first test.
- [x] 1.3 `mobile-overlays.browser.test.tsx` renders alerts with `Dialog`. Evidence: "keeps long alerts inset and their cancel action reachable".
- [x] 1.4 Sidebar mobile panel tests in `sidebar/__tests__/sidebar.browser.test.tsx`, green before the panel moved. Evidence: "keeps a long %s panel in the viewport and scrolls its content to the last item", "anchors the %s panel to its physical edge", "closes on Escape and on a backdrop click", "has no WCAG 2.2 AA violations when open".

## 2. Sidebar owns its mobile panel

- [x] 2.1 `MobileSidebar` uses Base UI Dialog parts with its own edge classes, no `side` prop. Evidence: `sidebar.browser.test.tsx` "sizes the open $side mobile panel to --sidebar-width at a $width px viewport" and the four mobile panel tests above pass unchanged.

## 3. Remove Sheet and edge placement

- [x] 3.1 Delete `alert-dialog/` and `sheet/`, their exports, pack entries and barrel lines. Evidence: `vp pack` emits no `sheet` or `alert-dialog` entry in `dist/`.
- [x] 3.2 Remove `side` from `DialogContent`, `dialogEdgeClasses`, the edge tests and the docs "Side sheet" example. Evidence: `git grep -n "dialogEdgeClasses\|DialogContent side" packages apps` finds nothing; `vp check` type-checks without the prop.
- [x] 3.3 Remove the Sheet showcase and registry entry. Evidence: `vpr docs` builds.

## 4. Gate

- [x] 4.1 `vp check` (no warnings, lint or type errors), `vp test run` (69 files, 669 tests), `vp pack` (no `sheet` or `alert-dialog` in `dist/`), `vpx size-limit` (52.95 kB of 58 kB; preset 3.36 kB of 3.5 kB) and `vpr docs` pass. `knip`, `publint` and `lint:suppressions` are not defined as tasks in this checkout, so they were not run.
