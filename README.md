# @rixl/ui

The Rixl design system. Reusable React components, design tokens, and a
Tailwind 4 preset shared across `dashboard`, `landing`, and `docs`.

## Design principles

- **Own the visual language.** No shadcn, no MUI, no Radix Themes on top
  of our components — the classes and structure are ours. Base UI is
  used only for unstyled a11y/interaction primitives (focus traps,
  positioning, portals, keyboard nav).
- **Tokens, not colors.** Every color, radius, shadow, and motion value
  is a CSS variable in `src/styles/preset.css`. Consumers redeclare a
  variable to reskin the system; components never hardcode design
  values.
- **Tree-shakable subpath exports.** Import one component and get one
  component:

  ```ts
  import {Button} from "@rixl/ui/button";
  ```

- **Tailwind 4 preset, not compiled CSS.** Consumers already run
  Tailwind 4 (dashboard, landing, docs all do). Importing
  `@rixl/ui/preset.css` registers our tokens with `@theme` so
  `bg-rixl-primary`, `rounded-rixl-md`, `text-rixl-fg`, etc. work
  everywhere in the consuming app.

## Usage

```ts
// app.css (or wherever Tailwind is imported)
@import "tailwindcss";
@import "@rixl/ui/preset.css";
```

```tsx
import {Button} from "@rixl/ui/button";

export function Save() {
  return <Button variant="primary">Save</Button>;
}
```

## Repository layout

```
packages/ui/             — @rixl/ui library (publish target)
examples/playground/     — Vite consumer for local visual iteration
lefthook.yml             — repo-wide git hooks
```

Root is a workspace container; the library lives in `packages/ui`.

## Toolchain

Built on **Vite+ (`vp`)**. Inside `packages/ui/`, prefer the `vp` CLI directly:

```bash
cd packages/ui
vp pack                # bundle library (Rolldown + tsdown; ESM + .d.ts)
vp dev                 # watch build
vp test                # Vitest (watch)
vp test --run          # single pass (CI-style)
vp test --coverage     # with coverage report
vp check               # oxlint + tsc, zero warnings
vp fmt                 # oxfmt (write)
vp fmt --check         # verify only
vp env doctor          # diagnose toolchain issues
```

From the repo root, use the workspace scripts:

```bash
bun run build          # → packages/ui $ vp pack
bun run test:run       # → packages/ui $ vp test --run
bun run check
bun run playground     # start the visual playground
```

## Visual playground

To see components render live while you edit source:

```bash
bun install            # once, from repo root — links the workspace
bun run playground     # from repo root
# — or —
cd examples/playground && bun run dev
```

Then open http://localhost:5173. The playground consumes `@rixl/ui`
through the workspace dependency (`"@rixl/ui": "workspace:*"`). Bun
symlinks it into `examples/playground/node_modules/@rixl/`; Vite reads
the package's `exports` map and — because Vite adds the `development`
condition automatically in `vite dev` — resolves each subpath to
`packages/ui/src/**` for HMR. In `vite build` (production) the same
imports fall through to `packages/ui/dist/**`.

Toggle dark mode with the header button — that flips
`document.documentElement.dataset.theme` so all `--rixl-*` tokens
re-evaluate.

Add a new component to the playground by importing it in
`examples/playground/src/App.tsx` and dropping a new `<Section>` for
it. The playground is not part of the published package
(`packages/ui/package.json#files` is an allowlist), so anything you
add here is local-only.

## Adding a component

Each component owns a folder under `packages/ui/src/components/<name>/`:

```
packages/ui/src/components/<name>/
  <name>.tsx          — implementation
  index.ts            — public re-exports
  __tests__/
    <name>.test.tsx   — vitest + Testing Library
```

Then:

1. Add `<name>: "src/components/<name>/index.ts"` to
   `packages/ui/vite.config.ts#pack.entry`.
2. Add a subpath entry to `packages/ui/package.json#exports` with
   `types`, `development`, and `import` conditions (see the existing
   `./button` entry for the shape).
3. Import it in `examples/playground/src/App.tsx` to see it render.

## Tokens

Tokens live in `src/styles/preset.css`. Two layers:

1. `@layer rixl-tokens` — the source of truth (CSS variables).
2. `@theme` — registers each token with Tailwind 4 so utility classes
   like `bg-rixl-primary` resolve at build time.

Consumers override any token by redeclaring the variable:

```css
:root {
  --rixl-primary: oklch(0.6 0.22 320); /* magenta */
}
```

Dark mode opts in with `data-theme="dark"` on any ancestor of the
components — the preset flips every token in one selector.
