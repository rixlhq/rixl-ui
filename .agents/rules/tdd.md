---
trigger: when writing or modifying production code
description: Enforce red/green/refactor TDD cycle for all feature work.
---

# TDD Workflow

## Cycle

1. **Red** — Write a failing test that describes the expected behavior.
2. **Green** — Write the minimum production code to make the test pass.
3. **Refactor** — Clean up while keeping tests green.

## Rules

- No production code without a corresponding failing test first.
- Tests describe behavior ("primary variant applies the primary background token"), not implementation ("class attribute contains bg-rixl-primary" is fine here — that is behavior for a design-system component).
- One assertion per test unless multiple assertions test the same logical behavior.
- Run `vp test` in watch mode during development; `vp test --run` before committing.
- Every new component must land with the full contract in `testing.md`: variants, sizes, className merge, ref forwarding, keyboard, disabled, props passthrough.

## Test file naming

- Unit / component: `__tests__/<name>.test.tsx` (React) or `__tests__/<name>.test.ts` (utilities).
- Property-based tests live inside the same file, using fast-check.

## Commit Cadence

- Commit after each completed red/green/refactor cycle.
- Never commit red (failing) tests on the main branch.
