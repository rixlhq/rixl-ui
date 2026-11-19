# Spec Delta

## ADDED Requirements

### Requirement: Consumer classes override token defaults

> Superseded: `cn` is now the plain `cn` package, so a consumer `className` no longer replaces `rixl-*` token utilities. See `openspec/specs/design-system/spec.md`.

A consumer `className` SHALL replace a component's default radius, shadow, transition duration and easing, including defaults that read `rixl-*` tokens.

#### Scenario: Rounded button

- **WHEN** a consumer renders `<Button className="rounded-full">`
- **THEN** the rendered element has a fully rounded radius and no `rounded-rixl-md` class

### Requirement: Switch thumb stays in its track in both directions

The Switch thumb SHALL travel within the track in left-to-right and right-to-left documents.

#### Scenario: Checked switch in RTL

- **WHEN** a checked Switch renders inside `dir="rtl"`
- **THEN** the thumb's bounding box lies within the track's

### Requirement: Indeterminate progress is distinguishable from complete

Progress SHALL render an indeterminate value differently from a complete one.

#### Scenario: Null value

- **WHEN** Progress receives `value={null}`
- **THEN** the indicator is narrower than the track and animates, and stops animating under reduced motion

### Requirement: Tooltips inherit provider timing

Tooltip SHALL use the delay of the nearest consumer TooltipProvider, and TooltipProvider SHALL default to a hover-intent delay.

#### Scenario: App-level delay

- **WHEN** Tooltips render under `<TooltipProvider delay={300}>`
- **THEN** each tooltip uses the 300ms delay, and an adjacent tooltip opens instantly while one is open
