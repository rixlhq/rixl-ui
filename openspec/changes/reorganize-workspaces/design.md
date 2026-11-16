# Design

## Context

See [proposal.md](proposal.md) for motivation. The root currently owns `packages/*` and `examples/*`, while `packages/ui` declares another workspace pattern and the app contains an independent Bun lockfile. CI and release workflows intentionally target `packages/ui`.

## Goals / Non-Goals

**Goals:** Make the root manifest and lockfile authoritative for the monorepo; make the showcase a first-class app; preserve the UI package's independent npm publication.

**Non-Goals:** Change component APIs, switch the bundler, or alter the current showcase UI.

## Decisions

### Use `apps/docs` for the showcase

- **Chosen:** Move `examples/playground` to `apps/docs`, use the workspace package name `docs`, and describe it as the UI documentation and showcase site.
- **Alternatives considered:** Keep `examples/playground`, which understates its role; use `packages/docs`, which suggests a reusable or publishable package rather than an app.
- **Dropped:** None.
- **Evidence:** The app contains a full showcase for the UI components and is already built as a Vite application.

### Keep one root workspace and lockfile

- **Chosen:** Root workspaces are `packages/*` and `apps/*`. Remove the `packages/ui` nested workspace declaration and `apps/docs/bun.lock`; install and update from the root.
- **Alternatives considered:** Keep a separate lockfile for the app, which duplicates versions and has already drifted; make `packages/ui` the workspace root, which cannot naturally own the sibling app.
- **Dropped:** None.
- **Evidence:** Current root workspace setup and Vite+ monorepo behavior; current app lockfile records versions that differ from the root workspace.

### Keep Vite core as an app dependency under the root override

- **Chosen:** Keep `vite` in the docs app's devDependencies because its config and Vite plugins depend on Vite's API. Let the root override map it to the Vite+ core version. Keep `vite-plus` at the root as the CLI/toolchain installation used for workspace commands.
- **Alternatives considered:** Remove `vite` from the app, which leaves the config's Vite integration without an explicit workspace dependency; add another `vite-plus` installation to the app, which duplicates the root toolchain.
- **Dropped:** None.
- **Evidence:** `apps/docs/vite.config.ts` imports `defineConfig` from `vite` and installs Vite plugins; root scripts use Vite+ commands.

### Centralize shared lint and format configuration

- **Chosen:** Put shared lint and format settings in the root `vite.config.ts`. Keep `packages/ui/vite.config.ts` for pack/test configuration and `apps/docs/vite.config.ts` for Vite plugins and server settings. Use `vite-plus` imports and the Vite+ import lint plugin in configs.
- **Alternatives considered:** Keep lint/format in the UI config, which excludes docs and leaves root checks without shared settings; merge all app, pack, test, and shared settings into one root config, which couples package-specific concerns.
- **Dropped:** None.
- **Evidence:** Vite+ [Monorepo guide](https://viteplus.dev/guide/monorepo) recommends root lint/fmt settings with separate package Vite configs; generated Vite+ application imports `defineConfig` from `vite-plus`.

### Keep one package-manager pin at the workspace root

- **Chosen:** Keep the Bun version pin only in the root manifest and configure every setup-vp workflow to install from the workspace root. Keep `packages/ui`'s Node runtime metadata because npm publish validates it and it describes the published package's runtime requirement.
- **Alternatives considered:** Repeat the Bun pin in every package manifest, which creates drift risk; retain package-local setup in CI, which makes the library appear to own workspace installation.
- **Dropped:** None.
- **Evidence:** Root Bun lockfile and workspaces define the install boundary; the repo's `setup-vp` workflows can install at root while build/test commands continue to target `packages/ui`.

### Run one workspace CI gate from the root

- **Chosen:** Keep shared checks in the root `ci` script, compose the UI-specific tests and package checks through `@rixl/ui`'s `ci:package` script, and build the docs app in the same root gate. CI and release workflows invoke that single root script.
- **Alternatives considered:** Keep the workflow's package-level default directory and run separate root and package checks, which repeats shared checks and requires explicit directory overrides.
- **Dropped:** None.
- **Evidence:** Shared format and lint settings live at the root; package packing and tests remain owned by `packages/ui`; the docs production build belongs to `apps/docs`.

## Risks / Trade-offs

- **Path references may be missed** → Search source, config, workflows, README, and agent guidance for `examples/playground`; verify the build and CI references after moving.
- **Workspace resolution could change after relocation** → Regenerate the root lockfile with `vp install`; verify the app resolves `@rixl/ui` using its workspace dependency.
- **Independent app installation is no longer supported** → Document root-level install and app commands; this matches the single-workspace design.

## Migration Plan

Move the app, update root workspace scripts and references, remove the stale app lockfile and nested workspace field, then regenerate the root lockfile. Verify root install, docs build, and UI package checks. Rollback is a revert of the workspace reorganization commit; no published package migration is required.
