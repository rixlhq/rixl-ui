# Spec Delta

## MODIFIED Requirements

### Requirement: RixlLocaleProvider overrides built-in strings

`@rixl/ui/locale` SHALL export `RixlLocaleProvider`, which takes `translations` (`RixlTranslationsPartial`, a partial of `RixlTranslations` at both levels), and the types `RixlTranslations`, `RixlTranslationsPartial` and `RixlLocaleProviderProps`. The provider SHALL hold no English defaults: each component owns its defaults and applies them for any string the provider and `labels` leave out. A nested provider SHALL override its parent per key. The provider SHALL show new `translations` on re-render.

#### Scenario: Defaults need no provider

- **WHEN** a component renders with no provider
- **THEN** it shows its English default (`breadcrumb-labels.test.tsx`, `copy-block-labels.test.tsx`, `pagination-labels.test.tsx`)

#### Scenario: Provider overrides one key and keeps the rest

- **WHEN** a provider sets one string of a group
- **THEN** that string changes and the group's other strings stay at the component default (`locale-provider.test.tsx`)

#### Scenario: Nested providers merge, undefined does not override

- **WHEN** an inner provider sets a key the outer one did not, or sets a key to `undefined`
- **THEN** both outer keys apply and `undefined` leaves the lower layer's string (`locale-provider.test.tsx`, `merge-translations.test.ts`)

### Requirement: Components with built-in copy take `labels`

`CopyBlock`, `Pagination`, `Input`, `InputArea`, `InputGroup` and `Select` SHALL take `labels`, a partial of their group in `RixlTranslations`. Precedence SHALL be the `labels` prop, then the provider, then the component default. `Breadcrumb` SHALL take no `labels`: its landmark name is the `aria-label` prop, then the provider's `breadcrumb.label`, then `breadcrumb`.

#### Scenario: Instance beats provider beats default

- **WHEN** a component renders with no override, then inside a provider that overrides one key, then with `labels` for the same key
- **THEN** it shows the default, the provider string, then the `labels` string (`copy-block-labels.test.tsx`, `pagination-labels.test.tsx`, `input-field-labels.test.tsx`)

#### Scenario: Breadcrumb aria-label wins

- **WHEN** `<Breadcrumb aria-label="Trail">` renders inside a provider that sets `breadcrumb.label`
- **THEN** the landmark is named `Trail` (`breadcrumb-labels.test.tsx`)

### Requirement: Field chrome marks optional fields only on explicit `required={false}`

`Input`, `InputArea`, `InputGroup` and `Select` SHALL show `labels.optional` (default `(optional)`) after the label only when `required` is `false`. When `required` is `true` or `undefined` they SHALL show nothing.

#### Scenario: Three cases

- **WHEN** a field renders with `required={false}`, `required` or no `required`
- **THEN** `(optional)` appears only for `false` (`input-field-labels.test.tsx`)

## REMOVED Requirements

### Requirement: CopyBlock strings come from labels

**Reason**: `CopyBlock` now follows Kumo's `ClipboardText`: `labels` is `{copyAction, copied}`.
**Migration**: see the table in `proposal.md`.

## ADDED Requirements

### Requirement: CopyBlock is named by `labels.copyAction` and shows a tooltip only on request

`CopyBlock` SHALL name its button `labels.copyAction` (default `Copy to clipboard`), without the title. It SHALL render no tooltip unless `tooltip` is set. With `tooltip={{text, copiedText, side}}` the tooltip SHALL show `text` (default: the button's name), then `copiedText` (default: `labels.copied`, default `Copied`) after a successful copy. A successful copy SHALL be announced through a status region with `labels.copied`. `CopyBlock` SHALL NOT render "Copying" or an error message.

#### Scenario: Name

- **WHEN** `<CopyBlock title="Token" value="abc" />` renders
- **THEN** the button is named `Copy to clipboard` and no tooltip opens on hover (`copy-block-labels.test.tsx`)

#### Scenario: Opt-in tooltip

- **WHEN** `tooltip={{text: "Copy"}}` is set and the button is hovered, then clicked
- **THEN** the tooltip reads `Copy`, then `Copied` (`copy-block-tooltip.test.tsx`)

#### Scenario: Failure is silent and not confirmed

- **WHEN** the clipboard rejects
- **THEN** nothing is announced and the copied state is not shown (`copy-outcomes.test.tsx`)
