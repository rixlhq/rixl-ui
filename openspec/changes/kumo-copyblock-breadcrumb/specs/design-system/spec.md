# Spec Delta

## ADDED Requirements

### Requirement: CopyBlock follows Kumo's ClipboardText options

`CopyBlock` SHALL take `text` for the displayed value, `textToCopy` to copy something else, `size` (`sm | base | lg`, default `lg`) and `masked`. `value` SHALL NOT be accepted.

#### Scenario: Copies text by default

- **WHEN** a consumer renders `<CopyBlock text="abc" />` and presses the copy button
- **THEN** "abc" is written to the clipboard

#### Scenario: Copies textToCopy instead

- **WHEN** a consumer renders `<CopyBlock text="sk_live_***" textToCopy="sk_live_123" />` and presses the copy button
- **THEN** "sk_live_123" is written to the clipboard and "sk_live_***" stays shown

#### Scenario: Size sets the layout

- **WHEN** a consumer renders `<CopyBlock text="abc" size="sm" />`
- **THEN** the text is `text-xs` and the copy button is the `xs` Button size

### Requirement: A masked CopyBlock hides its content until revealed

A `masked` `CopyBlock` SHALL show bullets in place of its `text` and `children`, and SHALL render a reveal button named by `labels.revealAction` (default "Reveal value"). Pressing it SHALL show the content and rename the button `labels.hideAction` (default "Hide value"). Both labels SHALL resolve as the other labels do: `labels`, then `RixlLocaleProvider`, then English.

#### Scenario: Masked by default

- **WHEN** a consumer renders `<CopyBlock text="secret" masked />`
- **THEN** "secret" is not in the document and a button named "Reveal value" is

#### Scenario: Reveal and hide

- **WHEN** the user presses "Reveal value", then "Hide value"
- **THEN** "secret" appears, then is hidden again

#### Scenario: Copying while masked

- **WHEN** a masked block is not revealed and the user presses the copy button
- **THEN** the text is written to the clipboard

#### Scenario: Children stay hidden

- **WHEN** a consumer renders `<CopyBlock text="secret" masked><b>secret</b></CopyBlock>`
- **THEN** neither is in the document until revealed

#### Scenario: Provider labels

- **WHEN** `RixlLocaleProvider` sets `copyBlock.revealAction` to "Anzeigen" and the block sets none
- **THEN** the reveal button is named "Anzeigen"

### Requirement: Breadcrumb takes size, icons and a loading page

`Breadcrumb` SHALL take `size` (`sm | base`, default `base`). `BreadcrumbLink` and `BreadcrumbPage` SHALL take `icon`. `BreadcrumbPage` SHALL take `loading`, which replaces its content with a placeholder and omits `aria-current`.

#### Scenario: Small trail

- **WHEN** a consumer renders `<Breadcrumb size="sm">`
- **THEN** the landmark is `text-xs`

#### Scenario: Link icon

- **WHEN** a consumer renders `<BreadcrumbLink href="/" icon={<svg data-testid="i" />}>Home</BreadcrumbLink>`
- **THEN** the icon renders before "Home" inside the link

#### Scenario: Loading page

- **WHEN** a consumer renders `<BreadcrumbPage loading>Title</BreadcrumbPage>`
- **THEN** "Title" is not in the document, a placeholder is, and `aria-current` is absent

### Requirement: Sidebar parts are hooked by data-slot

The sidebar parts SHALL carry `data-slot` and SHALL NOT carry `data-sidebar`. Focusable sidebar parts SHALL draw a 2 px ring in `--rixl-sidebar-ring`.

#### Scenario: Focus ring

- **WHEN** a sidebar menu button takes keyboard focus
- **THEN** its box-shadow ring is 2 px wide and uses `--rixl-sidebar-ring`

#### Scenario: Menu action padding

- **WHEN** a `SidebarMenuItem` holds a `SidebarMenuAction`
- **THEN** its `SidebarMenuButton` has end padding for the action

### Requirement: Select and menu check marks share one wrapper

The check-mark wrapper of `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem` and `SelectItem` SHALL be one class set, `pointer-events-none absolute flex size-3.5 items-center justify-center`, plus `start-2` for the dropdown items and `end-2` for `SelectItem`.

#### Scenario: Select check on the end side

- **WHEN** a `SelectItem` renders
- **THEN** its indicator wrapper has `end-2` and `pointer-events-none`
