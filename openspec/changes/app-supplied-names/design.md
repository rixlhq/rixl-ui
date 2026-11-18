# Design

## Context

`locale-provider` made every built-in string overridable. This change decides which strings should exist at all. Kumo (fetched 2026-11-18) is the reference. What it actually does, per component:

| Component                 | Kumo                                                                                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Dialog                    | No close button; docs render `<Dialog.Close aria-label="Close" …>`                                                                                                       |
| Input / Field             | "Must provide `aria-label` or `aria-labelledby`" on a bare input; `Label` has `tooltipAriaLabel`, default `"More information"` from `KumoLocaleProvider` `label.tooltip` |
| Breadcrumbs               | `aria-label` prop, default `"breadcrumb"` from the provider; ellipsis is an `aria-hidden` `...` span                                                                     |
| Pagination, ClipboardText | English defaults with `labels` props                                                                                                                                     |
| Tabs                      | Scroll buttons are real, focusable buttons with English `labels` defaults                                                                                                |
| Sidebar                   | Hardcoded English `aria-label`s ("Toggle sidebar", "Navigation", "Close navigation"); the docs page has no accessibility text                                            |
| Toast                     | No built-in names                                                                                                                                                        |
| Empty                     | `commandLine` copy button hardcodes `aria-label="Copy command"`                                                                                                          |

Kumo is therefore only partly "the app names things". The owner decision for Rixl is the stricter rule: no hidden screen-reader English; built-in strings only where the component draws the copy itself and Kumo ships it too.

## Decisions

### D1. One dev-only warning hook

**Chosen**: `useWarnMissingName(missing, {component, subject, fix})` in `src/lib/warn-missing-name.ts`. A `useEffect` calls `console.warn` when `missing` is true and `process.env.NODE_ENV !== "production"`, so it fires once per instance (again only if `missing` turns false and true again). The message is `[Rixl <component>]: <subject> must have an accessible name. <fix>`. `warnInputProps` is deleted.

**Alternatives considered**: warning during render, as `warnInputProps` did: it repeated on every re-render and in React Strict Mode. A module-level "seen" set: dedupes across instances, which hides the second unnamed input, and needs a reset between tests. Both rejected.

**Evidence**: `warn-missing-name.test.tsx`.

### D2. Dialog: no automatic close button

**Chosen**: remove `showCloseButton`, `closeButtonProps` and `DialogCloseButton`. Consumers compose `DialogClose` with their own `Button` and `aria-label`.

**Alternatives considered**: keep the X and require `closeButtonProps["aria-label"]` with a warning. It would keep a Rixl-only API Kumo does not have, and every `Dialog` would carry an unnamed-by-default button. Rejected for Kumo parity (pre-v1, no shims).

**Evidence**: Kumo `dialog.md` renders `<Dialog.Close aria-label="Close" render={…Button… aria-label="Close"}/>` in every example.

### D3. Info-icon trigger: app-supplied, no default

**Chosen**: `labelTooltipAriaLabel` prop on `Input`, `InputArea`, `InputGroup` and `Select`; warn when `labelTooltip` is set without it. The provider has no `moreInformation` key.

**Alternatives considered**: keep Kumo's provider default `"More information"`. Kumo does ship it, but it is hidden screen-reader English and the owner's rule is that the app names it. Documented as a deliberate deviation from Kumo.

### D4. `(optional)` stays, `labels` on Input goes

**Chosen**: `input.optional` stays in the provider. It is visible copy and Kumo ships it (`label.optional`). The per-instance `labels` prop on the four field components is removed: Kumo's form components have no such prop, and an app that wants another word sets the provider.

### D5. Breadcrumb landmark keeps its default

**Chosen**: `breadcrumb.label` stays, default `"breadcrumb"` (lowercase, as Kumo ships it, and as Rixl shipped it before this change). `aria-label` wins. The ellipsis is `aria-hidden` with no text, as in Kumo.

**Alternatives considered**: warn on a missing landmark name. A `<nav>` without a name is valid HTML and the default is the same one Kumo ships, so there is nothing to warn about.

### D6. Tabs scroll buttons are not part of the accessibility tree

**Chosen**: `aria-hidden="true"` and `tabIndex={-1}` always, no name, no `labels`. Arrow-key navigation among tabs already scrolls the focused tab into view, so the buttons only duplicate it for pointer users.

**Alternatives considered**: Kumo keeps them as named, focusable buttons. Following that needs two English strings and a keyboard stop that does nothing a keyboard user lacks. Deviation documented.

**Evidence**: the existing `tabs` tests for keyboard scrolling (`tabs.test.tsx`), and the axe browser test with the list overflowing.

### D7. Sidebar: names are props

**Chosen**: the mobile sheet is a Base UI dialog popup named by `Sidebar`'s `aria-label` / `aria-labelledby` (put on the popup); the hidden `DialogHeader` is deleted along with "Displays the mobile sidebar.". `SidebarTrigger` and `SidebarRail` take their name from `aria-label` / `aria-labelledby` and drop the `title` the rail copied from its label. Each warns when unnamed. The desktop `Sidebar` is a plain landmark-less container and is not checked.

### D8. Toaster: sonner's props

**Chosen**: no defaults from Rixl. `containerAriaLabel` and `toastOptions.closeButtonAriaLabel` pass straight to sonner, whose own defaults ("Notifications alt+T", "Close toast") apply when the app sets nothing. No warning: sonner ships a name.

### D9. Empty: `commandTitle`

**Chosen**: `commandTitle?: string` names the `CopyBlock` that shows `commandLine`; setting `commandLine` without it warns. `CopyBlock`'s `title` is required because the button name is `copy(title)`.

## Dropped

- The provider keys `dialog.close`, `breadcrumb.more`, `empty.command`, `input.moreInformation`, `sidebar.*`, `tabs.*`, `toaster.*`. They existed for one release on this branch and never shipped to npm.
