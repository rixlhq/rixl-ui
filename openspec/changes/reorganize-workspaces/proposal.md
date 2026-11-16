# Proposal

## Why

The repository now contains a full component showcase, but its `examples/playground` placement, nested workspace declaration, and separate stale lockfile make it look like a disposable example. A single root-owned workspace will make the library and docs app easier to develop and maintain while keeping the npm publish target explicit.

## What Changes

- Move `examples/playground` to `apps/docs` and identify it as the component documentation and showcase app.
- Make the repository root the only workspace and lockfile owner; remove nested workspace declarations and the app's stale lockfile.
- Align root scripts, Vite+ configuration, CI references, and contributor documentation with the new app location.
- Keep `packages/ui` as the sole npm-published package and retain its public exports and release workflow.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. This is a repository organization and tooling change; published package behavior and APIs do not change.

## Impact

- Workspace manifests and root `bun.lock`.
- `apps/docs` source and Vite configuration (moved from `examples/playground`).
- Root scripts, CI comments/configuration, `AGENTS.md`, and `README.md`.
- No runtime dependencies or npm package exports change.

## Non-goals

- Changing the design or behavior of the UI components or showcase.
- Renaming, splitting, or changing the published `@rixl/ui` package.
- Adding a docs framework or a new deployment provider.

## Acceptance

- `vp install` from the repository root uses one workspace lockfile and links `@rixl/ui` into `apps/docs`.
- Root commands start and build the docs app from `apps/docs`.
- UI CI and release still build and publish only `packages/ui`.
- No tracked references to the former app path remain outside historical OpenSpec artifacts.
- `vp outdated --recursive` and the selected workspace checks complete without errors.

This change is non-breaking for npm consumers: package name, exports, files, and runtime behavior remain unchanged.
