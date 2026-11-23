# Spec Delta

## ADDED Requirements

### Requirement: Components draw icons from lucide-react

Component icons SHALL come from `lucide-react`, the dependency the library already ships, and not from hand-written `<svg>` elements. Decorative icons SHALL keep `aria-hidden="true"`.

#### Scenario: Checkbox icons

- **WHEN** a checked Checkbox and an indeterminate Checkbox render
- **THEN** each indicator holds an `aria-hidden` svg with `data-slot="checkbox-icon"`

#### Scenario: Button loading spinner

- **WHEN** `<Button loading>` renders
- **THEN** it holds an svg with `data-slot="button-spinner"` that carries `motion-reduce:animate-none`

### Requirement: Repeated class strings live in one shared module

The focus ring, the popup surface with its enter/exit transition, the menu row and the indicator pop SHALL each be defined once in `src/lib/classes.ts` and composed into components with `cn`, so a consumer `className` overrides them.

#### Scenario: Popups share a surface

- **WHEN** an open Popover, DropdownMenu and Select popup render
- **THEN** each carries every class of `popupSurface`, including `motion-reduce:transition-none`

#### Scenario: Rows share the highlight and disabled style

- **WHEN** DropdownMenu item, checkbox item, radio item, sub-trigger and Select item render
- **THEN** each carries every class of `menuItem`

#### Scenario: A consumer class beats a shared one

- **WHEN** a component using `focusRing` receives `className="focus-visible:ring-0"`
- **THEN** the rendered class list has `focus-visible:ring-0` and not `focus-visible:ring-[3px]`
