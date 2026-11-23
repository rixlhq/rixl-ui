## 1. Rename `value` to `text` and keep `title` and children

**Chosen**: `CopyBlock` takes `text` (what it shows), `textToCopy` (what it copies when different) and keeps `title`, `children`, `tooltip` and `labels`.
**Alternatives considered**: keeping `value` and adding `text` as an alias, which Pre-v1 rules out; dropping `title` and children to match Kumo, which `Empty` and the dashboard do not need removed.
**Dropped**: Kumo's `onCopy`; nothing here asks for it.
**Evidence**: `clipboard-text.tsx` at the pinned Kumo commit.

## 2. Masked

**Chosen**: while `masked` and not revealed, the block renders eight bullets (an `aria-hidden` span) instead of `children` or `text`, so custom children cannot leak the secret. The reveal button is a ghost `Button` of the same size as the copy button, named by `labels.revealAction` or `labels.hideAction`. The copy button still copies `textToCopy ?? text` while masked, as Kumo does.
**Dropped**: `aria-pressed` on the reveal button. Kumo sets it and also swaps the label; a pressed state on top of a label that already says "Hide value" announces the state twice.
**Evidence**: Kumo's source and doc example "Masked Value".

## 3. Size scale

**Chosen**: `sm | base | lg`, default `lg` as in Kumo. Rixl keeps the padded surface instead of Kumo's input-shaped field, so each size sets padding, gap, text size and the Button size inside it: `sm` p-1, `text-xs`, `xs` button; `base` p-1.5, `text-sm`, `xs` button; `lg` p-2, `text-sm`, `sm` button. `lg` is the old look, so the default is pixel-identical.
**Alternatives considered**: Kumo's button-per-size (`lg` gives a 40 px button), which would grow every existing block by 8 px.
**Evidence**: `KUMO_CLIPBOARD_TEXT_VARIANTS`.

## 4. Breadcrumb keeps its parts

**Chosen**: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis` stay. `size` is set on the `nav` and read from there (`text-xs` for `sm`, `text-sm` for `base`), so the list inherits it. `icon` renders in a `breadcrumb-icon` slot; `loading` on `BreadcrumbPage` swaps its text for a `Skeleton` and drops `aria-current`, as Kumo does.
**Alternatives considered**: renaming `BreadcrumbPage` to `BreadcrumbCurrent` and folding `Item` away to match Kumo's three parts; a larger break with no new capability, and `BreadcrumbItem` and `BreadcrumbEllipsis` have no Kumo equivalent to map to.
**Dropped**: `Breadcrumbs.Clipboard`; `CopyBlock` already covers copying a link.

## 5. Menu item indicator

**Chosen**: `menuItemIndicator` is the wrapper without a side; dropdown items add `start-2`, `SelectItem` adds `end-2`.
**Evidence**: Kumo's select puts the check after the label and its checkbox item puts it at the left, so Select's side is already right and only the shared box was duplicated. Select's wrapper gains `pointer-events-none`, which changes no visible result (the click lands on the item either way).

## 6. Sidebar focus ring

**Chosen**: one `focusRingSidebar` (`ring-rixl-sidebar-ring focus-visible:ring-2`) in `classes.ts`, five call sites.
**Alternatives considered**: moving the sidebar onto `focusRingBorderless`. `--rixl-sidebar-ring` and `--rixl-ring` hold the same values, but the shared ring draws 3 px at half that alpha, so the sidebar's focus would be wider and fainter, and `--rixl-sidebar-ring` would be unused. A consumer who retunes the sidebar theme through that token would lose the override. A browser test pins the measured ring.

## 7. `data-sidebar`

**Chosen**: remove the attributes and the `sidebar:` state keys; `group-has-data-[sidebar=menu-action]` becomes `group-has-data-[slot=sidebar-menu-action]`. Every part already carries `data-slot`. No test or docs source reads `data-sidebar`.
