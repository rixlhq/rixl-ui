# design-system Specification

## Purpose

Defines what every consumer of `@rixl/ui` can rely on: how components are imported, how their classes resolve against a consumer's, and the accessibility floor they meet. Paths are relative to `packages/ui`.

## Requirements

### Requirement: Each component is importable on its own

The package SHALL expose every component at `@rixl/ui/<component>`, built as its own entry, with types.

#### Scenario: Subpath import

- **WHEN** a consumer imports `@rixl/ui/button`
- **THEN** the `exports` map resolves it to `dist/button.js` and `dist/button.d.ts` (`vp run publint` passes)

#### Scenario: Size budget

- **WHEN** the package is built
- **THEN** the built JS and the Tailwind preset stay within `.size-limit.json` (`vp run budget`)

### Requirement: A consumer's classes win

A component SHALL merge a consumer's `className` after its own classes, so a conflicting utility from the consumer replaces the component's.

#### Scenario: Conflicting height

- **WHEN** a `Button` of any size gets `className="h-<n>"`
- **THEN** the rendered element carries `h-<n>` and no other height utility (`button.test.tsx`, `[property] a consumer height replaces the size's height`)

### Requirement: Button resolves its look from `variant`, then `color`

`Button` SHALL use `variant` when it is given, otherwise a known `color`, otherwise the default variant.

#### Scenario: Both given

- **WHEN** a `Button` gets a `variant` and any `color`
- **THEN** it renders exactly as with that `variant` alone (`[property] variant wins over any color`)

#### Scenario: Unknown color

- **WHEN** a `Button` gets a `color` that is not one of its variants, including an inherited object key such as `toString`
- **THEN** it renders as the default variant (`[property] an unknown color falls back to the default variant`)

### Requirement: Open popups meet WCAG 2.2 AA

Dialog, dropdown menu, popover, select and sheet SHALL have no axe-detectable WCAG 2.2 AA violations while open, with the preset's light tokens applied.

#### Scenario: Open in a real browser

- **WHEN** each is opened in Chromium in its browser test
- **THEN** `axeViolations(document.body)` returns no violations (`<name>.browser.test.tsx`, `has no WCAG 2.2 AA violations when open`)

#### Scenario: Danger text contrast

- **WHEN** a destructive menu item renders its text in `--rixl-danger` on the light surface
- **THEN** the contrast is at least 4.5:1 (`dropdown-menu.browser.test.tsx`)

#### Scenario: Select needs a name from the consumer

- **WHEN** a consumer renders `SelectTrigger`
- **THEN** it has `role="combobox"`, which takes no name from its text, so the consumer gives it `aria-label` or a `<Label>` (documented on `SelectTrigger`)
