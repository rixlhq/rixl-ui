# Spec Delta

## ADDED Requirements

### Requirement: Components mirror under `dir="rtl"`

Layout that follows the reading direction SHALL use logical utilities (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `border-s`, `border-e`, `rounded-s`, `rounded-e`, `text-start`, `text-end`), and a directional icon SHALL carry `rtlFlip` from `src/lib/classes.ts`. Layout tied to a physical edge (centring, `env(safe-area-inset-*)`, a measured `left` offset) MAY stay physical.

#### Scenario: Sidebar start panel

- **WHEN** a mobile `Sidebar side="left"` opens inside `dir="rtl"`
- **THEN** the panel's right edge touches the viewport's right edge (`sidebar-rtl.browser.test.tsx`)

#### Scenario: Pagination chevrons

- **WHEN** `Pagination` renders inside `dir="rtl"`
- **THEN** the previous and next icons are mirrored, so next points left (`pagination-rtl.browser.test.tsx`)

#### Scenario: Breadcrumb separator

- **WHEN** the default separator renders inside `dir="rtl"`
- **THEN** it is mirrored (`breadcrumb-rtl.browser.test.tsx`)

#### Scenario: Tabs indicator

- **WHEN** `Tabs` renders inside `dir="rtl"` with the second tab active
- **THEN** the indicator overlaps the active tab horizontally (`tabs-rtl.browser.test.tsx`)

#### Scenario: Dialog close button

- **WHEN** `DialogContent` renders inside `dir="rtl"`
- **THEN** the close button sits at the left edge of the content (`dialog-rtl.browser.test.tsx`)

#### Scenario: Flip class [property]

- **WHEN** a directional icon applies `rtlFlip`
- **THEN** its class list contains `rtl:-scale-x-100` after `cn` merging with any consumer class (`classes.test.ts`)

### Requirement: `@rixl/ui/direction-provider` re-exports Base UI's `DirectionProvider`

Base UI components read direction from `DirectionProvider`, not from the DOM `dir`. The subpath SHALL export `DirectionProvider` so a consumer can render it beside `dir="rtl"`.

#### Scenario: Keyboard navigation follows direction

- **WHEN** `Tabs` renders inside `DirectionProvider direction="rtl"` and the first tab is focused
- **THEN** `ArrowLeft` moves focus to the second tab (`tabs-rtl.browser.test.tsx`)
