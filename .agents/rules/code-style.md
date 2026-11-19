---
trigger: when writing or reviewing code
description: TypeScript, component, token and export rules for @rixl/ui.
---

# Code style

Shared lint rules live in the root `vite.config.ts`; UI-specific complexity caps are in its `packages/ui/**` override. `vp check` uses the root configuration across workspaces. Over a cap is a design smell: split the component or extract a hook.

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
- Compose classes with `cn` from `src/lib/cn.ts` (relative import), a plain re-export of the `cn` package (tailwind-merge rules, last write wins), with `className` last. It does not know the `rixl-*` tokens, so a consumer class does not replace a `rixl-*` radius, shadow, easing, duration or colour utility; that is not supported. A component never composes two of those over one element, and never wins with an important modifier (`rounded-none!`): when it needs a different radius, shadow, duration or easing than a base it builds on, the base takes a variant for it (`Button` `radius`, `inputVariants` `surface`, `Skeleton` `shape`) or the class moves out of the shared base into the parts that need it. Important modifiers stay only where they override third-party styles (Sonner) or inline positioning.
- Variants go through `cva`. Export the helper as `<name>Variants` when consumers need the classes on their own elements.
- Every colour, radius, shadow and duration reads a `--rixl-*` token registered in `src/styles/preset.css`. A new token gets a light and a dark value.

## Public API

- Consumers import `@rixl/ui/<component>`, never `dist/` paths.
- A new component needs an entry in `vite.config.ts#pack.entry` and in `package.json#exports` (both by hand; see `AGENTS.md`). `vp run publint` checks the exports map.
- Removing or renaming an export is breaking; a new variant, size or optional prop is a feature; an internal change is a fix or refactor. Release Please reads the commit type.
