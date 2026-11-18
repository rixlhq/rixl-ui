## Why

Every component that ships text hard-codes English: `CopyBlock` ("Copying", "Copied!", "Copy {title}"), the `Input` field chrome ("(optional)", "More information"), `SidebarTrigger` and `SidebarRail` ("Toggle Sidebar"), the mobile sidebar sheet, `Breadcrumb` ("breadcrumb", "More"), the dialog close button ("Close"), the `Tabs` overflow buttons ("Scroll tabs left/right"), `Empty`'s command block title ("Command"), the default `Pagination` info text, and sonner's default "Notifications" and "Close toast". Only `Pagination` has a `labels` prop. Consuming apps localize with Paraglide JS (compiled message functions such as `m.copy_copied()`), and today they cannot change most of these strings at all.

Kumo solves this with `KumoLocaleProvider` (a partial translations object, unspecified keys fall back to English, exported `KumoTranslations` type) and per-component `labels` props (`ClipboardText labels`, "Accessible labels for i18n"), and a per-instance `aria-label` beats the provider on `Breadcrumbs` (https://kumo-ui.com/components/clipboard-text.md, fetched 2026-11-18 as raw markdown).

## What Changes

- **New `@rixl/ui/locale` subpath.** `RixlLocaleProvider` takes `translations: RixlTranslationsPartial`. Exported types: `RixlTranslations`, `RixlTranslationsPartial`, `RixlLocaleProviderProps`. English defaults live in the library; no other language and no i18n dependency ships. No provider is needed for the defaults.
- **Plain strings and functions only.** Every value is a `string`, or a function for an interpolated one (`copy: (title) => string`). There are no `{title}` templates, so an app passes compiled Paraglide messages straight in. The provider does not memoize on first mount: an app that re-renders it with new strings after a locale switch gets them.
- **Per-component `labels` (partial) on `CopyBlock`, `Input`, `InputArea`, `InputGroup`, `Select`, `SidebarTrigger`, `SidebarRail`, `Sidebar`, `BreadcrumbEllipsis`, `DialogCloseButton`, `Tabs`, `Empty`.** Precedence: per-instance prop, then provider, then English default.
- **Breadcrumb landmark.** Default name from the provider; the `aria-label` prop still wins.
- **Pagination.** `labels` keeps its prop name and its seven keys; the default info text (`Showing <range> of <total>`, `Page <n>`) joins it as the functions `showing` and `page`, and its defaults come from the provider.
- **Toaster.** Sonner's `containerAriaLabel` and `toastOptions.closeButtonAriaLabel` default to the provider's strings; passing them still wins.
- **Breaking: `CopyBlock`.** `tooltipText` is removed. The idle tooltip text is `labels.copy(title)`, the same string as the button's accessible name (Kumo's `ClipboardText` takes `labels`, not a second tooltip string).
- **Docs app.** A Locale showcase with the Paraglide wiring pattern (no Paraglide dependency in the repo) and a `labels` note on each affected component page.

Migration:

| Before                                   | After                                               |
| ---------------------------------------- | --------------------------------------------------- |
| `<CopyBlock tooltipText="Copy token" />` | `<CopyBlock labels={{copy: () => "Copy token"}} />` |

## Capabilities

### Modified Capabilities

- `design-system`: locale provider, per-component `labels`, `CopyBlock` labels.

## Non-goals

- No translated strings other than English, no locale detection, no formatting of dates or numbers.
- No `react-day-picker` locale work beyond month navigation: `DatePicker` already takes its `locale` and `labels` props, and weekday and month names follow `locale`.
- No change to sonner's own props; `labels` is not added to `Toaster`, whose strings are already sonner props.
- No Paraglide dependency, adapter or plugin.

## Acceptance

- `git grep -nE "\"(Copying|Copied!|Toggle Sidebar|More information|\(optional\)|Scroll tabs)" packages/ui/src` finds only `locale/translations.ts` (and tests).
- Every `labels` and provider path has a unit test for the default, the provider override, the per-instance override beating the provider, and partial fallback.
- `vp check`, `vp test --run`, `vp pack`, `vpr publint`, `vpx size-limit` and `vpr docs:build` pass without raising the size budgets or the coverage floor.
