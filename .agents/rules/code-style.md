---
trigger: when writing or reviewing code
description: TypeScript, React, and styling standards for @rixl/ui.
---

# Code Style

## TypeScript

- Strict mode enabled. No exceptions.
- Never use `any`. Use `unknown`, generics, or explicit types.
- Use generics only when they improve correctness, not for cleverness.
- Use `@/*` path alias for all `src/*` imports.
- Prefer `type` over `interface` unless extending is needed. `interface` is fine for public component prop types (better error messages in IDEs).
- No type assertions (`as`) unless there is no alternative and it is commented.
- Never re-export types with a barrel that fans them out via `export *` from many files — export explicitly so tree-shaking works.

## Complexity (enforced by Oxlint)

| Rule                    | Limit   |
| ----------------------- | ------- |
| Cyclomatic complexity   | max 10  |
| Lines per function      | max 50  |
| Lines per file          | max 250 |
| Parameters per function | max 3   |
| Nesting depth           | max 3   |
| Statements per function | max 25  |
| Classes per file        | max 1   |

If a component exceeds these limits it is a design smell — split into sub-components or extract a hook.

## Linting and formatting

- Toolchain is **Vite+ (vp)**. Prefer running `vp <command>` directly over `bun run <script>` — the scripts are aliases only.
- `vp check` — oxlint + tsc, zero warnings.
- `vp fmt` — oxfmt (write mode); `vp fmt --check` in CI.
- Auto-fix: `vp check --fix`.

## React components

- One exported component (or one exported hook) per file.
- Co-locate: `src/components/<name>/<name>.tsx`, `index.ts`, `__tests__/<name>.test.tsx`.
- Keep components small and focused. Extract sub-components at ~80 lines.
- Keep props minimal. Do not thread data through components that don't use it.
- Extract non-trivial logic into custom hooks.
- No data fetching inside components — this is a UI library, not an app.
- **Forward refs** on every leaf component (`forwardRef`). Consumers need refs for focus management, portals, tooltips.
- **Spread `...rest` props** so consumers can pass through native HTML attributes, `data-*`, `aria-*`, event handlers.

## Styling

- **Tailwind 4 utility classes only.** No CSS modules, no CSS-in-JS, no inline styles unless a dynamic value forces it.
- Classes must resolve against **`--rixl-*` design tokens** declared in `src/styles/preset.css`. Do not hardcode colors, radii, shadows, or motion durations in a component — read them from tokens.
- Use `cn(...)` from `@/lib/cn` for conditional classes. It layers `clsx` + `tailwind-merge` so consumer classes override component defaults last-write-wins.
- Every component ships variant classes via `cva` (`class-variance-authority`) exported as `<name>Variants`. Consumers can compose those variants onto their own elements without re-implementing.

## Accessibility

- Every interactive component must have keyboard support (Tab, Enter/Space, arrow keys where relevant).
- Focus states must be visible — use `focus-visible:ring-2 focus-visible:ring-rixl-ring`.
- Use Base UI primitives (`@base-ui-components/react`) for anything with real interaction semantics (Dialog, Popover, Menu, Select, Tabs, Tooltip). Base UI handles focus traps, portal-safe positioning, and keyboard nav.
- Native HTML wins over ARIA when the semantics match (`<button>` over `role="button"`).
- All interactive elements must be reachable via keyboard and have an accessible name.

## Component contract

Each component ships with:

1. A `forwardRef` implementation with a display name.
2. A named `<Name>Props` type (exported).
3. A `<name>Variants` `cva` helper (exported).
4. An `index.ts` that re-exports the component, its props type, and its variants.
5. A test file exercising: rendering, all variants, className passthrough, ref forwarding, keyboard interaction, disabled/loading states as applicable.
6. An entry in `vite.config.ts#pack.entry` **and** `package.json#exports` so the subpath resolves.

## Public API discipline

- Consumers import from `@rixl/ui/<component>`. Never rely on internal paths like `@rixl/ui/dist/...`.
- Renames or removals of exported symbols are **breaking changes** and require a major version bump.
- Adding a new variant, size, or optional prop is a minor version bump.
- Bug fixes and internal refactors are patch bumps. Conventional commit messages drive release-please.
