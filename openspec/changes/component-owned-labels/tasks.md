# Tasks

## 1. Locale core

- [ ] 1.1 `useTranslations(group, defaults, labels)`; delete `DEFAULT_TRANSLATIONS`; `RixlTranslations` names each component's label type. Test: `locale-provider.test.tsx`.

## 2. Components

- [ ] 2.1 Pagination defaults in `pagination-labels.ts` (`pagination-labels.test.tsx`).
- [ ] 2.2 Breadcrumb default in `breadcrumb-labels.ts` (`breadcrumb-labels.test.tsx`).
- [ ] 2.3 Field chrome: `labels.optional` on `Input`, `InputArea`, `InputGroup`, `Select` (`input-field-labels.test.tsx`).
- [ ] 2.4 `feat(copy-block)!`: `labels`, opt-in `tooltip`, no Copying/error text (`copy-block-labels.test.tsx`, `copy-block-tooltip.test.tsx`, `copy-outcomes.test.tsx`).

## 3. Docs

- [ ] 3.1 Showcases and notes; Locale showcase test.

## 4. Verification

- [ ] 4.1 dist chunk check; `vp check`, `vp test --run`, `vpr knip`, `vpr budget`, `vpr publint`, `vpr ci`.
