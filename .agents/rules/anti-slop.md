---
trigger: when writing or reviewing code
description: What counts as slop in components, tokens, tests and commit messages, and how to avoid it.
---

# Anti-slop rules

Slop is work that looks finished but isn't: it compiles, often passes checks and reads confidently, yet adds nothing or is wrong.

## Code

- No dead code. If nothing calls it, delete it. Knip (`vp run knip` in `packages/ui`) fails on unused files, exports and dependencies; every published entry point is a `src/components/*/index.ts`.
- No commented-out code. Git keeps the history.
- No premature abstraction. Extract at three real call sites, not one.
- No "just in case" code: no handling for cases that can't happen, no fallbacks nobody asked for.
- No lint suppression without a reason after `--` (`// oxlint-disable-next-line rule -- why`). `vp run lint:suppressions` fails on a bare one.
- No TODO or FIXME without a linked ticket (`// TODO(CU-<id>): …`). If it isn't worth a ticket, delete it.
- No magic numbers or strings. Name the constant, or read a token.
- Functions do one thing. If the name needs "and", split it.
- Names say what the thing does. A reader shouldn't need the body to know.
- Comments explain why, never what.
- A change is as big as the problem. No drive-by refactors in a feature or fix.

## Tests

- A test proves behaviour a consumer relies on: a role, a variant's look, a keyboard path, a merged className. Coverage counts lines run, not lines checked; the weekly mutation report (`.github/workflows/mutation.yml`) shows which tests notice wrong code.
- Never lower a coverage threshold or the size budget to make CI pass.

## The package

`@rixl/ui` is published to npm and rendered by dashboard, landing and docs, so a slip ships to all three.

- Renaming or removing an export is a breaking change (`feat!:` or a `BREAKING CHANGE:` footer). Release Please turns it into the next major.
- No new runtime dependency without checking its size: `vp run budget` fails over `.size-limit.json`.
- No hardcoded colour, radius, shadow or duration in a component. Read a `--rixl-*` token from `src/styles/preset.css`.
- No invented primitive behaviour: what Base UI does is Base UI's, so check its source or docs before describing or relying on it.
- No filler in docs or UI copy: "robust", "seamless", "comprehensive", "leverage", "it's worth noting", "in order to".

## Prose (PR descriptions, commit messages, docs)

- Every technical claim points at something real: a file, a command's output, a doc link.
- No invented metrics, timings or percentages.
- Say what changed and why. Don't narrate the steps you took.
