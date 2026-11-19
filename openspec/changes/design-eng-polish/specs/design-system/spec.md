## MODIFIED Requirements

### Requirement: Open popups meet WCAG 2.2 AA

Dialog, alert dialog, dropdown menu, popover, select, sheet and tooltip SHALL have no axe-detectable WCAG 2.2 AA violations while open, with the preset's light tokens applied.

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

### Requirement: Pressable surfaces depress on press without hover translation

Interactive `Button` (except `variant="link"`) and `Card` (`interactive`) SHALL scale down on `:active` via `--rixl-press-scale` (`0.97` default, `0.98` large), SHALL disable that scale under `prefers-reduced-motion: reduce`, and SHALL NOT translate vertically on `:hover`.

#### Scenario: Button hover and press

- **WHEN** a consumer renders a `Button` (non-`link`)
- **THEN** its classes include `active:scale-[var(--rixl-press-scale)]` and `motion-reduce:active:scale-100`, and do not include `hover:-translate-y-` (`button.test.tsx`, `includes tactile press scale and reduced-motion opt-out without hover jump`)

#### Scenario: Interactive Card hover and press

- **WHEN** a consumer renders `<Card interactive>`
- **THEN** its classes include `active:scale-[var(--rixl-press-scale)]`, `motion-reduce:active:scale-100`, and `hover:border-rixl-border-strong`, and do not include `hover:-translate-y-` (`card.test.tsx`, `interactive adds hover emphasis, press scale, focus ring, and reduced-motion opt-out without hover jump`)

### Requirement: Button supports a loading state

`Button` SHALL accept a `loading` prop that disables interaction, marks the button busy for assistive technologies, and renders a leading spinner.

#### Scenario: Loading button

- **WHEN** a consumer renders `<Button loading>`
- **THEN** the button is disabled, carries `aria-busy="true"` and `data-loading="true"`, renders `[data-slot="button-spinner"]`, and does not invoke `onClick` when clicked (`button.test.tsx`, `loading disables the button, sets aria-busy and data-loading, and renders a spinner`)

### Requirement: CopyBlock confirms copy actions visually

`CopyBlock` SHALL copy its `value` on click, transition its icon from `CopyIcon` to `CheckIcon` (`data-copied="true"`), and show `"Copied!"` in its tooltip for 1500ms before resetting.

#### Scenario: Clicking CopyBlock

- **WHEN** a user clicks `CopyBlock` with a `value`
- **THEN** `copyToClipboard` is called with `value`, `[data-slot="copy-block"]` receives `data-copied="true"`, `[data-slot="check-icon"]` scales to `100%` opacity while `[data-slot="copy-icon"]` scales down to `0%` opacity, and both reset after 1500ms (`copy-block.test.tsx`, `morphs CopyIcon into CheckIcon with data-copied for 1.5s after clicking`)

### Requirement: Alert and Badge expose semantic feedback variants

`Alert` and `Badge` SHALL support `variant="success"` and `variant="warning"` in addition to `default` and `destructive`.

#### Scenario: Semantic Alert variants

- **WHEN** `Alert` is rendered with `variant="success"` or `variant="warning"`
- **THEN** it applies `--rixl-success` or `--rixl-warning` border, background tint, and foreground classes (`alert.test.tsx`, `applies the success variant classes` and `applies the warning variant classes`)

#### Scenario: Semantic Badge variants

- **WHEN** `Badge` is rendered with `variant="success"` or `variant="warning"`
- **THEN** it applies `--rixl-success` or `--rixl-warning` border, background tint, and foreground classes (`badge.test.tsx`, `applies the success variant` and `applies the warning variant`)

### Requirement: Overlays and panels animate with interruptible CSS transitions

`Dialog`, `AlertDialog`, `Popover`, `DropdownMenu`, `Select`, `Tooltip`, `Sheet`, and `Collapsible` SHALL animate open and close states via Base UI's `data-starting-style` and `data-ending-style` CSS transitions rather than competing keyframe animations, `TooltipContent` SHALL suppress transition duration when `data-instant` is set, and `SheetContent` SHALL slide using `--rixl-ease-drawer`.

#### Scenario: Popup interruptible transitions

- **WHEN** `DialogContent`, `AlertDialogContent`, `PopoverContent`, `DropdownMenuContent`, `SelectContent`, or `TooltipContent` renders
- **THEN** it carries `transition-[scale,opacity]`, `data-starting-style:scale-95 data-starting-style:opacity-0`, and `data-ending-style:scale-95 data-ending-style:opacity-0` without conflicting `data-open:animate-in` classes (`dialog.test.tsx`, `popover.test.tsx`, `tooltip.test.tsx`)

#### Scenario: Tooltip instant subsequent hover

- **WHEN** `TooltipContent` renders
- **THEN** it includes `data-instant:duration-0` so subsequent tooltips in a warm group open without transition delay (`tooltip.test.tsx`, `skips transition duration when data-instant is present`)

#### Scenario: Sheet drawer physics curve

- **WHEN** `SheetContent` renders
- **THEN** it transitions transform with `ease-(--rixl-ease-drawer)` and contains scroll chaining with `overscroll-contain` (`sheet.test.tsx`, `applies base popup classes and defaults side='right'`)
