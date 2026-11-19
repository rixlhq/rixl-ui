# design-system Specification

## Purpose

Defines what every consumer of `@rixl/ui` can rely on: how components are imported, how their classes resolve against a consumer's, and the accessibility floor they meet. Paths are relative to `packages/ui`.

## Requirements

### Requirement: Each component is importable on its own

The package SHALL expose every component at `@rixl/ui/<component>`, built as its own entry, with types.

#### Scenario: Subpath import

- **WHEN** a consumer imports `@rixl/ui/button`
- **THEN** the `exports` map resolves it to `dist/button.js` and `dist/button.d.ts` (`vpr publint` passes)

#### Scenario: Size budget

- **WHEN** the package is built
- **THEN** the built JS and the Tailwind preset stay within `.size-limit.json` (`vpr budget`)

### Requirement: A consumer's classes win

A component SHALL merge a consumer's `className` after its own classes, so a conflicting standard Tailwind utility from the consumer replaces the component's. The merge is `cn` from `src/lib/cn.ts`, which re-exports the `cn` package unchanged: no generated tables, no configuration.

#### Scenario: Conflicting height

- **WHEN** a `Button` of any size gets `className="h-<n>"`
- **THEN** the rendered element carries `h-<n>` and no other height utility (`button.test.tsx`, `[property] a consumer height replaces the size's height`)

#### Scenario: Token utilities are replaced

- **WHEN** a consumer passes a standard radius, shadow or easing class (`rounded-full`, `shadow-none`, `ease-linear`) to a component whose default is the same kind of utility (`rounded-md`, `shadow-xs`, `ease-out`)
- **THEN** the rendered element carries the consumer's class and not the component's, because radii, shadows and easing are registered on Tailwind's standard theme keys and `cn` merges them
- **AND** the browser resolves the consumer's radius or shadow (`composed-overrides.browser.test.tsx`)

### Requirement: Button resolves its look from `variant` alone

`Button` SHALL take its look from `variant`, defaulting to `primary`. The `color` alias is removed, and a native `color` attribute SHALL NOT change the classes.

#### Scenario: A color attribute is ignored

- **WHEN** a `Button` gets any `variant` and any `color` string
- **THEN** it renders exactly as with that `variant` alone (`[property] a native color attribute never changes the classes`)

### Requirement: Feedback tints share one recipe and meet AA

Alert, Badge and Toaster SHALL tint success, warning and danger with a 10% fill and a 30% border of the feedback token (`feedbackTint` in `src/lib/classes.ts`; Toaster mixes the same shares), and their text SHALL keep at least 4.5:1 on that fill in the light and dark themes.

#### Scenario: Text on the tint

- **WHEN** an Alert title and description, a Badge (also hovered as a link) and a Toaster title and description render each feedback colour
- **THEN** each text colour is at least 4.5:1 on its fill (`feedback-tint.browser.test.tsx`, `keeps … at 4.5:1`)

#### Scenario: One fill

- **WHEN** Alert, Badge and Toaster render the same feedback colour on the same surface
- **THEN** the painted fills differ by at most one unit per channel (`feedback-tint.browser.test.tsx`, `draws the same fill`)

### Requirement: Open popups meet WCAG 2.2 AA

Dialog, dropdown menu, popover, select and sheet SHALL have no axe-detectable WCAG 2.2 AA violations while open, with the preset's light tokens applied.

#### Scenario: Open in a real browser

- **WHEN** each is opened in Chromium in its browser test
- **THEN** `axeViolations(document.body)` returns no violations (`<name>.browser.test.tsx`, `has no WCAG 2.2 AA violations when open`)

#### Scenario: Danger text contrast

- **WHEN** a danger menu item renders its text in `--rixl-danger` on the light surface
- **THEN** the contrast is at least 4.5:1 (`dropdown-menu.browser.test.tsx`)

#### Scenario: Select needs a name from the consumer

- **WHEN** a consumer renders `SelectTrigger`
- **THEN** it has `role="combobox"`, which takes no name from its text, so the consumer gives it `aria-label` or a `<Label>` (documented on `SelectTrigger`)
