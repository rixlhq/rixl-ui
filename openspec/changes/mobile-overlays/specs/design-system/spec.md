## ADDED Requirements

### Requirement: Dialogs adapt to narrow viewports

Regular dialogs SHALL fill the viewport below 640px and retain centered size variants at larger widths. Long text and data SHALL remain within the dialog, with final actions reachable by scrolling. Confirmation alerts SHALL remain inset and height bounded.

#### Scenario: Long mobile dialog

- **WHEN** a regular dialog with long text and wide tabular data opens at 320px width
- **THEN** it fills the viewport without horizontal page overflow and its final action is reachable by scrolling

#### Scenario: Desktop sizes

- **WHEN** each dialog size opens at desktop width
- **THEN** it is centered with its existing maximum width

#### Scenario: Long confirmation

- **WHEN** an alert with long text opens in a short viewport
- **THEN** it stays inset and its final action is reachable by scrolling

### Requirement: Floating surfaces contain long content

Sheets on every side, popovers and dropdown submenus SHALL fit the viewport height and allow scrolling to their final content. Long unbroken text SHALL wrap within overlay surfaces.

#### Scenario: Long surface

- **WHEN** each surface opens with more content than fits at 320px width or in short landscape
- **THEN** the surface stays within the viewport and its last item is reachable

### Requirement: Phone controls support touch and readable entry

Dialog and sheet close controls SHALL have at least 44px targets below 640px. Inputs and textareas SHALL use at least 16px text below 640px without changing desktop text sizes.

#### Scenario: Phone form

- **WHEN** a dialog form renders below 640px
- **THEN** its close target measures at least 44px and its text fields use at least 16px text
