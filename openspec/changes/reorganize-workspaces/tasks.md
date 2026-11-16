# Tasks

## 1. Reorganize workspace layout

- [x] 1.1 Move `examples/playground` to `apps/docs`; `git status --short` reports the app files as renames under `apps/docs`.
- [x] 1.2 Make root workspaces `packages/*` and `apps/*`, remove nested workspace metadata and the stale app lockfile; `vp install` from root completed and linked the workspace.
- [x] 1.3 Update root scripts, Vite+ configuration, CI and contributor docs to use `apps/docs`; `rg` found no active old-path references and root `vp check` passed with 0 warnings across 160 files.

## 2. Verify package boundaries

- [x] 2.1 Build the docs app and the `@rixl/ui` package using `vp run docs:build`; both builds completed successfully.
- [x] 2.2 Run `vp run ci` from `packages/ui`; all 8 CI tasks passed, including 41 test files/376 tests, package build, size budget, and publint.
- [x] 2.3 Run `vp outdated --recursive` from root and inspect `git status`; no outdated packages were reported and the committed workspace tree is clean with only the root lockfile.
