# Spec Delta

## ADDED Requirements

### Requirement: Leaf components forward refs

Every exported component that renders a DOM element, or a Base UI part that accepts a ref, SHALL forward a consumer's `ref` to the element that receives the rest of its props, with React 18 and React 19 alike. Parts that render no element (providers, roots, portals) SHALL NOT be required to.

#### Scenario: A leaf component exposes its element

- **WHEN** a consumer renders `<Checkbox ref={ref} />` with a `createRef()`
- **THEN** `ref.current` is the checkbox root element, whose `data-slot` is `checkbox`

#### Scenario: A part rendered through a Base UI popup exposes the popup

- **WHEN** a consumer renders an open `<PopoverContent ref={ref}>`
- **THEN** `ref.current` is the popup element, whose `data-slot` is `popover-content`

#### Scenario: A polymorphic part exposes the rendered element

- **WHEN** a consumer renders `<SidebarMenuButton ref={ref} render={<a href="/" />} />`
- **THEN** `ref.current` is the rendered anchor

#### Scenario: A wrapped component is named

- **WHEN** a consumer inspects a wrapped component in React DevTools
- **THEN** it shows its exported name, because `displayName` is set
