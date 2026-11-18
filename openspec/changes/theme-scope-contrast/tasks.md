# Tasks

## 1. Theme scope

- [x] 1.1 Failing browser test: nested `data-theme="dark"` differs from `<html data-theme="dark">`. Evidence: `theme-scope.browser.test.tsx`, 3 of 3 fail before the fix.
- [x] 1.2 Registrations resolve at the element; nested dark and nested light inside dark pass.
- [x] 1.3 `vpr cn:tables` regenerated, cn tests pass.

## 2. Status contrast

- [x] 2.1 Failing axe tests for Badge and Alert `success` and `warning`, both themes. Evidence: `badge.browser.test.tsx`, `alert.browser.test.tsx` fail in light before the fix.
- [x] 2.2 Token values fixed; the Badge exclusion is gone. Evidence: the same tests pass; `toaster.browser.test.tsx` axe still passes in both themes.

## 3. Gate

- [x] 3.1 `vp check`, `vp test run` (74 files, 726 tests), `vp pack`, `vpx size-limit` (preset 3.49 kB of 3.5 kB) and `vpr docs` pass.
