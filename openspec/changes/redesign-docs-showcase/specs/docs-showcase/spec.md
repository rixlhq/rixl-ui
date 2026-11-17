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

### Requirement: Copy feedback

Copy actions SHALL report success or failure inline without opening a toast.

#### Scenario: Successful copy

- **WHEN** the clipboard accepts the snippet
- **THEN** the button briefly reads Copied before returning to its original label

#### Scenario: Clipboard unavailable

- **WHEN** copying fails
- **THEN** the button reports Copy failed and remains available to retry

### Requirement: Focus after navigation

Component navigation SHALL move keyboard focus to the destination heading.

#### Scenario: Select a component

- **WHEN** a user chooses a component from the sidebar or search results
- **THEN** the destination heading receives focus after the navigation surface closes

#### Scenario: Dismiss search

- **WHEN** a user dismisses search without navigating
- **THEN** focus returns to the search trigger
