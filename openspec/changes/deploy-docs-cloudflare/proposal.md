# Proposal

## Why

CI builds the documentation but never publishes it. The docs need a static deployment to the existing Cloudflare project `ui`, following the dashboard's Wrangler setup.

## What Changes

- Configure a static-assets Worker named `ui` for the docs production build.
- Deploy checked docs from `main` in a separate job after CI succeeds, without requiring a new npm release.
- Document Cloudflare credentials and local build/deploy commands.

## Capabilities

### New Capabilities

- `docs-deployment`: publish validated documentation to Cloudflare independently of npm releases.

### Modified Capabilities

None.

## Impact

Changes the CI workflow and docs tooling, adding Wrangler as a docs development dependency. No library exports or defaults change; this is non-breaking for library consumers.

## Non-goals

Changing npm publishing, dashboard-style gradual traffic rollout, PR previews, or custom-domain management.

## Acceptance

- The production build and Wrangler dry run succeed with `apps/docs/dist` targeting `ui`.
- CI deploys only on `main` pushes or manual runs on `main`, after checks and tests pass, without requiring a package release.
- PRs and manual runs on other branches cannot deploy production.
- The existing Release Please and npm publishing steps retain their settings and conditions.
