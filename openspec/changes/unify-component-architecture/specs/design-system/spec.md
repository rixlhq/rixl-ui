# Spec Delta

## ADDED Requirements

### Requirement: Canonical components preserve accessible composition

The library SHALL expose InputArea and Empty and keep legacy entry adapters during consumer migration. InputArea SHALL support textarea refs, native props, labels and descriptions consistently with Input. DatePicker SHALL use the supplied date-fns locale throughout the grid.

#### Scenario: Multiline field

- **WHEN** InputArea is rendered with label, description and a ref
- **THEN** the label and description are associated with the textarea and the ref can focus it

#### Scenario: Explicit date locale

- **WHEN** DatePicker receives a French locale with month dropdowns
- **THEN** month options use French independently of the environment locale

### Requirement: Dialog is one role-aware family

Dialog SHALL provide normal and alert roles with shared presentation parts. Alerts SHALL reject outside-pointer dismissal while supporting cancellation. Legacy AlertDialog and Sheet entries SHALL delegate to canonical infrastructure.

#### Scenario: Alert cancellation

- **WHEN** an alert dialog is open
- **THEN** outside pointer input leaves it open and Escape can cancel it with focus restored

### Requirement: Cards are passive containers

Card SHALL provide surface and layout styling without built-in click affordances or press movement, including when a deprecated interactive prop is supplied.

#### Scenario: Card actions

- **WHEN** a consumer places a Button inside Card
- **THEN** the Button owns its interaction and the Card adds no clickable cursor or press transform

### Requirement: Pagination supports composed navigation

Pagination SHALL use bounded page targets, expose independently arranged information and controls, and support strict integer page entry with invalid-draft recovery.

#### Scenario: Out of range controlled page

- **WHEN** a current page exceeds the known total
- **THEN** displayed navigation and emitted previous/next targets remain within bounds

#### Scenario: Page entry

- **WHEN** the user commits an invalid page draft
- **THEN** the current page is restored without emitting an invalid target

### Requirement: Tab motion does not block navigation

Tabs SHALL preserve intentional visual motion while permitting selection changes before animation completion. Overflow navigation SHALL support logical direction, visible focus and reduced-motion preferences.

#### Scenario: Keyboard activation

- **WHEN** the user activates a tab with the keyboard
- **THEN** selection and panel presence update without waiting for the preceding animation to finish

### Requirement: Clipboard feedback reflects completion

CopyBlock SHALL confirm a copy only after clipboard success and SHALL handle rejection without success feedback.

#### Scenario: Clipboard pending or rejected

- **WHEN** a clipboard request is pending or rejects
- **THEN** copied feedback is absent and failure is recoverable

### Requirement: React 18 refs remain usable

Public DOM-bearing wrappers SHALL forward refs on React 18 and React 19, including when internal measurement also needs a ref.

#### Scenario: Forwarded control and list refs

- **WHEN** a consumer renders a control or TabsList with a ref under React 18
- **THEN** the ref resolves to its DOM target and internal behavior remains functional
