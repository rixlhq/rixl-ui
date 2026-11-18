# Tasks

## 1. Icons

- [ ] 1.1 Checkbox, RadioGroup, DropdownMenu, Select, InputOTP separator and Button spinner import from `lucide-react`; `dropdown-menu/icons.tsx` and `select/icons.tsx` are deleted. Evidence: existing `checkbox.test.tsx`, `radio-group.test.tsx`, `dropdown-menu.test.tsx`, `select.test.tsx`, `input-otp.test.tsx`, `button.test.tsx` pass.
- [ ] 1.2 "icon-dep-free" comments removed. Evidence: `grep -rn "icon-dep" packages/ui/src` is empty.

## 2. Shared classes

- [ ] 2.1 `focusRing`, `focusRingBorderless`. Evidence: `src/lib/__tests__/classes.test.ts`.
- [ ] 2.2 `popupSurface`. Evidence: `classes.test.ts`.
- [ ] 2.3 `menuItem`. Evidence: `classes.test.ts`.
- [ ] 2.4 `indicatorPop`. Evidence: `classes.test.ts`.

## 3. Gate

- [ ] 3.1 `vp check`, `vp test run`, `vp pack`, `vpx size-limit` and `vpr docs` pass; `.size-limit.json` unchanged.
