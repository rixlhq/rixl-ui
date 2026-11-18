## Why

Two token bugs affect every consumer.

- **Nested theme scoping.** `preset.css` registers `--color-rixl-*`, `--shadow-rixl-*` and the other scales in a plain `@theme`. Tailwind emits those as `:root` declarations whose value is `var(--rixl-surface)` resolved once at `:root`, and utilities such as `bg-rixl-surface` read `var(--color-rixl-surface)`. Putting `data-theme="dark"` on `<html>` works, because `:root` resolves the dark values. On any other ancestor the utilities keep the light values, although the preset comment says "html (or any ancestor)". A dark panel inside a light page (or the reverse) renders light.
- **Status contrast.** `Badge` and `Alert` `success` and `warning` draw `text-rixl-success` / `text-rixl-warning` on a tint of the same colour. axe reports `color-contrast` for `Badge` (`openspec/changes/surface-polish/tasks.md`, 6.2), so its axe test leaves both variants out. `--rixl-success` and `--rixl-warning` also have no dark value.

## What Changes

- **Theme scope**: the colour, radius, shadow, duration and ease registrations that point at `--rixl-*` variables resolve at the element that uses them, so `[data-theme]` on any ancestor re-themes the utilities, a nested `light` inside `dark` included.
- **Status colours**: success and warning get a text colour that meets 4.5:1 on their tint in both themes, and a dark value for each.
- **Tests**: browser tests compare computed colours of a nested scope with `<html>`, and axe runs on Badge and Alert `success` / `warning` in both themes. The Badge exclusion is removed.

**Breaking status**: Not breaking. No export, prop or variant changes. Colours of `success` and `warning` change slightly.

## Capabilities

### Modified Capabilities

- `design-system`: token scoping and status-colour contrast.

## Impact

`packages/ui/src/styles/preset.css`, `packages/ui/src/lib/cn-tables.ts` (regenerated), browser tests in `src/styles/__tests__/`, `badge/__tests__/` and `alert/__tests__/`. The preset stays within the 3.5 kB budget in `.size-limit.json`.
