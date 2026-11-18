# Design

## Context

`Dialog` (`src/components/dialog/`) takes `role` (`"dialog"` default, `"alertdialog"`) and `DialogContent` takes `side` (`top | right | bottom | left`). With `role="alertdialog"` the root is Base UI's `AlertDialog.Root`, which sets `disablePointerDismissal` itself (`@base-ui/react` 1.9.0, `dialog/root/useRenderDialogRoot.js`: `const disablePointerDismissal = isAlertDialog || disablePointerDismissalProp`). `Sidebar` already renders its mobile panel with `Dialog` and `side`.

The adapters add only names and `data-slot` values:

- `AlertDialogContent`: `DialogContent` with `showCloseButton={false}` and `data-slot` overrides. `DialogContent` already hides the X inside `role="alertdialog"` (`showCloseButton ?? role === "dialog"`).
- `AlertDialogCancel`: `DialogClose` rendered as an outline `Button`.
- `AlertDialogAction`: `Button`. Its own doc comment says "Confirmation does not automatically dismiss."
- `SheetContent`: `DialogContent` with `side` defaulting to `right`, plus `data-slot` overrides for overlay and close button.
- `SheetHeader`, `SheetFooter`: `DialogHeader` and `DialogFooter` with extra classes (`flex min-w-0 flex-col gap-1.5 p-4 pe-16`, `mt-auto flex flex-col gap-2 p-4`).

## Decisions

### Delete the adapters, no replacement

**Chosen:** remove both subpaths and every export. Consumers use `Dialog` parts, `Button` and `DialogClose`.

**Alternatives considered:** keep them one more minor with a runtime warning (rejected: the release is already a major and the owner wants the duplicate names gone; a warning needs runtime code in a UI library); keep only `Sheet` (rejected: it is the same adapter pattern).

**Dropped:** None.

**Evidence:** `alert-dialog/` and `sheet/` sources; `dialog-content.tsx` and `dialog-root.tsx` already implement role and side.

### Do not move `SheetHeader`/`SheetFooter` padding into `Dialog`

**Chosen:** document `className="gap-1.5 p-4 pe-16"` and `className="mt-auto flex-col p-4"` in the migration table and the docs example.

**Alternatives considered:** add padding to `dialogEdgeClasses` or make `DialogHeader`/`DialogFooter` edge-aware (rejected: `Sidebar` uses the same edge and sets its own padding in `sidebar.tsx`, so the change would alter `Sidebar` and `Dialog`, which this change promises not to do).

**Dropped:** None.

**Evidence:** `sidebar.tsx` passes its own classes to the edge `DialogContent`; `sheet-header.tsx` and `sheet-footer.tsx` hold the only copies of the padding.

### `data-slot` overrides go with the adapters

**Chosen:** the `overlayProps` and `closeButtonProps` slot overrides existed only for `sheet-overlay`, `sheet-close` and `alert-dialog-overlay`. They are removed with the adapters. `overlayProps` and `closeButtonProps` stay on `DialogContent` because they are public props that consumers can use to pass other attributes.

**Alternatives considered:** remove the two props from `DialogContent` (rejected: public API outside this change's scope, and not dead: the type is exported).

**Dropped:** None.

**Evidence:** `grep -rn "overlayProps\|closeButtonProps" packages/ui/src apps/docs/src` after the removal.

### Where the adapter tests go

**Chosen:** rewrite on `Dialog` rather than delete. `dialog/__tests__/dialog-alert.test.tsx` and `dialog-alert.browser.test.tsx` hold the alert role cases, `dialog-side.test.tsx` and `dialog-side.browser.test.tsx` the edge-sheet cases; the mobile containment cases in `mobile-overlays.browser.test.tsx` switch to `Dialog`. Assertions about the removed `data-slot` names (`sheet-trigger`, `alert-dialog-action`) are dropped, because those names no longer exist.

**Alternatives considered:** delete the adapter tests with the adapters (rejected: alert outside-click and Escape, Cancel and edge-sheet behaviour had no `Dialog` test, so removal would lose coverage).

**Dropped:** None.

**Evidence:** `vp test run` and `vp test run --coverage` before and after.

### Spec delta targets the main spec only

**Chosen:** the delta MODIFIES `Open popups meet WCAG 2.2 AA` (it names "sheet") and ADDS the alert, edge and removal requirements. It has no REMOVED section.

**Alternatives considered:** MODIFY or REMOVE `Dialog is one role-aware family` and `Legacy AlertDialog and Sheet entries SHALL delegate` (rejected: that requirement exists only in the unarchived `unify-component-architecture` delta, and `openspec validate` reports that archive would refuse a MODIFIED header it cannot find in `openspec/specs/`); edit the other change's delta (rejected: out of scope, and it is the record of what was true then).

**Dropped:** A MODIFIED and a REMOVED entry against the unify requirement, for the reason above.

**Evidence:** `openspec validate remove-overlay-aliases` run against `openspec/specs/design-system/spec.md`.

When `unify-component-architecture` is archived first, its sentence "Legacy AlertDialog and Sheet entries SHALL delegate to canonical infrastructure" is superseded by `Dialog is the only dialog, alert and sheet component` and should be dropped at that point.

## Risks / Trade-offs

- `SheetContent` defaulted `side` to `right`. A migrated `<DialogContent>` without `side` renders a centered dialog and no error is raised. Covered by the migration table and the docs example.
- Selectors on `data-slot="sheet-*"` or `alert-dialog-*` in consumer CSS or tests stop matching.

## Migration Plan

1. `AlertDialog` becomes `<Dialog role="alertdialog">`; swap each `AlertDialog*` part for its `Dialog*` name.
2. `AlertDialogCancel` becomes `<DialogClose render={<Button variant="outline" />}>`; `AlertDialogAction` becomes `Button`, and closes through `DialogClose` or controlled `open` if it should dismiss.
3. `Sheet` becomes `Dialog`; `SheetContent` becomes `<DialogContent side="right">` (or the side it used); `SheetHeader` and `SheetFooter` get the padding classes from the table.
4. Replace `data-slot` selectors with the `dialog-*` slots.
