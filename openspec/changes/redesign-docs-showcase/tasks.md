# Tasks

## 1. Discovery

- [x] 1.1 Retain the sidebar and live-demo grid; improve gallery hierarchy and whitespace handling. Evidence: `discovery.test.ts` passes trimmed search; Chromium previously rendered all 33 demos.
- [x] 1.2 Improve demo compositions, remove example counts and preview backgrounds, and shorten introductions. Evidence: docs production build passes; the earlier gallery checks found no preview overflow from 320 to 1440px. Long technical descriptions are now shown after the examples.

## 2. Examples

- [x] 2.1 Add example navigation, unique control IDs, copy feedback, highlighted code and adjacent links. Evidence: `detail.test.tsx` passes unique label-target and compact-selector tests. `navigation.browser.test.tsx` verifies the selector scrolls and transfers focus into the chosen example, with an axe check of its popup.
- [x] 2.2 Remove reset actions as requested; retain ordinary demo reset on navigation. Evidence: `detail.test.tsx` verifies no reset button is rendered. Reset implementation and its unused icon are deleted.

## 3. Search

- [x] 3.1 Keep the current demo and sidebar visible while searching in a header popover. Evidence: `navigation.browser.test.tsx` verifies search preserves the Button page, navigation by keyboard, Escape focus restoration, empty results, outside dismissal and an axe check of the search popup. The popup fits at 390, 768 and 1440px in Chromium.

## 4. Integration

- [x] 4.1 Run checks and confirm scope. Evidence: root `vp check` and docs TypeScript check pass; apps/docs `vp test run` passes 8 tests across unit and Chromium projects; packages/ui `vp test run` passes 578 tests; docs `vpr build` passes with its bundle-size warning. React Doctor reports only the existing showcase metadata/component-export pattern (33 warnings). `git diff --name-only packages/ui` is empty. OpenSpec validation passes. Physical phone testing is outside this session.
