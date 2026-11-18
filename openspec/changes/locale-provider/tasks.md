# Tasks

## 1. Locale core

- [x] 1.1 `locale/`: translations type and English defaults, `mergeTranslations`, `RixlLocaleProvider`, `useTranslations`; exported as `@rixl/ui/locale` (pack.entry, package.json exports, barrel). Evidence: `locale-provider.test.tsx` and `merge-translations.test.ts` failed on missing modules, then passed; after `vp pack` the context lives in one shared chunk (design D4).
- [x] 1.2 Tests: defaults, override, function strings, instance beats provider, re-render, nested merge, undefined skipped, and the `[property]` merge test. Evidence: replacing `value !== undefined` with `true` in `mergeDefined` fails 3 of them; restored.

## 2. Components

- [x] 2.1 CopyBlock (`feat(copy-block)!`), Empty. Evidence: `copy-block-labels.test.tsx` (7, including the `@ts-expect-error` for `tooltipText`), `empty.test.tsx`.
- [x] 2.2 Input, InputArea, InputGroup, Select field chrome. Evidence: `input-field-labels.test.tsx` (16, four components times four cases).
- [x] 2.3 Sidebar, SidebarTrigger, SidebarRail. Evidence: `sidebar-labels.test.tsx` (9).
- [x] 2.4 Breadcrumb, BreadcrumbEllipsis, DialogCloseButton, TabsList. Evidence: `breadcrumb-labels.test.tsx`, `dialog-labels.test.tsx`, `tabs-labels.test.tsx`.
- [x] 2.5 Pagination on the provider, plus `page` and `showing`. Evidence: `pagination-labels.test.tsx` (6); the existing 51 pagination tests still pass.
- [x] 2.6 Toaster, DatePicker month navigation. Evidence: `toaster-labels.test.tsx`, `date-picker-labels.test.tsx`.

## 3. Docs app

- [x] 3.1 Locale showcase with the Paraglide pattern; `labels` on the affected pages. Evidence: `apps/docs/src/showcases/__tests__/locale.test.tsx`; `vpr docs` builds.

## 4. Verification

- [x] 4.1 From the repo root, `vp check`: no warnings, lint errors or type errors in 234 files. From `packages/ui`: `vp test --run` 108 files, 1018 tests passed (30 browser files, 172 tests, with the existing axe checks); `vp test --coverage --run` passes the floor (all files 97.7% statements); `vp pack` builds; `vpx publint` reports "All good!"; `vpx size-limit` reports 56.42 kB of 58 kB for JS and 3.49 kB of 3.5 kB for the preset, budgets unchanged; `vpr docs` builds. `vpr publint`, `knip`, `lint:suppressions` and `budget` are not defined on this branch.
