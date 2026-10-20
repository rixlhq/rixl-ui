<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

---

# @rixl/ui — Agent Guide

## Project overview

`@rixl/ui` is the Rixl design system: reusable React components, design tokens, and a Tailwind 4 preset shared across `dashboard`, `landing`, and `docs`.

**Design intent:**

- Own the visual language. No shadcn / Radix Themes / fumadocs layered on top of components.
- **Tokens, not colors.** Every visual value lives as a CSS variable in `src/styles/preset.css`.
- **Tailwind 4 preset** ships alongside components; consumers `@import "@rixl/ui/preset.css"` once.
- **Base UI** (`@base-ui-components/react`) provides unstyled a11y primitives for interactive components (Dialog, Popover, Menu, etc.). No visual opinions leak in.
- **Subpath exports.** Consumers import one component and get one component: `import {Button} from "@rixl/ui/button"`.
- **Tree-shakable.** Each component compiles to its own entry (see `vite.config.ts#pack.entry`).

## Use `vp` for everything

Inside `packages/ui/`, the primary interface is `vp <command>`. The scripts in `packages/ui/package.json` and the root workspace `package.json` are convenience aliases only. Use:

- `vp check` — oxlint + tsc, zero warnings.
- `vp fmt` — oxfmt (write); `vp fmt --check` in CI.
- `vp test` — Vitest (watch); `vp test --run` for single pass.
- `vp test --coverage` — coverage report.
- `vp pack` — build (Rolldown + tsdown emits ESM + `.d.ts`).
- `vp dev` — watch build.
- `vp env doctor` — diagnose toolchain issues.

From the repo root (workspace container), the equivalents are `vp run check`, `vp run test:run`, `vp run build`, etc. Root scripts delegate with Vite+'s workspace filter (`vp run -F @rixl/ui <script>`). Don't call `bun`, `npm` or `npx` directly: `vp install` fetches the pinned package manager. PM detection is scoped to the directory `vp` runs in, so the `packageManager` field in `packages/ui/package.json` is load-bearing — CI runs `vp install` from there; removing it makes vp fall back to pnpm.

## Repository layout

Bun workspaces monorepo. The library lives in `packages/ui`; playgrounds and future consumer examples live in `examples/*`. The root is a workspace container only.

```
packages/ui/                    — @rixl/ui library (publish target)
  src/
    components/<name>/
      <name>.tsx                — implementation with forwardRef, cva variants
      index.ts                  — public re-exports
      __tests__/<name>.test.tsx — vitest + Testing Library
    cn                           — drop-in cn utility imported directly
    styles/preset.css           — design tokens (`--rixl-*`) + Tailwind `@theme`
    index.ts                    — barrel (avoid in production; prefer subpath imports)
  vite.config.ts                — vp+ config; declares every entry
  package.json                  — subpath `exports` map is managed by hand (see below)
  release-please-config.json    — release-please config for the @rixl/ui package
  .release-please-manifest.json — current version marker

examples/
  playground/                   — Vite + React + Tailwind consumer of @rixl/ui via `workspace:*`

lefthook.yml                    — root git hooks (pre-commit + pre-push run into packages/ui)
.github/workflows/release.yml   — CI: check, fmt --check, pack, test --coverage, release-please, npm publish (working-directory: packages/ui)
package.json                    — root workspace container; scripts proxy to `packages/ui`
```

## Working directory

Run commands from either place:

- **Repo root** — use the root scripts: `vp run check`, `vp run test:run`, `vp run build`, `vp run playground`.
- **`packages/ui/`** — use `vp` directly: `vp check`, `vp test`, `vp pack`, `vp fmt`.

The CI workflow sets `defaults.run.working-directory: packages/ui`, so every CI step runs from there.

## Component contract

See `.agents/rules/code-style.md` for the full checklist. Every component ships:

1. `forwardRef` + display name.
2. Named `<Name>Props` type.
3. `<name>Variants` `cva` helper (exported).
4. `index.ts` re-exporting component, props, variants.
5. Test file covering: variants, sizes, className merge, ref, keyboard, disabled, props passthrough.
6. Entry in `vite.config.ts#pack.entry` **and** `package.json#exports`.

## Managing `package.json#exports`

`vp+`'s auto-exports generator strips non-JS export entries (like `./preset.css`) on every rebuild. We set `pack.exports = false` in `packages/ui/vite.config.ts` and maintain the `exports` map by hand. When adding a component `foo`:

1. Add `foo: "src/components/foo/index.ts"` to `packages/ui/vite.config.ts#pack.entry`.
2. Add to `packages/ui/package.json#exports`:

   ```json
   "./foo": {
     "types": "./dist/foo.d.ts",
     "development": "./src/components/foo/index.ts",
     "import": "./dist/foo.js"
   }
   ```

The `development` conditional export is what makes the playground consume from source with HMR — Vite passes the `development` condition in `vite dev`. In `vite build` (production) the `import` condition wins and the built bundle imports `dist/`.

## Design tokens

Tokens live in `src/styles/preset.css`. Two layers:

- `@layer rixl-tokens` — the source of truth (CSS variables) for light and `[data-theme="dark"]`.
- `@theme` — registers each token with Tailwind 4 so utilities like `bg-rixl-primary`, `text-rixl-fg`, `rounded-rixl-md`, `shadow-rixl-md` resolve.

Consumers override any token by redeclaring the variable. Never hardcode a color / radius / shadow / motion value in a component; always read a token.

## Testing standards

See `.agents/rules/testing.md`. Vitest + jsdom + Testing Library. Every component test must cover the contract above — a "renders without crashing" test is not acceptable.

## Commit and release flow

- Conventional commits (`.agents/rules/commits.md`). Release-please computes the next version from commit types.
- **Lefthook** owns git hooks (`lefthook.yml` at the root, installed by `prepare` — `vp install` runs it).
  - `pre-commit`: `vp check --fix` on staged `*.{ts,tsx}` and `vp fmt --write` on staged `*.{json,md,yaml,yml,css}` under `packages/ui` (lefthook `root`), fixes re-staged.
  - `pre-push`: `vp test --run` and `vp pack` (check and format already ran on commit).
- CI runs the same on every PR + on push to `main` (from `packages/ui/`), then opens/updates a release PR. Merging that PR triggers `npm publish`.

## Agent skills available in `.agents/skills/`

- `frontend-design` — building distinctive, production-grade UI.
- `code-simplifier` — refining recently changed code.
- `gh-stack` — stacked-branch PR workflow (useful for landing v0.1 as a sequence).
- `openspec-{propose,apply,archive,explore}` — spec-driven change management for new components.

## Rules referenced by agents

- `.agents/rules/anti-slop.md` — code quality.
- `.agents/rules/code-style.md` — TS/React/styling/exports.
- `.agents/rules/commits.md` — conventional commits + hook flow.
- `.agents/rules/tdd.md` — red/green/refactor.
- `.agents/rules/testing.md` — Vitest + Testing Library standards.
