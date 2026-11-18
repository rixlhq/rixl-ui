# Tasks

## 1. Icons

- [x] 1.1 Checkbox, RadioGroup, DropdownMenu, Select, InputOTP separator and Button spinner import from `lucide-react`; `dropdown-menu/icons.tsx` and `select/icons.tsx` are deleted. Evidence: existing `checkbox.test.tsx`, `radio-group.test.tsx`, `dropdown-menu.test.tsx`, `select.test.tsx`, `input-otp.test.tsx`, `button.test.tsx` pass (94 files, 882 tests).
- [x] 1.2 "icon-dep-free" comments removed. Evidence: `grep -rn "icon-dep" packages/ui/src` is empty.

## 2. Shared classes

- [x] 2.1 `focusRing`, `focusRingBorderless`. Evidence: `src/lib/__tests__/classes.test.tsx` (`focusRing`, `focusRingBorderless`); raising the ring width in the constant to `4px` failed the two pinning tests, then restored.
- [x] 2.2 `popupSurface`. Evidence: `classes.test.tsx` (`popupSurface`); the tests failed before the constant existed.
- [x] 2.3 `menuItem`. Evidence: `classes.test.tsx` (`menuItem`); failed before the constant existed. Item, checkbox item, radio item and Select item compared token by token against their old strings: equal.
- [x] 2.4 `indicatorPop`. Evidence: `classes.test.tsx` (`indicatorPop`); failed before the constant existed.

## 3. Gate

- [x] 3.1 `vp check`, `vp test run` (94 files, 904 tests), `vp pack`, `vpx size-limit` (JS 54.64 kB of 58 kB, preset 3.49 kB of 3.5 kB) and `vpr docs` pass; `.size-limit.json` unchanged.
