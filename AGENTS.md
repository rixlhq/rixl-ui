<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vpr <name>` runs a `package.json` script or a `vite.config.ts` task (`vp run <name>` is the long form). Scripts cannot overwrite built-ins, so `vp dev` and `vpr dev` may do different things. Check `package.json` and `vite.config.ts` first, and use `vpr <name>` when the project defines a script or task with that name. `vpx <command>` executes a local binary (`vp exec <command>` is the long form).

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vpr <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

---

# @rixl/ui — Agent Guide

## Project overview

`@rixl/ui` is the Rixl design system: React components, design tokens and a Tailwind 4 preset, published to npm (MIT) and shared by `dashboard`, `landing` and `docs`. A change here ships to all three on their next upgrade.

- **Tokens, not colours.** Every visual value is a `--rixl-*` CSS variable in `packages/ui/src/styles/preset.css`, with a light and a dark value. Consumers `@import "@rixl/ui/preset.css"` once, after `@import "tailwindcss"`.
- **Base UI** (`@base-ui/react`) provides the unstyled primitives for anything interactive (dialog, menu, popover, select, tabs, tooltip). It is a peer dependency.
- **Subpath exports.** `import {Button} from "@rixl/ui/button"`. Each component is its own build entry (`packages/ui/vite.config.ts#pack.entry`).

## Commands

The root `vite.config.ts` owns shared Vite+ lint and format settings. `packages/ui/vite.config.ts` owns library packing and tests; `apps/docs/vite.config.ts` owns the docs app's plugins and server settings.

Run these in `packages/ui/`:

```bash
vp install                 # Install dependencies (Vite+ fetches the pinned bun)
vp check                   # Oxfmt + Oxlint, type-aware, zero warnings, complexity caps
vp test                    # Unit and browser tests (watch mode)
vp test --project unit     # jsdom tests only
vp test --project browser  # Real Chromium with the preset built; axe accessibility checks
vpr test:coverage          # Tests with coverage; fails under the floor in vite.config.ts
vpr test:mutation          # Stryker (CI only, weekly: .github/workflows/mutation.yml)
vpr lint:suppressions      # Fails on a lint suppression without a reason
vpr knip                   # Unused files, exports and dependencies
vp pack                    # Build dist/ (ESM + .d.ts)
vpr budget                 # Size budget (.size-limit.json), after vp pack
vpr publint                # Checks the package.json exports map
vpr ci                     # Standalone UI package gate
vpr ci:package             # UI-only tasks (tests, pack, budget, publint)
```

The repository root owns the Bun version pin and workspace installation. Run `vp install` from the root; all CI workflows set up Vite+ there. `vp check` runs shared format and lint checks across the workspaces. UI commands delegate to `@rixl/ui`; `vpr docs` starts the showcase app and `vpr docs:build` builds the library and docs app. From the root, `vpr ci` is the workspace gate used by release; CI runs its `ci:check` and `ci:ui` tasks in parallel, then builds docs with `ci:docs`. Use `vp` for everything; don't call `bun`, `npm` or `npx` directly. Install Chromium from `packages/ui/` with `vpx playwright install chromium`.

## Repository layout

```
packages/ui/                   — @rixl/ui, the published package
  src/components/<name>/       — <name>.tsx, index.ts (public re-exports), __tests__/
  src/hooks/, src/lib/         — shared hooks and helpers
  src/styles/preset.css        — tokens and the Tailwind @theme registration
  src/index.ts                 — barrel; consumers should prefer subpath imports
  test/                        — browser test setup, CSS and the axe helper
  vite.config.ts               — build entries, lint caps, test projects, coverage floor
  knip.jsonc, stryker.config.mjs, .size-limit.json
apps/docs/                     — Vite+ app showcasing @rixl/ui (workspace:*)
openspec/                      — specs and changes
.agents/                       — rules, skills, commands and the git-hook guard
lefthook.yml                   — git hooks, run inside packages/ui
release-please-config.json     — Release Please config for packages/ui
```

## Managing `package.json#exports`

Vite+'s auto-exports generator drops non-JS entries such as `./preset.css`, so `pack.exports` is `false` and the map is kept by hand. To add a component `foo`:

1. Add `foo: "src/components/foo/index.ts"` to `pack.entry` in `packages/ui/vite.config.ts`.
2. Add to `packages/ui/package.json#exports`:

   ```json
   "./foo": {
     "types": "./dist/foo.d.ts",
     "development": "./src/components/foo/index.ts",
     "import": "./dist/foo.js"
   }
   ```

The `development` condition lets the docs app consume source with HMR under `vite dev`; production builds resolve `import`, the built `dist/`. `vpr publint` checks the map.

## Rule files

Read these before writing code, tests or a commit:

- `.agents/rules/anti-slop.md`
- `.agents/rules/code-style.md`
- `.agents/rules/tdd.md`
- `.agents/rules/testing.md`
- `.agents/rules/commits.md`

Behaviour changes start as an OpenSpec change (`/opsx:propose`); `openspec/specs/` describes what consumers can rely on today. Before a claim becomes a conclusion, label it measured, verified against source, inferred or assumed; use the `agent-review` skill when being wrong is expensive.

## Agent entry points

`AGENTS.md` and `.agents/` are the guidance surface. `CLAUDE.md` and `.claude` are symlinks to them, so Claude Code loads the same rules, skills and hooks (`.agents/settings.json`). Skills: `agent-review`, `code-simplifier`, `frontend-design`, `gh-stack`, `react-doctor` and `openspec-{propose,apply,archive,explore}`.

## CI and release

- `.github/workflows/ci.yml` runs workspace checks and the UI package build in parallel, then tests with coverage, reports coverage on PRs, checks package budget/exports, and builds docs. On `main`, Release Please and npm publishing run only after those gates succeed. Chromium is installed for the browser project.
- `.github/workflows/react-doctor.yml` comments React Doctor findings on PRs (advisory).
- `.github/workflows/mutation.yml` runs Stryker every Monday and opens a `mutation-report` issue.
