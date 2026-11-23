## Why

Several `@rixl/ui` components exhibited generic AI-generated UI tells ("hover jump" upward translation on buttons and cards, oversized `min-h-11` tab triggers and `size-11` dialog close buttons, full-screen mobile dialog overrides, static copy buttons without feedback, and un-interruptible dual `@keyframes` + CSS transition layers on overlays). Bringing the library up to Apple Human Interface Guidelines and Emil Kowalski's design engineering standards makes interactions feel physical, responsive, and interruptible across desktop and touch devices.

## What Changes

- **Tactile press without hover jump**: Remove `hover:-translate-y-px` / `hover:-translate-y-0.5` from `Button` and `Card` (`interactive`), preserving `active:scale-[var(--rixl-press-scale)]` (`0.97` default, `0.98` large) with `motion-reduce:active:scale-100`, `select-none`, and `touch-manipulation`.
- **Motion tokens & interruptible overlay transitions**:
  - Update `--rixl-ease-out` to `cubic-bezier(0.23, 1, 0.32, 1)`, `--rixl-ease-in-out` to `cubic-bezier(0.77, 0, 0.175, 1)`, and add `--rixl-ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` (`ease-(--rixl-ease-drawer)`) in `preset.css`.
  - Use pure CSS `transition-[scale,opacity]` with Base UI's `data-starting-style` and `data-ending-style` on `Dialog`, `AlertDialog`, `Popover`, `DropdownMenu`, `Select`, and `Tooltip` (dropping redundant `data-open:animate-in` / `data-closed:animate-out` keyframe classes that blocked mid-flight interruption).
  - Add `data-instant:duration-0` on `TooltipContent` so adjacent tooltips open instantly once one is warm, and use `ease-(--rixl-ease-drawer)` on `SheetContent`.
  - Add `CollapsibleContent` height + opacity transitions via `--collapsible-panel-height` and directional `TabsContent` transitions via `data-[activation-direction]`.
- **Component capabilities & polish**:
  - `Button`: Add `loading?: boolean` prop that disables the button, sets `aria-busy` and `data-loading`, and renders an inline `<ButtonSpinner />` (`data-slot="button-spinner"`).
  - `CopyBlock`: Add morphing `CopyIcon` ↔ `CheckIcon` feedback (`scale` + `opacity` + `blur-[2px]` crossfade, `data-copied`, `"Copied!"` tooltip for `1500ms`).
  - `Alert` & `Badge`: Add `success` and `warning` semantic variants wired to `--rixl-success` and `--rixl-warning`.
  - `preset.css`: Darken light-theme `--rixl-danger` to `oklch(0.56 0.22 25)` to pass WCAG 2.2 AA 4.5:1 contrast, and add dark-theme `--rixl-shadow-*` tokens.
- **Proportional sizing & layout resilience**:
  - Restore compact `TabsList` heights (`sm: min-h-7`, `md: min-h-8`), `DialogClose` / `SheetClose` (`size-7`), and `BreadcrumbEllipsis` (`size-7`), and remove forced full-screen `max-sm:h-dvh` on `DialogContent` / `AlertDialogContent`.
  - Add `object-cover` to `AvatarImage`, `overscroll-contain` to scrollable popups (`DialogContent`, `AlertDialogContent`, `SheetContent`, `DropdownMenuContent`, `SelectContent`), and `min-w-0` / `break-words` to card, alert, dialog, and sheet headers/descriptions.
- **Modularization & quality gates**:
  - Split `sidebar` into focused sub-modules (`sidebar-context`, `sidebar-trigger`, `sidebar-layout`, `sidebar-group`, `sidebar-menu`, `sidebar-menu-sub`, `sidebar`) to satisfy Oxlint complexity and line caps.
  - Add Vitest v4/v5 Browser Mode accessibility + layout suites for `AlertDialog`, `Collapsible`, `Tabs`, and `Tooltip`, and eliminate `act(...)` stderr noise.

**Breaking status**: Not breaking for consumers. All public component names, subpath exports (`@rixl/ui/<component>`), and existing prop types remain backwards-compatible; new props (`Button.loading`) and variants (`Alert`/`Badge` `success` and `warning`) are additive.

## Non-goals

- Adding a runtime JavaScript spring animation dependency (such as `motion` / Framer Motion) to `@rixl/ui`; all component animations remain pure CSS transitions and keyframes driven by Base UI state attributes and `--rixl-*` tokens.
- Changing consumer theme-switching strategies (`[data-theme="dark"]` remains opt-in at the root/ancestor level).
- Modifying `Calendar` (react-day-picker) or `Toaster` (Sonner) upstream DOM structures beyond token wiring.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `design-system`: Add requirements for press-only button/card feedback (no hover translation), `Button` loading state (`loading` prop), `CopyBlock` copy confirmation state, `Alert` and `Badge` `success`/`warning` variants, interruptible popup transitions (`data-starting-style` / `data-ending-style`, `Tooltip` `data-instant:duration-0`, `Sheet` `ease-(--rixl-ease-drawer)`), and expanded WCAG 2.2 AA browser verification across overlays and interactive primitives.

## Acceptance

- `Button` and `Card` (`interactive`) do not translate on `:hover` and depress via `active:scale-[var(--rixl-press-scale)]` with `motion-reduce:active:scale-100`.
- `<Button loading>` renders `[data-slot="button-spinner"]`, sets `disabled`, `aria-busy="true"`, and `data-loading="true"`, and suppresses click handlers.
- Clicking `<CopyBlock>` copies the value, sets `data-copied="true"`, transitions `CopyIcon` → `CheckIcon`, and shows `"Copied!"` in the tooltip for `1500ms`.
- `Alert` and `Badge` support `variant="success"` and `variant="warning"`.
- `Dialog`, `AlertDialog`, `Popover`, `DropdownMenu`, `Select`, `Tooltip`, `Sheet`, `Tabs`, and `Collapsible` pass real-Chromium browser tests and `axeViolations(document.body)` with zero WCAG 2.2 AA violations and zero `act(...)` stderr warnings.
- `vp run ci` in `packages/ui` passes all gates (`vp check`, `vp fmt --check`, `vp run lint:suppressions`, `vp run knip`, `vp test --coverage --run`, `vp pack`, `vp run budget`, `vp run publint`).

## Impact

- `packages/ui/src/styles/preset.css`
- `packages/ui/src/components/{alert,alert-dialog,avatar,badge,breadcrumb,button,calendar,card,checkbox,collapsible,copy-block,dialog,dropdown-menu,empty-state,input,input-otp,popover,progress,radio-group,select,sheet,sidebar,switch,table,tabs,textarea,toaster,tooltip}/`
- `packages/ui/test/{a11y.ts,setup.browser.ts}`
- `packages/ui/vite.config.ts`, `packages/ui/.size-limit.json`
- `examples/playground/src/styles.css`
