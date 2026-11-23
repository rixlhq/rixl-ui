# Spec Delta

## ADDED Requirements

### Requirement: Tokens resolve at the element, so any ancestor can set the theme

Utilities that read a `--rixl-*` token (`bg-rixl-*`, `text-rixl-*`, `border-rixl-*`, `ring-rixl-*`, `shadow-*`) SHALL resolve it at the element that uses them, so `data-theme` on any ancestor, and not only on `<html>`, selects the light or dark values.

#### Scenario: Dark scope inside a light page

- **WHEN** a Button and a Card render inside `<div data-theme="dark">` on a light page
- **THEN** their computed background, text and border colours equal the ones they have under `<html data-theme="dark">`

#### Scenario: Light scope inside a dark page

- **WHEN** a Card renders inside `<div data-theme="light">` that sits inside `<div data-theme="dark">`
- **THEN** its computed colours equal the ones it has on a page with no `data-theme`

### Requirement: Success and warning text meets AA contrast

The `success` and `warning` variants of `Badge` and `Alert` SHALL keep their text at a contrast of at least 4.5:1 against their tinted background, in the light and the dark theme.

#### Scenario: axe on feedback variants

- **WHEN** `Badge` and `Alert` with `variant="success"` and `variant="warning"` render in each theme
- **THEN** axe reports no violations
