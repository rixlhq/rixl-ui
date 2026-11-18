# Spec Delta

## ADDED Requirements

### Requirement: RixlLocaleProvider overrides built-in strings

`@rixl/ui/locale` SHALL export `RixlLocaleProvider`, which takes `translations` (`RixlTranslationsPartial`, a partial of `RixlTranslations` at both levels), and the types `RixlTranslations`, `RixlTranslationsPartial` and `RixlLocaleProviderProps`. Every `RixlTranslations` value SHALL be a string, or a function for an interpolated string. English defaults SHALL apply without a provider and for any key the provider leaves out. A nested provider SHALL override its parent per key and inherit the rest. The provider SHALL show new `translations` on re-render.

#### Scenario: Defaults need no provider

- **WHEN** a consumer renders `<Breadcrumb>` with no provider
- **THEN** the landmark is named `breadcrumb` (`locale-provider.test.tsx`)

#### Scenario: Provider overrides one key and keeps the rest

- **WHEN** a consumer wraps `<CopyBlock>` in `<RixlLocaleProvider translations={{copyBlock: {copied: "Kopiert!"}}}>` and copies
- **THEN** the status reads `Kopiert!` and the button is still named `Copy <title>` (`locale-provider.test.tsx`)

#### Scenario: Locale switch

- **WHEN** the provider re-renders with different `translations`
- **THEN** the rendered strings change (`locale-provider.test.tsx`)

#### Scenario: Nested providers merge

- **WHEN** an inner provider sets `copyBlock.copied` inside an outer one that sets `copyBlock.copying`
- **THEN** both overrides apply (`locale-provider.test.tsx`)

#### Scenario: Merging is per key and ignores undefined [property]

- **WHEN** any layers of partial translations are merged
- **THEN** each key takes the last layer that defines it, and a key no layer defines is absent (`merge-translations.test.ts`)

### Requirement: Components with built-in strings take `labels`

`CopyBlock`, `Input`, `InputArea`, `InputGroup`, `Select`, `SidebarTrigger`, `SidebarRail`, `Sidebar`, `BreadcrumbEllipsis`, `DialogCloseButton`, `TabsList`, `Empty` and `Pagination` SHALL take a `labels` prop, a partial of their group in `RixlTranslations`. Precedence SHALL be the `labels` prop, then the provider, then the English default. `Breadcrumb` SHALL name its landmark from the provider, and an `aria-label` prop SHALL win. `Toaster` SHALL default sonner's `containerAriaLabel` and `toastOptions.closeButtonAriaLabel` to the provider's strings, and those props SHALL win.

#### Scenario: Instance beats provider beats default

- **WHEN** a component renders with no override, then inside a provider that overrides one key, then with a `labels` prop for the same key
- **THEN** it shows the English default, the provider string, then the `labels` string (one test per component: `copy-block.test.tsx`, `input-field-labels.test.tsx`, `sidebar-labels.test.tsx`, `breadcrumb.test.tsx`, `dialog.test.tsx`, `tabs-labels.test.tsx`, `empty.test.tsx`, `pagination.test.tsx`, `toaster.test.tsx`)

#### Scenario: Partial labels keep the other defaults

- **WHEN** a component renders with `labels` for one key
- **THEN** its other strings stay at the provider or English default (same files)

#### Scenario: Breadcrumb aria-label wins

- **WHEN** `<Breadcrumb aria-label="Trail">` renders inside a provider that sets `breadcrumb.label`
- **THEN** the landmark is named `Trail` (`breadcrumb.test.tsx`)

### Requirement: CopyBlock strings come from labels

`CopyBlock` SHALL take `labels` with `copy(title)`, `copying`, `copied` and `error`. The button's accessible name and the idle tooltip SHALL both be `labels.copy(title)`. `CopyBlock` SHALL NOT accept `tooltipText`.

#### Scenario: Interpolated label

- **WHEN** a consumer passes `labels={{copy: (title) => \`Copiar ${title}\`}}`with`title="Token"`
- **THEN** the button is named `Copiar Token` (`copy-block.test.tsx`)

#### Scenario: tooltipText is rejected

- **WHEN** a consumer passes `tooltipText`
- **THEN** the compiler rejects it (`copy-block.test.tsx`, `@ts-expect-error`)

### Requirement: Pagination's default info text is a label

`Pagination` `labels` SHALL also take `page(page)` and `showing(range, total)`, which the default info text uses when `text` and the `PaginationInfo` children are absent.

#### Scenario: Translated info

- **WHEN** a consumer passes `labels={{showing: (range, total) => \`\${range} de \${total}\`}}`
- **THEN** the info reads `21–25 de 25` (`pagination.test.tsx`)
