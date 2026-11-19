## 1. Motion Tokens & Preset Polish

- [x] 1.1 Update light-theme `--rixl-danger` contrast and dark-theme `--rixl-shadow-*` tokens in `packages/ui/src/styles/preset.css` (Evidence: `dropdown-menu.browser.test.tsx` → `has no WCAG 2.2 AA violations when open` passed in Chromium)
- [x] 1.2 Update `--rixl-ease-out` (`cubic-bezier(0.23, 1, 0.32, 1)`), `--rixl-ease-in-out` (`cubic-bezier(0.77, 0, 0.175, 1)`), and add `--rixl-ease-drawer` (`cubic-bezier(0.32, 0.72, 0, 1)`) + `--ease-(--rixl-ease-drawer)` in `packages/ui/src/styles/preset.css` (Evidence: `sheet.test.tsx` → `defaults to the right side and applies edge classes` passed & `vp run -F @rixl/ui pack` succeeded)

## 2. Press Feedback, Loading State & Copy Morphing

- [x] 2.1 Remove hover translation (`hover:-translate-y-px`) from `Button` and add `loading` prop with `ButtonSpinner` (`packages/ui/src/components/button/button.tsx`) (Evidence: `button.test.tsx` → `does not jump or lift on hover` & `renders a spinner, sets aria-busy, and suppresses clicks when loading` passed)
- [x] 2.2 Remove hover translation (`hover:-translate-y-0.5`) from `Card` (`interactive`) (`packages/ui/src/components/card/card.tsx`) (Evidence: `card.test.tsx` → `interactive adds hover emphasis, press scale, focus ring, and reduced-motion opt-out without hover jump` passed)
- [x] 2.3 Add `select-none touch-manipulation` to `Button`, `TabsTrigger`, and `SelectTrigger`, and `touch-manipulation` to `Checkbox`, `RadioGroupItem`, `Switch`, and `CopyBlock` (Evidence: `button.test.tsx` → `scales down on press using the shared token and prevents text selection or tap delay` passed)
- [x] 2.4 Add `blur-[2px]` crossfade masking to `CopyBlock`'s morphing `CopyIcon` ↔ `CheckIcon` indicator (`packages/ui/src/components/copy-block/copy-block.tsx`) (Evidence: `copy-block.test.tsx` → `copies the value to the clipboard on click and morphs into the copied state` passed)
- [x] 2.5 Add `success` and `warning` semantic variants to `Alert` and `Badge` (`packages/ui/src/components/alert/alert.tsx`, `packages/ui/src/components/badge/badge.tsx`) (Evidence: `alert.test.tsx` → `applies the success variant classes` / `applies the warning variant classes` & `badge.test.tsx` → `applies the success variant` / `applies the warning variant` passed)

## 3. Interruptible Overlays, Drawer Curve & Instant Tooltips

- [x] 3.1 Remove redundant `data-open:animate-in` / `data-closed:animate-out` keyframe classes from `Dialog`, `AlertDialog`, `Popover`, `DropdownMenu`, `Select`, and `Tooltip` so `data-starting-style` / `data-ending-style` CSS transitions are 100% interruptible, and add `overscroll-contain` to `DropdownMenuContent` and `SelectContent` (Evidence: `dialog.test.tsx` → `uses a lighter, blurred backdrop with interruptible starting/ending transitions` & `popover.test.tsx` → `applies base classes and origin-anchored interruptible transitions to the popup` passed)
- [x] 3.2 Add `data-instant:duration-0` to `TooltipContent` so adjacent tooltips open instantly (`packages/ui/src/components/tooltip/tooltip.tsx`) (Evidence: `tooltip.test.tsx` → `skips transition duration when data-instant is present` passed)
- [x] 3.3 Use `ease-(--rixl-ease-drawer)` and `overscroll-contain` on `SheetContent` (`packages/ui/src/components/sheet/sheet.tsx`) (Evidence: `sheet.test.tsx` → `defaults to the right side and applies edge classes` & `sheet.browser.test.tsx` → `has no WCAG 2.2 AA violations when open` passed)

## 4. Layout Resilience (`break-ui`) & Proportional Sizing

- [x] 4.1 Normalize `TabsList` (`sm: min-h-7`, `md: min-h-8`), `DialogClose` / `SheetClose` (`size-7`), and `BreadcrumbEllipsis` (`size-7`), and remove `max-sm:h-dvh` from `DialogContent` / `AlertDialogContent` (Evidence: `tabs.test.tsx` → `sizes: default is md (min-h-8), sm is compact (min-h-7)` & `dialog.test.tsx` → `constrains height and scrolls internally while keeping compact close button sizing` passed)
- [x] 4.2 Add `object-cover` to `AvatarImage` and `min-w-0` / `break-words` resilience to `CardHeader`/`CardTitle`/`CardDescription`, `AlertDescription`, `DialogHeader`, `AlertDialogHeader`, and `SheetHeader` (Evidence: `avatar.test.tsx` → `applies aspect-square, size-full, and object-cover to the image` passed)

## 5. Browser Mode Verification & CI Quality Gates

- [x] 5.1 Split `sidebar` into focused sub-modules to meet Oxlint line and complexity caps (Evidence: `sidebar.test.tsx` 28 tests passed & `vp run -F @rixl/ui check` 0 warnings/errors)
- [x] 5.2 Add Vitest Browser Mode suites (`alert-dialog.browser.test.tsx`, `collapsible.browser.test.tsx`, `tabs.browser.test.tsx`, `tooltip.browser.test.tsx`) and eliminate `act(...)` stderr noise in `packages/ui/test/setup.browser.ts` & `packages/ui/test/a11y.ts` (Evidence: `vp test --project browser --run` → 9 suites, 20 browser tests passed, 0 stderr lines)
- [x] 5.3 Run full CI gate `vp run -F @rixl/ui ci` (`vp check`, `vp fmt --check`, `vp run lint:suppressions`, `vp run knip`, `vp test --coverage --run`, `vp pack`, `vp run budget`, `vp run publint`) (Evidence: `vp run -F @rixl/ui ci` → 8/8 tasks succeeded, 41 test files / 373 tests passed, JS 40.47 kB / 42.5 kB, CSS 2.86 kB / 3 kB)
- [x] 5.4 Refactor `examples/playground` to dogfood `@rixl/ui` primitives (`Sidebar`, `Tabs`, `Card`, `Select`, `Switch`, `Label`, `Input`, `Badge`, `Breadcrumb`, `EmptyState`, `Toaster`, `Tooltip`, `Separator`) with zero raw `<input>`/`<select>`/`<button>`/`<textarea>` tags and fix flex shrink-wrapping in showcases (Evidence: `vp run -F playground build` & `cd examples/playground && vp check` passed with 0 errors)
