# Tasks

## 1. Warning helper

- [x] 1.1 `useWarnMissingName` replaces `warnInputProps`; Input, InputArea and InputGroupInput use it. Evidence: `src/lib/__tests__/warn-missing-name.test.tsx` (6: message, quiet when named, once per instance, per instance, later removal, production); `input.test.tsx`, `input-area.test.tsx` and `input-group.test.tsx` cover `aria-label`, `aria-labelledby` and a visible label staying silent.

## 2. Components

- [x] 2.1 Dialog: remove the automatic close button. Evidence: `dialog.test.tsx` "renders no close button of its own for role=%s" failed first (one button found), then passed; "closes through a DialogClose the app names"; dialog browser and axe tests pass.
- [x] 2.2 Input, InputArea, InputGroup, Select: `labelTooltipAriaLabel`, drop `labels`. Evidence: `input-field-names.test.tsx` (7 cases times 4 components: named trigger, warning, no invented name, no tooltip no warning, `(optional)` default and provider, component named in the warning).
- [x] 2.3 Breadcrumb ellipsis; Tabs scroll buttons. Evidence: `breadcrumb.test.tsx` "hides BreadcrumbEllipsis from assistive technology and ships no text" and `tabs-composition.test.tsx` "keeps the overflow scroll buttons out of the accessibility tree and the tab order" failed first, then passed; tabs and breadcrumb browser axe tests pass.
- [x] 2.4 Sidebar, SidebarTrigger, SidebarRail. Evidence: `sidebar-names.test.tsx` (11: aria-label, aria-labelledby, warning, no title, no hidden dialog parts, no desktop warning); 7 of 11 failed before the change; sidebar browser tests pass with named fixtures.
- [x] 2.5 Toaster; Empty `commandTitle`. Evidence: `toaster-names.test.tsx`, `empty.test.tsx` (command title, warning with `@ts-expect-error`, no warning without a command), `empty.browser.test.tsx` axe.
- [x] 2.6 Trim `RixlTranslations` to `breadcrumb`, `copyBlock`, `input`, `pagination`. Evidence: `vp check` type-checks the provider, the docs locale showcase and its test.

## 3. Docs

- [x] 3.1 Docs examples pass names; Accessible names notes and example; locale-provider artifacts updated. Evidence: `apps/docs/src/showcases/__tests__/accessible-names.test.tsx` renders every showcase and example (167 cases) and fails on any `[Rixl ...]` warning; 11 failed before the examples were named.

## 4. Verification

- [x] 4.1 From the repo root, `vp check`: no warnings, lint errors or type errors in 234 files. From `packages/ui`: `vp test --coverage --run` 107 files, 1034 tests passed (browser axe tests included), above the floor (all files 97.77% statements, 90.44% branches); `vp pack` builds; `vpx publint` "All good!"; `vpx size-limit` 56.28 kB of 58 kB for JS and 3.49 kB of 3.5 kB for the preset, budgets unchanged; `vpr docs` (the docs build) succeeds; `apps/docs` `vp test --run` 184 tests passed.
