# Spec Delta

## ADDED Requirements

### Requirement: Borders use the border token

Every border drawn by `TableRow`, `TableFooter` and an outline `Badge` SHALL use the `--rixl-border` colour, not the text colour.

#### Scenario: Table row

- **WHEN** a `TableRow` is rendered in a browser
- **THEN** its bottom border colour equals the `--rixl-border` colour

#### Scenario: Table footer

- **WHEN** a `TableFooter` is rendered in a browser
- **THEN** its top border colour equals the `--rixl-border` colour

#### Scenario: Outline badge

- **WHEN** a `Badge` with `variant="outline"` is rendered in a browser
- **THEN** its border colour equals the `--rixl-border` colour

### Requirement: Alert has no implicit role

`Alert` SHALL render no `role` unless the consumer passes one, so a static banner is not announced as an urgent message.

#### Scenario: Static banner

- **WHEN** a consumer renders `<Alert>Saved</Alert>`
- **THEN** the element has no `role` attribute

#### Scenario: Urgent message

- **WHEN** a consumer renders `<Alert role="alert">Failed</Alert>`
- **THEN** the element has `role="alert"`

### Requirement: Alert titles wrap

`AlertTitle` SHALL wrap a long title onto further lines and SHALL NOT clamp it.

#### Scenario: Long title

- **WHEN** an `AlertTitle` holds text wider than the alert
- **THEN** the title is taller than one line and none of its text is clipped

### Requirement: Focus rings match across components

`Badge` and `BreadcrumbLink` SHALL show the focus ring the other interactive components show: a 3px ring in the `--rixl-ring` colour at half opacity.

#### Scenario: Badge link focus

- **WHEN** a `Badge` rendered as a link receives keyboard focus
- **THEN** its box-shadow ring is 3px wide and no outline is drawn

#### Scenario: Breadcrumb link focus

- **WHEN** a `BreadcrumbLink` receives keyboard focus
- **THEN** its box-shadow ring is 3px wide

### Requirement: Table rows show selection

`TableRow` SHALL show the selected background when `aria-selected="true"` or `data-state="selected"`.

#### Scenario: aria-selected row

- **WHEN** a `TableRow` has `aria-selected="true"`
- **THEN** its background is the `--rixl-surface-muted` colour

#### Scenario: Unselected row

- **WHEN** a `TableRow` has no selection attribute
- **THEN** its background is transparent

### Requirement: Leaf components forward refs

`Alert`, `AlertTitle`, `AlertDescription`, `Badge`, every table part, `Breadcrumb` and its parts, `Label` and `Separator` SHALL forward a `ref` to their DOM element under React 18.

#### Scenario: Ref on each part

- **WHEN** a consumer passes a `ref` to one of these components
- **THEN** the ref holds the rendered element of the expected tag

### Requirement: The axe helper ignores infinite animations

`axeViolations` SHALL wait only for animations that end, so a page with an infinite animation is still checked.

#### Scenario: Looping animation

- **WHEN** an element with an infinite animation is passed to `axeViolations`
- **THEN** it resolves without the caller cancelling the animation
