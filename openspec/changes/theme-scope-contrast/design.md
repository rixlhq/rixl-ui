# Design

## Context

Measured in Chromium (Vitest browser project, Tailwind 4 build of `preset.css`).

**Nested scope.** A Button and a selected Card inside `<div data-theme="dark">` on a light page, against the same two under `<html data-theme="dark">`:

| Property           | Nested before           | Under `<html>` dark (and nested after) |
| ------------------ | ----------------------- | -------------------------------------- |
| Button background  | `oklch(0.21 0 0)`       | `oklch(0.985 0 0)`                     |
| Button text        | `oklch(0.985 0 0)`      | `oklch(0.21 0 0)`                      |
| Card background    | `oklch(1 0 0)`          | `oklch(0.18 0.01 265)`                 |
| Card text          | `oklch(0.2 0.01 265)`   | `oklch(0.96 0.003 264)`                |
| Card border (ring) | `oklch(0.21 0 0 / 0.4)` | `oklch(0.83 0 0 / 0.5)`                |

Cause: in a plain `@theme`, Tailwind emits `--color-rixl-surface: var(--rixl-surface)` on `:root`, and `bg-rixl-surface` reads `var(--color-rixl-surface)`. A custom property that holds a `var()` is substituted where it is declared, so every element inherits the `:root` result. `[data-theme="dark"]` below `:root` redeclares `--rixl-surface`, but the copy never sees it.

**Contrast.** axe `color-contrast` ratios before the change:

| Theme | Badge success | Badge warning | Alert success | Alert warning |
| ----- | ------------- | ------------- | ------------- | ------------- |
| light | 2.53          | 1.79          | 2.8           | 1.91          |
| dark  | 5.55          | 7.83          | 6.3           | 9.28          |

Only light fails. The only fill use of `--rixl-success` / `--rixl-warning` in `src/` is a 5% to 30% tint of itself next to text in that colour (`badge.tsx`, `alert.tsx`), plus `copy-indicator.tsx` and Toaster (which mixes the token with `--rixl-fg`).

## Decisions

| Decision                                                                                                                 | Why                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registrations that point at `--rixl-*` move to `@theme inline`; the sidebar duration and the animations stay in `@theme` | `inline` makes a utility emit `var(--rixl-surface)` instead of `var(--color-rixl-surface)`, so it resolves on the element. Keyframes and the literal sidebar duration do not read a token and gain nothing. Tailwind documents `@theme inline` for theme variables that reference other variables. |
| `[data-theme="light"]` joins `:root` in declaring the light values                                                       | The preset had no light selector, so a light scope inside a dark page had nothing to restore the light values with.                                                                                                                                                                                |
| Darken the light `--rixl-success` / `--rixl-warning` instead of adding `-text` tokens                                    | Every use is text next to a tint, and consumers use `text-rixl-success` for text too, so a separate text token would leave their existing classes failing. No fill uses the bright value. It costs no preset bytes (3.47 kB against a 3.5 kB limit).                                               |
| Dark values equal the previous single values                                                                             | They already pass on dark (5.55 to 9.28), and the dark theme needs the lighter colour. The tokens now have a light and a dark value, as the token rules require.                                                                                                                                   |
| Light values `oklch(0.48 0.12 145)` and `oklch(0.5 0.11 80)`                                                             | The lowest lightness that keeps 4.5:1 on the 15% badge tint with a margin and keeps the hue: a green and a dark amber.                                                                                                                                                                             |

## After

Light: Badge success 4.84, warning 4.75; Alert success 5.59, warning 5.48. Dark unchanged. Nested and `<html>` scopes paint identically.
