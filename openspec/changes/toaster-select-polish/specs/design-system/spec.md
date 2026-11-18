# Spec Delta

## ADDED Requirements

### Requirement: Toaster follows the rixl theme through tokens

`Toaster` SHALL colour toasts from `--rixl-*` tokens, so toasts change with `[data-theme]` without a React re-render and without a `theme` prop.

#### Scenario: Light and dark default toast

- **WHEN** a default toast is open under a light ancestor and the ancestor then gets `data-theme="dark"`
- **THEN** the toast background equals the resolved `--rixl-surface` in each theme and the two values differ

### Requirement: Toaster feedback types use feedback tokens

`Toaster` SHALL render success, error and warning toasts with colours derived from `--rixl-success`, `--rixl-danger` and `--rixl-warning`, and SHALL enable rich colours unless the consumer passes `richColors={false}`.

#### Scenario: Types differ

- **WHEN** a success, an error and a warning toast are open
- **THEN** their background colours are pairwise different and none equals the default toast background

#### Scenario: Opt out

- **WHEN** a consumer renders `<Toaster richColors={false} />` and opens a success toast
- **THEN** the toast background equals the default toast background

### Requirement: Toaster buttons match Button

The Toaster's action, cancel and close buttons SHALL show a focus ring on keyboard focus, and the action and cancel buttons SHALL use the `Button` `sm` height and `--rixl-radius-md`.

#### Scenario: Action button

- **WHEN** a toast with an action is open
- **THEN** the action button is 32px tall, has the `--rixl-radius-md` corner radius, and takes the `--rixl-primary` background

#### Scenario: Focus ring

- **WHEN** the close button is focused by keyboard
- **THEN** its box-shadow is not `none`

### Requirement: Toaster is accessible

`Toaster` SHALL have no WCAG 2.2 AA violations with a toast of each type open, in light and dark.

#### Scenario: axe

- **WHEN** default, success, error and warning toasts are open, once per theme
- **THEN** axe reports no violations

### Requirement: Select item indicator transitions

`SelectItem` SHALL scale and fade its check indicator in and out with the same transition as the `DropdownMenu` checkbox and radio indicators, and SHALL drop the transition under reduced motion.

#### Scenario: Indicator classes

- **WHEN** a `Select` is open with a selected value
- **THEN** the indicator has `transition-[scale,opacity]`, `data-starting-style:scale-50`, `data-starting-style:opacity-0` and `motion-reduce:transition-none`

### Requirement: Select item cursor

`SelectItem` SHALL use `cursor-default`, as the `DropdownMenu` items do.

#### Scenario: Cursor

- **WHEN** a `Select` is open
- **THEN** an item has `cursor-default` and not `cursor-pointer`

### Requirement: Select parts forward refs

`SelectTrigger`, `SelectContent`, `SelectGroup`, `SelectItem`, `SelectLabel`, `SelectSeparator`, `SelectScrollUpButton` and `SelectScrollDownButton` SHALL forward `ref` to their DOM element and have a `displayName`.

#### Scenario: Ref

- **WHEN** a consumer passes a `ref` to `SelectTrigger` and to an open `SelectItem`
- **THEN** each ref holds the element carrying that part's `data-slot`
