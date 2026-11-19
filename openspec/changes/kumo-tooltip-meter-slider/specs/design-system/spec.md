# Spec Delta

## ADDED Requirements

### Requirement: Tooltip is one component

`Tooltip` SHALL take `content`, an optional `render` trigger element, `side`, `align`, `delay` and `closeDelay`, and render its children inside the trigger. `TooltipTrigger` and `TooltipContent` SHALL NOT be exported. `TooltipProvider` SHALL remain.

#### Scenario: Shorthand opens its content

- **WHEN** a consumer renders `<Tooltip content="Save" render={<button type="button" />}>Save</Tooltip>` and focuses the button
- **THEN** a tooltip reading "Save" opens

#### Scenario: Disabled never opens

- **WHEN** a consumer renders `<Tooltip content="Save" disabled>` and hovers the trigger
- **THEN** no tooltip opens

### Requirement: InputGroupButton takes a tooltip

`InputGroupButton` SHALL accept `tooltip` and `tooltipSide` (default `bottom`) and wrap itself in a `Tooltip`. A string `tooltip` SHALL become its `aria-label` unless the app passes one.

#### Scenario: Icon button named by its tooltip

- **WHEN** a consumer renders `<InputGroupButton tooltip="Query help"><HelpIcon /></InputGroupButton>`
- **THEN** the button has the accessible name "Query help" and shows that tooltip on focus

### Requirement: Progress shows a label and a value

`Progress` SHALL accept `label`, `showValue` and `customValue`. `label` SHALL name the bar. `showValue` SHALL render the value next to the label, and `customValue` SHALL replace its text.

#### Scenario: Label names the bar

- **WHEN** a consumer renders `<Progress label="Storage" value={65} />`
- **THEN** the progressbar has the accessible name "Storage" and shows "65%"

#### Scenario: Custom value text

- **WHEN** a consumer renders `<Progress label="API" value={75} customValue="750 / 1,000" />`
- **THEN** "750 / 1,000" shows in place of "75%"

#### Scenario: Missing name warns

- **WHEN** a consumer renders `<Progress value={10} />` in development
- **THEN** a warning says the progress bar needs an accessible name

### Requirement: Slider is one component

`Slider` SHALL render its control, track, indicator and one thumb per value, and take `label`, `size` (`sm | base`, default `base`) and `getAriaLabel`. The part components SHALL NOT be exported.

#### Scenario: One thumb per value

- **WHEN** a consumer renders `<Slider label="Price" defaultValue={[25, 75]} getAriaLabel={(i) => (i === 0 ? "Minimum" : "Maximum")} />`
- **THEN** two sliders named "Minimum" and "Maximum" render, under the visible label "Price"

#### Scenario: Size

- **WHEN** a consumer renders `<Slider size="sm" />`
- **THEN** the track is shorter than at `base`
