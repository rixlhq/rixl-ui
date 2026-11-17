# Tasks

## 1. Static deployment

- [x] 1.1 Add docs Wrangler configuration and deploy script. Evidence: root `vpr pack` and `vpr docs` passed; `vpr cf:deploy --dry-run` from apps/docs passed with Wrangler 4.164.0, reading 4 docs assets. Worker name verified against `apps/docs/wrangler.jsonc`: `ui`.
- [x] 1.2 Add artifact handoff and production-only deployment job. Evidence: source review confirms both upload and deploy require `main` plus push/manual events; deploy depends on CI success and has no release-created condition. Actionlint 1.7.12 passes with its unsupported existing `parallel` step diagnostic ignored; the unchanged HEAD workflow produces the same diagnostic. GitHub's current workflow syntax documents `parallel`. Full remote execution remains unverified.
- [x] 1.3 Document build/deploy commands and Cloudflare credentials. Evidence: README commands checked against package scripts and successful local builds/dry run; credential names match the workflow and dashboard source.

## 2. Integration

- [x] 2.1 Run integration checks. Evidence: `vp check` passed formatting, lint and type checks; UI `vp test --run` passed 56 files / 578 tests; `vpx openspec validate deploy-docs-cloudflare --strict` passed. Production docs build emits the existing large-chunk warning. Workflow lint limitation is recorded in 1.2.

## Workflow follow-up

- Verify the first remote deployment after merge with repository Cloudflare credentials.
