# Spec Delta

## ADDED Requirements

### Requirement: One size vocabulary

`Button`, `Empty`, `Dialog` and `Tabs` SHALL name their middle size `base`, alongside `Input`, `Select` and `InputArea`. `default` and `md` SHALL NOT be accepted as sizes.

#### Scenario: Each component's set

- **WHEN** a consumer reads the size props
- **THEN** `Button` takes `xs | sm | base | lg`, `Empty` `sm | base | lg`, `Dialog` `sm | base | lg | xl` and `Tabs` `sm | base`, each defaulting to `base`

#### Scenario: Button heights

- **WHEN** a consumer renders `<Button size="xs" />`, `sm`, `base` and `lg`
- **THEN** the buttons carry `h-7`, `h-8`, `h-9` and `h-10`, and a `Button` without `size` carries `h-9`

### Requirement: Button variants and shapes follow Kumo

`Button` SHALL accept `variant` of `primary`, `secondary`, `ghost`, `destructive`, `secondary-destructive` and `outline`, defaulting to `primary`, and `shape` of `base`, `square` and `circle`. `link` and the `icon`, `icon-sm`, `icon-xs` and `icon-lg` sizes SHALL NOT be accepted.

#### Scenario: Square is a fixed-size box

- **WHEN** a consumer renders `<Button shape="square" size="sm" aria-label="Search" />`
- **THEN** the button carries `size-8` and no horizontal padding

#### Scenario: Circle is round

- **WHEN** a consumer renders `<Button shape="circle" aria-label="Add" />`
- **THEN** the button carries `rounded-full` and not `rounded-md`

#### Scenario: Secondary destructive

- **WHEN** a consumer renders `<Button variant="secondary-destructive">Remove</Button>`
- **THEN** the button uses the danger text colour on the secondary surface

### Requirement: Button takes an icon and a title

`Button` SHALL render `icon` before its children, accepting a component or a node, and SHALL replace it with the spinner while `loading`. `title` SHALL wrap the button in a `Tooltip`, SHALL NOT reach the DOM as an attribute, and SHALL name a child-less button when it is a string or number.

#### Scenario: Icon component and node

- **WHEN** a consumer passes `icon={SearchIcon}` or `icon={<SearchIcon />}`
- **THEN** the icon renders before the children

#### Scenario: Loading replaces the icon

- **WHEN** a button with an `icon` is `loading`
- **THEN** the spinner renders and the icon does not

#### Scenario: Title names an icon-only button

- **WHEN** a consumer renders `<Button shape="square" icon={SearchIcon} title="Search" />`
- **THEN** the button has the accessible name "Search" and shows a tooltip "Search" on focus

## MODIFIED Requirements

### Requirement: Button resolves its look from `variant`, then `color`

`Button` SHALL use `variant` when it is given, otherwise a known `color`, otherwise the default variant, `primary`.
