# Tasks

## 1. Test helper

- [ ] 1.1 `test/forward-ref.ts` exports `isForwardRef`. Evidence: used by every `forward-refs.test.tsx` below.

## 2. Components (each: failing test first, then the wrap)

- [ ] 2.1 `checkbox`: `Checkbox`. Evidence: `checkbox/__tests__/forward-refs.test.tsx`.
- [ ] 2.2 `radio-group`: `RadioGroup`, `RadioGroupItem`. Evidence: `radio-group/__tests__/forward-refs.test.tsx`.
- [ ] 2.3 `switch`: `Switch`. Evidence: `switch/__tests__/forward-refs.test.tsx`.
- [ ] 2.4 `popover`: `PopoverTrigger`, `PopoverContent`. Evidence: `popover/__tests__/forward-refs.test.tsx`.
- [ ] 2.5 `tooltip`: `TooltipTrigger`, `TooltipContent`. Evidence: `tooltip/__tests__/forward-refs.test.tsx`.
- [ ] 2.6 `dropdown-menu`: trigger, group, content, item, checkbox item, radio group, radio item, label, separator, shortcut, sub trigger, sub content. Evidence: `dropdown-menu/__tests__/forward-refs.test.tsx`.
- [ ] 2.7 `avatar`: `Avatar`, `AvatarImage`, `AvatarFallback`. Evidence: `avatar/__tests__/forward-refs.test.tsx`.
- [ ] 2.8 `progress`: `Progress`. Evidence: `progress/__tests__/forward-refs.test.tsx`.
- [ ] 2.9 `input-otp`: `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator`. Evidence: `input-otp/__tests__/forward-refs.test.tsx`.
- [ ] 2.10 `pagination`: `PaginationControls`, `PaginationNavButton`, `PaginationPageSize`. Evidence: `pagination/__tests__/forward-refs.test.tsx`.
- [ ] 2.11 `sidebar`: every exported element-rendering part. Evidence: `sidebar/__tests__/forward-refs.test.tsx`.
- [ ] 2.12 Already wrapped (`collapsible`, `copy-block`, `button-group`, `empty`, `skeleton`, `slider`, `tabs`): add the missing ref tests. Evidence: `<folder>/__tests__/forward-refs.test.tsx` passes without a source change.

## 3. Verification

- [ ] 3.1 Check whether the suite can run on React 18. Evidence: design.md, "React 18 verification".
- [ ] 3.2 `vp check`, `vp test run`, `vp pack`, `vpx size-limit` and `vpr docs` pass. Evidence: summary lines recorded here once run.
