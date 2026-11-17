# Tasks

## 1. Discovery

- [x] 1.1 Retain the sidebar and live-demo grid, improve gallery hierarchy and whitespace handling. Evidence: `vp test run` in apps/docs passes `discovery.test.ts`; Chromium renders all 33 demos.
- [x] 1.2 Improve demo compositions and responsive framing. Evidence: docs production build passes; Chromium finds no page overflow on overview, Button, Input, Pagination and Sidebar at 390, 768, 1024 and 1440px. Additional preview overflow checks pass at 320, 390, 768 and 1024px. Light and dark screenshots inspected; physical phone testing is outside this session.

## 2. Examples

- [x] 2.1 Add example navigation, reset, unique IDs, copy feedback, highlighted code and adjacent links. Evidence: `detail.test.tsx` passes reset isolation and unique label-target tests; `vpx tsc -p apps/docs/tsconfig.json` passes. Chromium confirms code view, search from details, reset and mobile navigation dismissal, with no runtime errors.

## 3. Integration

- [x] 3.1 Run checks and confirm scope. Evidence: root `vp check` passes; apps/docs `vp test run` passes 3 tests; packages/ui `vp test run` passes 578 tests; docs `vpr build` passes with the bundle-size warning. React Doctor completes with 15 mixed metadata/component-export warnings in existing showcase module structure. `git diff --name-only packages/ui` is empty. OpenSpec validation passes.
