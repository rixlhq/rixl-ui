# Tasks

## 1. Toaster

- [x] 1.1 Toaster maps Sonner's colour variables to tokens, and rich colours are on by default. Evidence: `toaster.browser.test.tsx` "colours a default toast ...", "gives success, error and warning toasts distinct ...", "tints success toward green ...", "follows a data-theme change ...", "turns rich colours off ..."; `toaster.test.tsx` rich colour tests.
- [x] 1.2 Action, cancel and close buttons match `Button`'s size, radius and focus ring. Evidence: `toaster.browser.test.tsx` "styles the action button ...", "styles the cancel button ...", "shows a focus ring ...".
- [x] 1.3 axe is clean with every toast type open, in both themes. Evidence: `toaster.browser.test.tsx`.
- [x] 1.4 Docs showcase shows warning, info, description and close button. Evidence: `vpr docs` builds.

## 2. Select

- [x] 2.1 The item indicator scales and fades from the selected state. Evidence: `select.test.tsx` "scales and fades the check ...", "keeps the check mounted ..."; `select.browser.test.tsx` "shows the check only on the selected option", "transitions the check in ...".
- [x] 2.2 `SelectItem` uses `cursor-default`. Evidence: `select.test.tsx`, `select.browser.test.tsx` "uses the default cursor on options".
- [x] 2.3 Every leaf forwards a ref and has a `displayName`. Evidence: `select.test.tsx`.

## 3. Gate

- [ ] 3.1 `vp check`, `vp test run`, `vp pack`, `vpx size-limit` and `vpr docs` pass.
