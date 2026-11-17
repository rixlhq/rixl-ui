## ADDED Requirements

### Requirement: Component discovery

The showcase SHALL expose every registered component through the existing component sidebar and a searchable grid of live demos.

#### Scenario: Search from a detail page

- **WHEN** a user searches while viewing a component
- **THEN** matching component links appear in a search popover while the current page stays visible

#### Scenario: Whitespace in search

- **WHEN** a query contains surrounding whitespace
- **THEN** results match the trimmed query

### Requirement: Example browsing

The showcase SHALL provide example navigation and isolated example state per component.

#### Scenario: Switch components

- **WHEN** a user navigates to another component
- **THEN** the destination opens with its own initial control state and preview mode

#### Scenario: Browse examples on a narrow screen

- **WHEN** the full example outline does not fit beside the content
- **THEN** a compact selector lets the user jump to any example

#### Scenario: Demo toolbar

- **WHEN** a user views an example
- **THEN** the toolbar offers preview and code without a reset action
