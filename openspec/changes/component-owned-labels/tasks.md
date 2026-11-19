# Tasks

## 1. Locale core

- [x] 1.1 `useTranslations(group, defaults, labels)`; `DEFAULT_TRANSLATIONS` deleted; `RixlTranslations` names each component's label type. Evidence: `locale-provider.test.tsx` (6 tests) failed on the old signature, then passed; `git grep DEFAULT_TRANSLATIONS packages apps` finds nothing.

## 2. Components

- [x] 2.1 Pagination defaults in `pagination/pagination-labels.ts`. Evidence: `pagination-labels.test.tsx` and the existing pagination tests pass unchanged.
- [x] 2.2 Breadcrumb default in `breadcrumb/breadcrumb-labels.ts`; no `labels` prop. Evidence: `breadcrumb-labels.test.tsx` unchanged and green.
- [x] 2.3 Field chrome `labels.optional` on `Input`, `InputArea`, `InputGroup`, `Select`; `(optional)` only for `required={false}`. Evidence: `input-field-labels.test.tsx` (20 tests: false, true, undefined, provider, labels beats provider, per component); 8 failed before the prop existed.
- [x] 2.4 `feat(copy-block)!`. Evidence: `copy-block-labels.test.tsx`, `copy-block-tooltip.test.tsx`, `copy-outcomes.test.tsx`, `copy-block.browser.test.tsx` (axe with the tooltip open). Removing `details.cancel()` in `copy-button.tsx` fails "swaps to tooltip.copiedText after a copy, and stays open"; restored.

## 3. Docs

- [x] 3.1 Showcases and notes. Evidence: `apps/docs/src/showcases/__tests__/locale.test.tsx` (copyAction from the provider; `labels` and `aria-label` beat it). The repo's READMEs say nothing about localization, so none changed.

## 4. Verification

- [x] 4.1 dist chunk check: after `vp pack`, "Go to first page", "Rows per page" and "Showing " appear only in `dist/pagination-*.js`; "Copy to clipboard" only in `dist/copy-block-*.js`; "(optional)" only in the shared field chunk `dist/input-field-error-*.js`, imported by `input`, `input-group` and `select`. `dist/button-*.js`, `dist/use-translations-*.js`, `dist/merge-translations-*.js` and `dist/locale-*.js` contain none of the strings.
- [x] 4.2 From `packages/ui`: `vp test --run` 125 files, 1196 tests passed; `vpr knip` clean; `vpr budget` 52.87 kB of 58 kB (JS) and 3.42 kB of 3.5 kB (preset); `vpr publint` "All good!". From the root: `vp check` no warnings or errors in 240 files. `.size-limit.json` unchanged.
