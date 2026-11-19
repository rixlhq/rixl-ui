# Tasks

## 1. CopyBlock

- [x] 1.1 `text`, `textToCopy`, `size`, `masked`, reveal and hide labels (test first): `copy-block-options.test.tsx` passes (15 tests), `copy-block.browser.test.tsx` "has no axe violations masked or revealed"; `vpr budget` 51.29 kB of 53 kB (was 50.88)

## 2. Breadcrumb

- [x] 2.1 `size`, `icon`, `loading` (test first): `breadcrumb-options.test.tsx` (13 tests) and `breadcrumb.browser.test.tsx` (computed 12px/14px, axe with icons and loading); `vpr budget` 51.58 kB of 53 kB

## 3. Sidebar

- [x] 3.1 One `focusRingSidebar`; `sidebar-focus.browser.test.tsx` pins 2 px in `--rixl-sidebar-ring` on all five parts, light and dark, passing before and after the change (no visual change); `vpr budget` see 3.2
- [x] 3.2 Selectors on `data-slot`; remove `data-sidebar`: `sidebar-slots.browser.test.tsx` (no `[data-sidebar]` element; menu button end padding 32px with an action, 8px without); `vpr budget` see below

## 4. Menu item indicator

- [x] 4.1 One `menuItemIndicator` for the dropdown and select items: `classes.test.tsx` "menuItemIndicator" (fails on the old SelectItem wrapper, passes now); Select kept at the end side, as in Kumo; `vpr budget` see below

## 5. Docs and verify

- [x] 5.1 Showcases for CopyBlock, Breadcrumb and Locale: `apps/docs` tests (6 files, 211 tests) and `vp build` pass
- [x] 5.2 `vp install`, `vp pack` in `packages/ui`, root `vpr ci`: exit 0, 10/10 tasks; UI 143 files, 1434 tests; budget 51.48 kB of 53 kB, preset 3.42 kB of 3.5 kB
