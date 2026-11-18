# Spec Delta

## ADDED Requirements

### Requirement: Empty is the single empty-state component

`Empty` SHALL be the only empty-state component; `EmptyState` and `@rixl/ui/empty-state` SHALL NOT be exported.

#### Scenario: Subpath removed

- **WHEN** `package.json#exports` and `vite.config.ts#pack.entry` are read
- **THEN** `./empty` exists and `./empty-state` does not

### Requirement: Empty shows a title and optional description

`Empty` SHALL render `title` as a heading and `description` below it when provided.

#### Scenario: Title only

- **WHEN** a consumer renders `<Empty title="No results" />`
- **THEN** a heading named "No results" is present and no description paragraph is rendered

### Requirement: Empty heading level is configurable

`Empty` SHALL render its title as an `h3` by default and as the level given by `headingLevel`.

#### Scenario: Level override

- **WHEN** a consumer renders `<Empty title="No results" headingLevel={2} />`
- **THEN** the title is an `h2`

### Requirement: Empty icon is optional and decorative

`Empty` SHALL render an icon container only when `icon` is provided, and it SHALL be hidden from assistive technology.

#### Scenario: No icon

- **WHEN** a consumer renders `<Empty title="No results" />`
- **THEN** no icon container is rendered

#### Scenario: Custom icon

- **WHEN** a consumer renders `<Empty title="No results" icon={<svg data-testid="icon" />} />`
- **THEN** the icon is rendered inside an `aria-hidden` container

### Requirement: Empty sizes

`Empty` SHALL support `size` values `sm`, `default` and `lg`, defaulting to `default`, each with distinct spacing.

#### Scenario: Size applies spacing

- **WHEN** a consumer renders `<Empty title="x" size="sm" />` and `<Empty title="x" size="lg" />`
- **THEN** the root classes differ, and `compact` is not a valid size

### Requirement: Empty shows a copyable command

`Empty` SHALL render `commandLine` in a copyable block, and the block SHALL copy exactly that string.

#### Scenario: Copy command

- **WHEN** a consumer renders `<Empty title="No apps" commandLine="npm create rixl" />` and activates the copy button
- **THEN** the clipboard holds `npm create rixl`

### Requirement: Empty accepts caller-owned actions

`Empty` SHALL render `action` and `children` as given, without adding icons or changing its own presentation.

#### Scenario: Action

- **WHEN** a consumer renders `<Empty title="x" action={<Button>Retry</Button>} />`
- **THEN** a button named "Retry" is present and the root classes equal those without the action

### Requirement: Empty root behaves like a DOM element

`Empty` SHALL forward its ref and remaining props to the root and merge `className` so a conflicting consumer class wins.

#### Scenario: Class override

- **WHEN** a consumer renders `<Empty title="x" className="border-solid" data-testid="root" />`
- **THEN** the root has `border-solid`, not `border-dashed`, and the `data-testid` attribute
