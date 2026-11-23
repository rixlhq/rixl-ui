# Spec Delta

## ADDED Requirements

### Requirement: The app supplies accessible names, the library warns when they are missing

When a component renders an interactive element or landmark whose name only the app can know, the app SHALL supply it through `aria-label`, `aria-labelledby` or a visible label, and the library SHALL NOT render a hidden English default. In development (`process.env.NODE_ENV !== "production"`) the component SHALL call `console.warn` once per instance when the name is missing; the message SHALL name the component and the prop to set. A name supplied by `aria-label`, `aria-labelledby` or a visible label SHALL silence the warning.

#### Scenario: Warning shape

- **WHEN** a component with a missing name mounts outside production
- **THEN** `console.warn` is called once with `[Rixl <Component>]: … must have an accessible name`, and not again on re-render (`warn-missing-name.test.tsx`)

#### Scenario: Silent in production

- **WHEN** `NODE_ENV` is `production`
- **THEN** nothing is warned (`warn-missing-name.test.tsx`)

#### Scenario: Names silence the warning

- **WHEN** the name comes from `aria-label`, `aria-labelledby` or a visible label
- **THEN** nothing is warned (`input.test.tsx`, `input-area.test.tsx`, `input-group.test.tsx`, `sidebar.test.tsx`, `empty.test.tsx`)

### Requirement: Dialog has no automatic close button

`DialogContent` SHALL NOT render a close button, and `showCloseButton`, `closeButtonProps` and `DialogCloseButton` SHALL NOT exist. A consumer renders `DialogClose`, which takes the consumer's `aria-label`.

#### Scenario: No built-in X

- **WHEN** a `DialogContent` opens with only a title and description
- **THEN** it contains no button (`dialog.test.tsx`)

### Requirement: Field chrome names its tooltip trigger from a prop

`Input`, `InputArea`, `InputGroup` and `Select` SHALL take `labelTooltipAriaLabel`, which names the `labelTooltip` trigger. Setting `labelTooltip` without it SHALL warn. They SHALL NOT take `labels`.

#### Scenario: Named trigger

- **WHEN** `<Input label="Key" labelTooltip="Help" labelTooltipAriaLabel="About the key">` renders
- **THEN** a button named `About the key` exists and nothing is warned (`input-field-names.test.tsx`)

#### Scenario: Missing trigger name

- **WHEN** `labelTooltip` is set without `labelTooltipAriaLabel`
- **THEN** a warning names `labelTooltipAriaLabel` (`input-field-names.test.tsx`)

### Requirement: Decorative and pointer-only parts are hidden from assistive technology

`BreadcrumbEllipsis` and the `Tabs` overflow scroll buttons SHALL be `aria-hidden`, and the scroll buttons SHALL NOT be tabbable.

#### Scenario: Ellipsis

- **WHEN** `BreadcrumbEllipsis` renders
- **THEN** it is `aria-hidden` and has no text (`breadcrumb.test.tsx`)

#### Scenario: Scroll buttons

- **WHEN** a `TabsList` overflows
- **THEN** its scroll buttons have `aria-hidden="true"` and `tabindex="-1"` (`tabs.test.tsx`)

### Requirement: Sidebar names come from props

The mobile `Sidebar` sheet SHALL be named by the `aria-label` or `aria-labelledby` passed to `Sidebar`, and SHALL render no hidden title or description. `SidebarTrigger` and `SidebarRail` SHALL be named by their own `aria-label` or `aria-labelledby`. Each SHALL warn when unnamed.

#### Scenario: Named mobile sheet

- **WHEN** a mobile `Sidebar` with `aria-label="Main navigation"` opens
- **THEN** `getByRole("dialog", {name: "Main navigation"})` finds it (`sidebar.test.tsx`)

### Requirement: Empty names its command block from `commandTitle`

> Superseded by `component-owned-labels`: the copy button is named by `labels.copyAction`, so `Empty` takes `commandLine` alone, as in Kumo.

`Empty` SHALL take `commandTitle`, the `title` of the `CopyBlock` that shows `commandLine`, and SHALL warn when `commandLine` is set without it. It SHALL NOT take `labels`.

#### Scenario: Command title

- **WHEN** `<Empty commandLine="npm i x" commandTitle="install command">` renders
- **THEN** the copy button is named `Copy install command` (`empty.test.tsx`)

### Requirement: Toaster passes names to sonner unchanged

`Toaster` SHALL NOT supply default values for `containerAriaLabel` or `toastOptions.closeButtonAriaLabel`.

#### Scenario: Sonner defaults

- **WHEN** `<Toaster />` renders with no name props
- **THEN** sonner's own region name applies (`toaster.test.tsx`)

## MODIFIED Requirements

### Requirement: RixlLocaleProvider overrides built-in strings

`RixlTranslations` SHALL contain only copy the library draws itself: `breadcrumb.label` (the landmark default, `aria-label` wins), `copyBlock`, `input.optional` and `pagination`. Components that take a `labels` prop SHALL be `CopyBlock` and `Pagination` only, with precedence `labels`, then provider, then English.

#### Scenario: Remaining groups

- **WHEN** the provider overrides `input.optional`
- **THEN** `(optional)` changes in all four field components (`input-field-labels.test.tsx`)

## REMOVED Requirements

### Requirement: Components with built-in strings take `labels`

**Reason**: Replaced by "The app supplies accessible names" above; only `CopyBlock` and `Pagination` keep `labels`.
