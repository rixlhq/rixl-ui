## Why

`@rixl/ui/alert-dialog` and `@rixl/ui/sheet` are `@deprecated` adapters over `Dialog`. `AlertDialog` is `Dialog` with `role="alertdialog"`, which stays a plain option of `Dialog`. `Sheet` is an edge-placed panel that the library no longer wants as a concept: it was kept alive by `DialogContent`'s `side` prop and edge classes, whose only other user is the mobile `Sidebar`. This release is already a major version, so the duplicate names and the sheet go now.

## What Changes

- **Remove** `@rixl/ui/alert-dialog` and `@rixl/ui/sheet`: the `package.json#exports` entries, the `pack.entry` entries, the `src/index.ts` barrel lines and the `alert-dialog/` and `sheet/` folders.
- **Remove edge placement from `Dialog`**: the `side` prop of `DialogContent`, `dialogEdgeClasses` and their tests. `Dialog` is a centered (fullscreen on phones) dialog, with `role="alertdialog"` for confirmations.
- **Sidebar owns its mobile panel**: the slide-in panel moves from `Dialog`'s `side` into `sidebar/`, built on Base UI Dialog parts, with unchanged behaviour (left or right edge, `--sidebar-width`, scroll, Escape and backdrop dismissal).
- **Move tests** that only existed on the adapters onto `Dialog`: alert dismissal (outside pointer ignored, Escape cancels, focus restored), Cancel closing, Action not dismissing, mobile containment of alerts. Edge-sheet tests move to `Sidebar` or go away with the feature.
- **Docs**: the Sheet showcase and its registry entry are removed; the Dialog showcase keeps its alert example.

**Breaking status**: Breaking.

Every export of the two subpaths is removed, and `DialogContent` loses `side`. Migration:

| Removed                                                                                                                                                 | Replacement                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `AlertDialog`                                                                                                                                           | `<Dialog role="alertdialog">`                                                                                                                          |
| `AlertDialogTrigger`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogOverlay`, `AlertDialogPortal` | `DialogTrigger`, `DialogTitle`, `DialogDescription`, `DialogHeader`, `DialogFooter`, `DialogOverlay`, `DialogPortal`                                   |
| `AlertDialogContent`                                                                                                                                    | `DialogContent` (inside `role="alertdialog"` the X close button is already hidden by default)                                                          |
| `AlertDialogCancel`                                                                                                                                     | `<DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>`                                                                              |
| `AlertDialogAction`                                                                                                                                     | `Button` from `@rixl/ui/button`. It never dismissed the dialog; to close on confirm, render `DialogClose` as the `Button` or control `open`.           |
| `Sheet`, `SheetContent`, `SheetTrigger`, `SheetClose`, `SheetTitle`, `SheetDescription`, `SheetHeader`, `SheetFooter`, `SheetOverlay`, `SheetPortal`    | None. Edge panels are not part of the library. Use `Dialog` for a centered dialog; build a panel directly on `@base-ui/react/dialog` if one is needed. |
| `DialogContent` `side` prop                                                                                                                             | None, same as `Sheet`.                                                                                                                                 |
| `data-slot="alert-dialog-*"`, `data-slot="sheet-*"`                                                                                                     | `data-slot="dialog-*"`                                                                                                                                 |
| Prop types `AlertDialogProps`, `SheetProps`, ... `*ContentProps`                                                                                        | `DialogProps`, `DialogContentProps`, ...                                                                                                               |

## Capabilities

### Modified Capabilities

- `design-system`: Dialog is the only dialog and alert component and has no edge placement; the mobile sidebar panel is specified; the open-popup accessibility requirement drops "sheet".

## Non-goals

- No change to `Dialog`'s centered presentation, sizes, alert role or focus behaviour.
- No change to the desktop `Sidebar`, or to how the mobile `Sidebar` looks and behaves.
- No new shared "edge panel" component. Sidebar is the only user, so its panel lives in `sidebar/`.
- No deprecation period: the adapters were already deprecated and this release is a major.
- Other changes in the same release (Input and Field merge, `EmptyState` removal, Calendar/DatePicker aliases, Card `interactive`) are separate.

## Acceptance

- `package.json#exports`, `vite.config.ts#pack.entry`, `src/index.ts` and the docs no longer mention `alert-dialog` or `sheet` as components, and `DialogContent` has no `side` prop.
- `Dialog` tests cover the alert role: outside click ignored, Escape cancels with focus restored, Cancel and Action, mobile containment.
- Mobile `Sidebar` tests cover the left and right panel, `--sidebar-width`, and scrolling long content in a short viewport.
- The docs sidebar lists no Sheet entry.
- `vp check`, `vp test run`, `vp pack`, `vpx size-limit` and `vpr docs` pass.
