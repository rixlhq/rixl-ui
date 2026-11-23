# Design

## Context

`Dialog` (`src/components/dialog/`) takes `role` (`"dialog"` default, `"alertdialog"`). With `role="alertdialog"` the root is Base UI's `AlertDialog.Root`, which sets `disablePointerDismissal` itself (`@base-ui/react` 1.9.0, `dialog/root/useRenderDialogRoot.js`: `const disablePointerDismissal = isAlertDialog || disablePointerDismissalProp`). `DialogContent` also accepts `side` (`top | right | bottom | left`), used by the `Sheet` adapter and by the mobile `Sidebar`.

The adapters add only names and `data-slot` values:

- `AlertDialogContent`: `DialogContent` with `showCloseButton={false}` and `data-slot` overrides. `DialogContent` already hides the X inside `role="alertdialog"` (`showCloseButton ?? role === "dialog"`).
- `AlertDialogCancel`: `DialogClose` rendered as an outline `Button`.
- `AlertDialogAction`: `Button`. Its own doc comment says "Confirmation does not automatically dismiss."
- `SheetContent`: `DialogContent` with `side` defaulting to `right`, plus `data-slot` overrides.

## Decisions

### Delete the adapters, no replacement

**Chosen:** remove both subpaths and every export. Consumers use `Dialog` parts, `Button` and `DialogClose`.

**Alternatives considered:** keep them one more minor with a runtime warning (rejected: the release is already a major and the owner wants the duplicate names gone; a warning needs runtime code in a UI library).

**Dropped:** None.

**Evidence:** `alert-dialog/` and `sheet/` sources; `dialog-content.tsx` and `dialog-root.tsx` already implement the role.

### Remove `side` and the edge classes from `Dialog`

**Chosen:** the sheet is removed as a concept, so `DialogContent` loses `side` and `dialog-variants.ts` loses `dialogEdgeClasses`. `role="alertdialog"` stays: it is a normal option of `Dialog`, not a separate family.

**Alternatives considered:** keep `side` as the way to build panels (rejected: the owner decided the sheet goes completely, and keeping `side` keeps a second presentation mode inside `Dialog`); keep `side` only for Sidebar (rejected: a public prop retained for one internal consumer).

**Dropped:** An earlier version of this change migrated `Sheet*` to `<DialogContent side>` with `className="gap-1.5 p-4 pe-16"` on the header and `className="mt-auto flex-col p-4"` on the footer, and added a "Side sheet" example and edge-sheet tests to `Dialog`. They were dropped when the sheet was removed entirely.

**Evidence:** `git grep -n "side=" packages/ui/src apps/docs/src` shows `Sidebar` as the only `DialogContent side` user besides the removed adapter and docs.

### Sidebar owns its mobile panel

**Chosen:** `MobileSidebar` renders Base UI `Dialog.Popup` through `DialogPortal` and `DialogOverlay` with its own classes (slide transform, drawer easing, `--sidebar-width`), keeping the current title and description for screen readers.

**Alternatives considered:** a shared `Drawer` component (rejected: one user, and three call sites are the bar for an abstraction); keep using `DialogContent side` (rejected: see above); Base UI `Drawer` (rejected: new primitive and bundle cost for an unchanged behaviour).

**Dropped:** None.

**Evidence:** `sidebar.browser.test.tsx` "sizes the open $side mobile sheet to --sidebar-width" keeps passing unchanged; a long-content scroll test is added before the move.

### Where the adapter tests go

**Chosen:** alert cases are rewritten on `Dialog` (`dialog-alert.test.tsx`, `dialog-alert.browser.test.tsx`, `mobile-overlays.browser.test.tsx`). Edge-sheet cases that tested `Dialog`'s `side` are deleted with the prop. Mobile containment for the sidebar panel moves to `sidebar.browser.test.tsx`. Assertions about the removed `data-slot` names are dropped.

**Alternatives considered:** delete the adapter tests with the adapters (rejected: alert outside-click, Escape and Cancel had no `Dialog` test).

**Dropped:** None.

**Evidence:** `vp test run` before and after.

### Spec delta targets the main spec only

**Chosen:** the delta MODIFIES `Open popups meet WCAG 2.2 AA` (it names "sheet") and ADDS the removal, alert and mobile-sidebar requirements. It has no REMOVED section.

**Alternatives considered:** MODIFY or REMOVE `Dialog is one role-aware family` and its "Legacy AlertDialog and Sheet entries SHALL delegate" sentence (rejected: that requirement exists only in the unarchived `unify-component-architecture` delta, and `openspec validate` reports that archive would refuse a MODIFIED header it cannot find in `openspec/specs/`); edit the other change's delta (rejected: out of scope, and it is the record of what was true then).

**Dropped:** A MODIFIED and a REMOVED entry against the unify requirement, for the reason above.

**Evidence:** `openspec validate remove-overlay-aliases` run against `openspec/specs/design-system/spec.md`.

When `unify-component-architecture` is archived first, its sentences about `Sheet` and the `side` placement ("Legacy AlertDialog and Sheet entries SHALL delegate to canonical infrastructure") are superseded by this change and should be dropped at that point. The `mobile-overlays` delta ("Sheets on every side ...", "Dialog and sheet close controls") likewise: sheets no longer exist, and the sidebar panel has no close control.

## Risks / Trade-offs

- A migrated `<DialogContent side="right">` now has no `side` prop: TypeScript flags it for typed consumers; untyped consumers get a centered dialog.
- Selectors on `data-slot="sheet-*"` or `alert-dialog-*` in consumer CSS or tests stop matching.
- Sidebar's panel duplicates a few edge classes that used to live in `Dialog`. Acceptable for one consumer.

## Migration Plan

1. `AlertDialog` becomes `<Dialog role="alertdialog">`; swap each `AlertDialog*` part for its `Dialog*` name.
2. `AlertDialogCancel` becomes `<DialogClose render={<Button variant="outline" />}>`; `AlertDialogAction` becomes `Button`, and closes through `DialogClose` or controlled `open` if it should dismiss.
3. `Sheet*` and `DialogContent side` have no replacement; build the panel on `@base-ui/react/dialog`.
4. Replace `data-slot` selectors with the `dialog-*` slots.
