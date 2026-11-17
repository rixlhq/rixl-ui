# Design

## Context

Verified against source: CI already packs the library, builds `apps/docs/dist`, tests it, and runs Release Please/npm publishing in one job. Dashboard uses a static-assets Worker configured through Wrangler. See proposal.md for scope.

## Decisions

### Static assets Worker

- **Chosen:** Docs-local Wrangler config named `ui`, serving `./dist`, with a docs-only Wrangler development dependency and `cf:deploy` script. Leave domain routing managed by the existing Cloudflare project.
- **Alternatives considered:** Pages deployment differs from dashboard's current Workers setup. A Worker script adds no functionality to this static app. SPA fallback is unnecessary because docs navigation uses URL hashes.
- **Dropped:** None.
- **Evidence:** `rixlhq/dashboard/wrangler.jsonc`, `apps/docs/src/hooks/use-hash-route.ts`, and [Cloudflare static assets documentation](https://developers.cloudflare.com/workers/static-assets/).

### Deploy the checked artifact in a separate job

- **Chosen:** Upload docs output on `main` pushes/manual runs after validation. A `deploy-docs` job depends on CI, downloads that artifact, and runs `vpr cf:deploy`. It uses the dashboard's token secret and account variable conventions. Explicit event and branch conditions exclude PRs, including PRs targeting `main`.
- **Alternatives considered:** Rebuilding in the deployment job needlessly duplicates the build. Deploying inside the CI job before npm publishing lets Cloudflare failures block library releases. Splitting the existing release job expands the requested scope.
- **Dropped:** Deploying before Release Please was considered initially; the separate job preserves the library release path if Cloudflare fails.
- **Evidence:** `.github/workflows/ci.yml`, dashboard's workflow, and `package.json` production build scripts.

## Risks / Trade-offs

- Cloudflare credentials must be available in this repository and authorize `ui`; document the setup. A dry run cannot verify account permissions.
- Docs wait for the entire CI job, including any npm publishing, to succeed. A failed npm release blocks docs until CI is retried.
- Existing workflow concurrency cancels superseded runs; keep its behavior.

## Migration Plan

Set the repository Cloudflare secret and account variable, then merge. CI deploys `main` to the existing `ui` Worker. Disable duplicate Cloudflare Git builds if configured. To restore older docs, rerun a known-good main workflow or build that revision and run the documented deploy command.
