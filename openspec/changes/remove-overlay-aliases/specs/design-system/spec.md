# Spec Delta

## MODIFIED Requirements

### Requirement: Open popups meet WCAG 2.2 AA

Dialog (normal and alert), dropdown menu, popover and select SHALL have no axe-detectable WCAG 2.2 AA violations while open, with the preset's light tokens applied.

#### Scenario: Open in a real browser

- **WHEN** each is opened in Chromium in its browser test
- **THEN** `axeViolations(document.body)` returns no violations (`<name>.browser.test.tsx`, `has no WCAG 2.2 AA violations when open`)

#### Scenario: Danger text contrast

- **WHEN** a destructive menu item renders its text in `--rixl-danger` on the light surface
- **THEN** the contrast is at least 4.5:1 (`dropdown-menu.browser.test.tsx`)

#### Scenario: Select needs a name from the consumer

- **WHEN** a consumer renders `SelectTrigger`
- **THEN** it has `role="combobox"`, which takes no name from its text, so the consumer gives it `aria-label` or a `<Label>` (documented on `SelectTrigger`)

## ADDED Requirements

### Requirement: Dialog is the only dialog and alert component

`Dialog` SHALL be the only dialog and alert-dialog component and SHALL NOT offer edge placement. `@rixl/ui/alert-dialog`, `@rixl/ui/sheet`, the `AlertDialog*` and `Sheet*` exports and `DialogContent`'s `side` prop SHALL NOT exist.

#### Scenario: Subpaths removed

- **WHEN** `package.json#exports`, `vite.config.ts#pack.entry` and `src/index.ts` are read
- **THEN** `./dialog` exists and neither `./alert-dialog` nor `./sheet` does

### Requirement: Alert role ignores outside input and confirms explicitly

`<Dialog role="alertdialog">` SHALL stay open on outside pointer input, SHALL close on Escape or on a `DialogClose` with focus restored to its trigger, and SHALL NOT dismiss when a plain `Button` inside it is activated.

#### Scenario: Outside click and Escape

- **WHEN** an alert dialog is open, the page outside it is clicked, and then Escape is pressed
- **THEN** it is still open after the click and closed after Escape, with focus on its trigger

#### Scenario: Confirmation does not dismiss

- **WHEN** a consumer activates a `Button` inside an alert dialog
- **THEN** the button's handler runs and the dialog stays open until a `DialogClose` is activated or `open` changes

#### Scenario: Cancel is a Button

- **WHEN** a consumer renders `<DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>` inside an alert dialog and activates it
- **THEN** the dialog closes and the control carries the outline Button classes

### Requirement: The mobile sidebar panel slides in from its side

Below the desktop breakpoint, `Sidebar` SHALL open as a panel anchored to its `side` edge, `--sidebar-width` wide, that scrolls long content within the viewport and closes on Escape or a backdrop click.

#### Scenario: Panel width

- **WHEN** a left or right `Sidebar` opens at a 400px or a 700px viewport
- **THEN** the panel is exactly `--sidebar-width` wide

#### Scenario: Long panel

- **WHEN** the panel holds more content than fits in a 320px by 320px viewport
- **THEN** it stays inside the viewport and its last item is reachable by scrolling
