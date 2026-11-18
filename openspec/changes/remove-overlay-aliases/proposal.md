## Why

`Dialog` is already the one role-aware overlay family: `role="alertdialog"` gives the alert presentation and `side` gives an edge sheet (the mobile `Sidebar` is built on it). `@rixl/ui/alert-dialog` and `@rixl/ui/sheet` remain as `@deprecated` adapters that re-wrap the same parts under other names and `data-slot` values. They add two subpath entries, twenty-odd exports and a second set of tests for behaviour `Dialog` owns. This release is already a major version, so the duplicate names can go now.

## What Changes

- **Remove** `@rixl/ui/alert-dialog` and `@rixl/ui/sheet`: the `package.json#exports` entries, the `pack.entry` entries, the `src/index.ts` barrel lines and the `alert-dialog/` and `sheet/` folders.
- **Move tests** that only existed on the adapters onto `Dialog`: alert dismissal (outside pointer ignored, Escape cancels, focus restored), Cancel closing, Action not dismissing, edge-sheet classes, `data-side`, RTL, header and footer layout, mobile overlay containment.
- **Docs**: the `Sheet` and `AlertDialog` showcases are folded into the `Dialog` showcase as "Side sheet" and "Alert dialog"; their registry entries and files are removed.

**Breaking status**: Breaking.

Every export of the two subpaths is removed. Migration:

| Removed                                                                                                                                                 | Replacement                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `AlertDialog`                                                                                                                                           | `<Dialog role="alertdialog">`                                                                                                                |
| `AlertDialogTrigger`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogOverlay`, `AlertDialogPortal` | `DialogTrigger`, `DialogTitle`, `DialogDescription`, `DialogHeader`, `DialogFooter`, `DialogOverlay`, `DialogPortal`                         |
| `AlertDialogContent`                                                                                                                                    | `DialogContent` (inside `role="alertdialog"` the X close button is already hidden by default)                                                |
| `AlertDialogCancel`                                                                                                                                     | `<DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>`                                                                    |
| `AlertDialogAction`                                                                                                                                     | `Button` from `@rixl/ui/button`. It never dismissed the dialog; to close on confirm, render `DialogClose` as the `Button` or control `open`. |
| `Sheet`                                                                                                                                                 | `Dialog`                                                                                                                                     |
| `SheetContent` (side defaulted to `right`)                                                                                                              | `<DialogContent side="right">` (`side` is now required to get an edge sheet; without it the content is a centered dialog)                    |
| `SheetTrigger`, `SheetClose`, `SheetTitle`, `SheetDescription`, `SheetOverlay`, `SheetPortal`                                                           | `DialogTrigger`, `DialogClose`, `DialogTitle`, `DialogDescription`, `DialogOverlay`, `DialogPortal`                                          |
| `SheetHeader`                                                                                                                                           | `<DialogHeader className="gap-1.5 p-4 pe-16">`                                                                                               |
| `SheetFooter`                                                                                                                                           | `<DialogFooter className="mt-auto flex-col p-4">`                                                                                            |
| `data-slot="alert-dialog-*"`, `data-slot="sheet-*"`                                                                                                     | `data-slot="dialog-*"` (`dialog-content`, `dialog-overlay`, `dialog-close`, `dialog-header`, ...)                                            |
| Prop types `AlertDialogProps`, `SheetProps`, ... `*ContentProps`                                                                                        | `DialogProps`, `DialogContentProps`, ...                                                                                                     |

## Capabilities

### Modified Capabilities

- `design-system`: Dialog is the only dialog, alert and edge-sheet family; the open-popup accessibility requirement names Dialog's alert and edge variants.

## Non-goals

- No change to `Dialog`'s API, classes or behaviour. `SheetHeader` and `SheetFooter` padding is not folded into `Dialog`, because the mobile `Sidebar` uses the same edge and sets its own spacing.
- No change to `Sidebar` (already on `Dialog`).
- No deprecation period: the adapters were already deprecated and this release is a major.
- Other changes in the same release (Input and Field merge, `EmptyState` removal, Calendar/DatePicker aliases, Card `interactive`) are separate.

## Acceptance

- `package.json#exports`, `vite.config.ts#pack.entry`, `src/index.ts` and the docs no longer mention `alert-dialog` or `sheet` as components.
- `Dialog` tests cover everything the adapter tests covered: alert outside click and Escape and focus restore, Cancel and Action, edge classes and `data-side`, RTL, header and footer layout, mobile containment for alerts and every side.
- The docs sidebar lists no Sheet or AlertDialog entry; the Dialog page shows "Side sheet" and "Alert dialog" examples with accurate code.
- `vp check`, `vp test run`, `vp pack`, `vpx size-limit` and `vpr docs` pass.
