# Tasks

## 1. Toaster

- [ ] 1.1 Toaster maps Sonner's colour variables to tokens, and rich colours are on by default. Evidence: `toaster.browser.test.tsx` colour tests in light and dark.
- [ ] 1.2 Action, cancel and close buttons match `Button`'s size, radius and focus ring. Evidence: `toaster.browser.test.tsx`.
- [ ] 1.3 axe is clean with every toast type open, in both themes. Evidence: `toaster.browser.test.tsx`.
- [ ] 1.4 Docs showcase shows warning, info, description and close button. Evidence: `vpr docs` builds.

## 2. Select

- [ ] 2.1 The item indicator scales and fades like the menu's. Evidence: `select.test.tsx`.
- [ ] 2.2 `SelectItem` uses `cursor-default`. Evidence: `select.test.tsx`.
- [ ] 2.3 Every leaf forwards a ref and has a `displayName`. Evidence: `select.test.tsx`.

## 3. Gate

- [ ] 3.1 `vp check`, `vp test run`, `vp pack`, `vpx size-limit` and `vpr docs` pass.
