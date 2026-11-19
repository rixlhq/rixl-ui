## Why

`locale/translations.ts` holds `DEFAULT_TRANSLATIONS`, the English copy for four components. Every component entry that reads it (`copy-block`, `input`, `pagination`, `breadcrumb`) shares one chunk with the strings of the others, so a consumer of `@rixl/ui/input` ships pagination's copy. Kumo keeps each default in its own component and uses `KumoLocaleProvider` only to override a handful of strings (https://raw.githubusercontent.com/cloudflare/kumo/989cc18a642ebd87dd632b52a6f4fa282c14f5e1/packages/kumo/src/utils/locale-provider.tsx, fetched 2026-11-19). Kumo's `ClipboardText` also takes `labels: {copyAction}` and an opt-in `tooltip`, and shows "(optional)" only for an explicit `required={false}` (https://kumo-ui.com/components/clipboard-text.md).

## What Changes

- **No central catalogue.** `DEFAULT_TRANSLATIONS` is deleted. Each component owns its English defaults in a sibling module (`copy-block-labels.ts`, `input-field-labels.ts`, `pagination-labels.ts`, `breadcrumb-labels.ts`). `RixlLocaleProvider` is override-only: its value is a partial of each group and holds no defaults. Precedence: `labels` prop, then provider, then the component's default.
- **Pagination** keeps `labels` (same keys); the defaults move to `pagination/pagination-labels.ts`.
- **Breadcrumb** keeps the `aria-label` prop and the provider's `breadcrumb.label`, with the default `"breadcrumb"` in `breadcrumb/breadcrumb-labels.ts`. It takes no `labels` prop, as Kumo's `Breadcrumbs` does not.
- **Field chrome** (`Input`, `InputArea`, `InputGroup`, `Select`) takes `labels={{optional}}` again. `(optional)` shows only when `required` is `false`; `true` and `undefined` show nothing (already the behaviour; now covered by tests for each component).
- **Breaking: `CopyBlock`** follows Kumo's `ClipboardText`.
  - `labels` is `{copyAction, copied}`; the button's accessible name is `labels.copyAction` (default `Copy to clipboard`), no longer `Copy <title>`.
  - A new opt-in `tooltip={{text, copiedText, side}}` shows a tooltip; without it there is none.
  - `labels.copy`, `labels.copying` and `labels.error` are removed, with the "Copying" and "Unable to copy" text. The pending state still disables the button; a failed copy leaves the button idle.
  - The provider group `copyBlock` takes `copyAction` and `copied`.
- **Docs** showcases (Locale, CopyBlock, Breadcrumb, Input family, Select, Pagination) show the provider and `labels`.

Migration:

| Before                                                    | After                                                      |
| --------------------------------------------------------- | ---------------------------------------------------------- |
| `labels={{copy: (title) => \`Copiar ${title}\`}}`         | `labels={{copyAction: "Copiar"}}`                          |
| provider `copyBlock: {copy, copying, copied, error}`      | provider `copyBlock: {copyAction, copied}`                 |
| the idle tooltip (always shown, text `Copy <title>`)      | `tooltip={{text: "Copy"}}` (omit for no tooltip)           |
| status text `Copying`, `Unable to copy. Try again.`       | removed                                                    |
| `RixlTranslations`/`RixlTranslationsPartial` import paths | unchanged                                                  |
| `RixlTranslations["pagination"]` as the labels type       | `PaginationLabels` from `@rixl/ui/pagination` (same shape) |

## Capabilities

### Modified Capabilities

- `design-system`: locale provider is override-only, component-owned `labels`, `CopyBlock` API.

## Non-goals

- No change to app-supplied accessible names or their development warnings (`app-supplied-names`).
- No change to `DatePicker`; calendar text stays on react-day-picker's `locale`.
- No translated strings other than English.

## Acceptance

- `git grep -n "DEFAULT_TRANSLATIONS" packages apps` finds nothing.
- After `vp pack`, `dist` chunks of `button` and `input` contain neither pagination's nor CopyBlock's strings.
- Every `labels` and provider path has a test for the default, the provider override, and `labels` beating the provider.
- `vp check`, `vp test --run`, `vpr knip`, `vpr budget`, `vpr publint` and `vpr ci` pass; `.size-limit.json` is unchanged.
