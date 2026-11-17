## ADDED Requirements

### Requirement: Component discovery

The showcase SHALL expose every registered component through the existing component sidebar and a searchable grid of live demos.

#### Scenario: Search from a detail page

- **WHEN** a user searches while viewing a component
- **THEN** matching components appear in the main content area

#### Scenario: Whitespace in search

- **WHEN** a query contains surrounding whitespace
- **THEN** results match the trimmed query

### Requirement: Example browsing

The showcase SHALL provide example navigation and isolated example state per component.

#### Scenario: Switch components

- **WHEN** a user navigates to another component
- **THEN** the destination opens with its own initial control state and preview mode

#### Scenario: Reset example

- **WHEN** a user resets an example
- **THEN** controls and the preview return to their initial state
