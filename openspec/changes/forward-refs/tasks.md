# Tasks

Each wrap below started from a failing `forward-refs.test.tsx` row. On React 19 the `ref.current` check already passed before every change (a `ref` is an ordinary prop there, so the spread delivered it); what failed was the `forwardRef` marker and `displayName` check, plus two real gaps noted on 2.11 and 2.12.

## 1. Test helper

- [x] 1.1 `test/forward-ref.ts` exports `describeForwardRefs`, which checks the element behind `ref` and that the export is a `forwardRef` component named after itself. Evidence: used by every `forward-refs.test.tsx` below; commit `test(config): add a table helper for ref-forwarding tests`.

## 2. Components (each: failing test first, then the wrap)

- [x] 2.1 `checkbox`: `Checkbox`. Evidence: `checkbox/__tests__/forward-refs.test.tsx`; the marker test failed before the wrap and passes after it.
- [x] 2.2 `radio-group`: `RadioGroup`, `RadioGroupItem`. Evidence: `radio-group/__tests__/forward-refs.test.tsx`; both marker tests failed before.
- [x] 2.3 `switch`: `Switch`. Evidence: `switch/__tests__/forward-refs.test.tsx`; the marker test failed before.
- [x] 2.4 `popover`: `PopoverTrigger`, `PopoverContent`. Evidence: `popover/__tests__/forward-refs.test.tsx`; both marker tests failed before.
- [x] 2.5 `tooltip`: `TooltipTrigger`, `TooltipContent`. Evidence: `tooltip/__tests__/forward-refs.test.tsx`; both marker tests failed before.
- [x] 2.6 `dropdown-menu`: trigger, group, content, item, checkbox item, radio group, radio item, label, separator, shortcut, sub trigger, sub content. Evidence: `dropdown-menu/__tests__/forward-refs.test.tsx`; 12 marker tests failed before.
- [x] 2.7 `avatar`: `Avatar`, `AvatarImage`, `AvatarFallback`. Evidence: `avatar/__tests__/forward-refs.test.tsx`; 3 marker tests failed before. The image row stubs `Image` because Base UI renders the `img` only after it loads.
- [x] 2.8 `progress`: `Progress`. Evidence: `progress/__tests__/forward-refs.test.tsx`; the marker test failed before.
- [x] 2.9 `input-otp`: `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator`. Evidence: `input-otp/__tests__/forward-refs.test.tsx`; 4 marker tests failed with the source reverted, 8 of 8 pass with it.
- [x] 2.10 `pagination`: `PaginationControls`, `PaginationNavButton`, `PaginationPageSize` (`Pagination`, `PaginationInfo` and `PaginationPageInput` already forwarded and are in the table). Evidence: `pagination/__tests__/forward-refs.test.tsx`; 3 marker tests failed before.
- [x] 2.11 `sidebar`: every exported element-rendering part, 23 of them. Evidence: `sidebar/__tests__/forward-refs.test.tsx`; 25 marker tests failed before. The narrow-viewport test also failed before: the mobile sheet took no props, so a ref had nowhere to go; `Sidebar` now passes it to the sheet.
- [x] 2.12 Already wrapped (`collapsible`, `copy-block`, `button-group`, `empty`, `skeleton`, `slider`, `tabs`): add the ref tables. Evidence: `<folder>/__tests__/forward-refs.test.tsx`. All passed without a source change except `Slider`, which had no `displayName` (`fix(slider): name the root in React DevTools`).

## 3. Verification

- [x] 3.1 Check whether the suite can run on React 18. Evidence: design.md, "React 18 verification". It cannot without adding React 18; not added.
- [x] 3.2 Gate. Evidence, from `packages/ui` unless noted:
  - `vp check`: "All 309 files are correctly formatted"; "Found no warnings, lint errors, or type errors in 215 files".
  - `vp test run`: 89 files, 839 tests pass (the base commit had 71 files, 684 tests). The slider property test needed a timeout (`test(slider): give the property test headroom under load`): the first full runs failed with "Test timed out in 5000ms" on it, while the base commit passed twice.
  - `vp pack`: "Build complete"; `vpx size-limit`: all component JS 56.01 kB of 58 kB, preset 3.36 kB of 3.5 kB; `.size-limit.json` unchanged.
  - `vpx publint`: "All good!".
  - `vpr docs` from the repo root: built.
