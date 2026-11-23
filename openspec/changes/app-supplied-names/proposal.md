## Why

`locale-provider` put every string the library renders into `RixlTranslations`, including screen-reader-only text: the dialog close button's "Close", the info-icon trigger's "More information", the breadcrumb ellipsis's "More", the mobile sidebar's "Sidebar" and "Displays the mobile sidebar.", the tabs scroll buttons, the toast region and close names, the `Empty` command block's "Command". That makes the library the author of hidden English, which an app then has to find and translate key by key.

Kumo's accessibility model is the other way round. Its form components say a bare `Input` "must provide `aria-label` or `aria-labelledby`" (https://kumo-ui.com/components/input.md), its `Dialog` has no auto close button and its docs render `<Dialog.Close aria-label="Close" …>` themselves (https://kumo-ui.com/components/dialog.md), and its `Breadcrumbs` renders the ellipsis as an `aria-hidden` placeholder (https://github.com/cloudflare/kumo/blob/main/packages/kumo/src/components/breadcrumbs/breadcrumbs.tsx). The app supplies names; the library only ships copy it draws itself. All pages and sources fetched 2026-11-18.

Rixl follows that model: the app names things, and the library warns in development when a required name is missing.

## What Changes

- **One dev-only helper.** `useWarnMissingName` (`src/lib/warn-missing-name.ts`) replaces `warnInputProps`. It runs `console.warn` once per component instance, only outside production, and the message names the component and the prop to set.
- **Dialog (breaking).** `DialogContent` stops rendering an automatic close button. `showCloseButton`, `closeButtonProps` and the `DialogCloseButton` export are removed. Consumers render `<DialogClose aria-label="Close" render={<Button …/>} />`, as in Kumo.
- **Input, InputArea, InputGroup, Select field chrome (breaking).** The info-icon trigger takes its name from a new `labelTooltipAriaLabel` prop (Kumo's `Label` has `tooltipAriaLabel`); setting `labelTooltip` without it warns. The per-instance `labels` prop on these components is removed; `(optional)` comes from the provider.
- **Breadcrumb (breaking).** `BreadcrumbEllipsis` loses its screen-reader text and `labels`; it is `aria-hidden`, as in Kumo. The landmark keeps the provider default `breadcrumb` (Kumo ships the same) and `aria-label` still wins.
- **Sidebar (breaking).** `Sidebar`, `SidebarTrigger` and `SidebarRail` lose `labels`. The mobile sheet is named by `Sidebar`'s `aria-label` or `aria-labelledby`, with no hidden title or description. The trigger and rail are named by their own `aria-label`. Each warns when its name is missing.
- **Tabs (breaking).** The overflow scroll buttons are pointer-only affordances (the tab list is already keyboard-navigable), so they are `aria-hidden` and `tabIndex={-1}` and need no name. `TabsList` loses `labels`.
- **Toaster (breaking).** The provider defaults are dropped. `containerAriaLabel` and `toastOptions.closeButtonAriaLabel` are sonner's props, and sonner's own defaults apply when an app passes nothing.
- **Empty (breaking).** `labels` is replaced by `commandTitle`, the title of the command's copy block. Omitting it while `commandLine` is set warns.
- **Locale provider.** `RixlTranslations` keeps only the copy the library draws: `breadcrumb.label`, `copyBlock`, `input.optional` and `pagination`. `RixlLocaleProvider` stays (Kumo has `KumoLocaleProvider`).
- **Docs app.** Every affected example passes names; a short "Accessible names" section follows Kumo's "Label Requirement".

Breaking changes, all pre-v1:

| Before                                                                                                    | After                                                                        |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `<DialogContent showCloseButton closeButtonProps={…}>` and `<DialogCloseButton>`                          | `<DialogClose aria-label="Close" render={<Button …/>} />` in your own header |
| `<Input labelTooltip="…" labels={{moreInformation: "…"}}>`                                                | `<Input labelTooltip="…" labelTooltipAriaLabel="…">`                         |
| `<SidebarTrigger labels={{toggle: "…"}}>`                                                                 | `<SidebarTrigger aria-label="…">`                                            |
| `<Sidebar labels={{title: "…"}}>`                                                                         | `<Sidebar aria-label="…">`                                                   |
| `<Empty labels={{command: "…"}}>`                                                                         | `<Empty commandTitle="…">`                                                   |
| `<BreadcrumbEllipsis labels={{more: "…"}}>`                                                               | `<BreadcrumbEllipsis>` (decorative)                                          |
| `<TabsList labels={{scrollLeft: "…"}}>`                                                                   | `<TabsList>`                                                                 |
| provider keys `dialog`, `empty`, `sidebar`, `tabs`, `toaster`, `input.moreInformation`, `breadcrumb.more` | removed                                                                      |

## Capabilities

### Modified Capabilities

- `design-system`: accessible-name model, locale provider scope.

## Non-goals

- No change to `CopyBlock` or `Pagination` copy: Kumo ships both as English defaults with overrides, and they are visible UI text.
- No change to the DatePicker, which takes names from react-day-picker's `locale`.
- No automatic accessible-name inference (no `title` fallbacks, no text from tooltip content).
- No runtime check in production builds.
- No class-string changes: the RTL and DatePicker work in other branches touches those lines.

## Acceptance

- `git grep -nE "sr-only\">\{t\.|Toggle Sidebar|More information|Displays the mobile|Scroll tabs" packages/ui/src` finds nothing outside tests.
- Every warning has a unit test that fires when the name is missing and stays silent for `aria-label`, `aria-labelledby` and a visible label.
- `vp check`, `vp test --run` (axe browser tests included), coverage floor, `vp pack`, `vpx publint`, `vpx size-limit` and the docs build pass without raising a budget.
