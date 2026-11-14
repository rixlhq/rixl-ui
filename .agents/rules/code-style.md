---
trigger: when writing or reviewing code
description: TypeScript, component, token and export rules for @rixl/ui.
---

# Code style

Lint and complexity caps live in the `lint` block of `packages/ui/vite.config.ts`. `vp check` enforces them (type-aware, zero warnings); this file doesn't repeat them. Over a cap is a design smell: split the component or extract a hook.

## TypeScript

- Keep strict typing. Don't weaken `tsconfig.json` to make code compile.
- No `any`. A lint suppression states its reason on the same line: `// oxlint-disable-next-line <rule> -- <reason>`.
- `as` only with a comment on the line above saying why the compiler can't know.
- Generics only when they make the types more correct.
- Imports inside `src/` are relative, never an alias: consumers read our source in stack traces and through the `development` export condition, and an alias wouldn't resolve for them.

## Components

- A file holds one component family (`Dialog`, `DialogTrigger`, `DialogContent`…), exported by name. Split a file when it reaches the caps, as `sidebar/` is split.
- Build anything with interaction semantics (dialog, menu, popover, select, tabs, tooltip) on Base UI (`@base-ui/react`), which owns focus, dismissal and keyboard navigation.
- Spread the remaining props onto the root element so consumers can pass `data-*`, `aria-*` and handlers.
- No data fetching. This is a UI library.
- React 18 is a supported peer, and under React 18 a function component only receives `ref` through `forwardRef`. New leaf components that wrap a DOM element use `forwardRef` with a `displayName`.

## Styling

- Tailwind 4 utilities only. Inline `style` only for values computed at runtime.
- Compose classes with `cn` (`import {cn} from "cn"`), so a consumer's `className` wins over the defaults (tailwind-merge, last write wins).
- Variants go through `cva`. Export the helper as `<name>Variants` when consumers need the classes on their own elements.
- Every colour, radius, shadow and duration reads a `--rixl-*` token registered in `src/styles/preset.css`. A new token gets a light and a dark value.

## Public API

- Consumers import `@rixl/ui/<component>`, never `dist/` paths.
- A new component needs an entry in `vite.config.ts#pack.entry` and in `package.json#exports` (both by hand; see `AGENTS.md`). `vp run publint` checks the exports map.
- Removing or renaming an export is breaking; a new variant, size or optional prop is a feature; an internal change is a fix or refactor. Release Please reads the commit type.
