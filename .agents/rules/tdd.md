---
trigger: when writing or modifying production code
description: The red, green, refactor cycle and what each change ships with.
---

# TDD

## Cycle

1. **Red** — Write a failing test that describes the expected behaviour.
2. **Green** — Write the least code that makes it pass.
3. **Refactor** — Clean up with the tests green.

## Rules

- No production code without a failing test first. A bug fix starts with a spec scenario, then a test that reproduces the bug.
- Tests describe behaviour ("the destructive variant applies the danger background"), not implementation. For a design system, the class a variant applies is behaviour.
- One assertion per test unless the assertions check the same behaviour.
- Run `vp test` after every green and refactor step.
- After the unit cycle, add `[property]` tests with fast-check where the input space is wide.
- A new or changed popup, overlay or focus behaviour gets a browser test with an axe check once its unit tests pass.
- Mutation testing runs weekly in CI (`.github/workflows/mutation.yml`), not per change. When the `mutation-report` issue lists surviving mutants in code you own, kill them with assertions, or delete the code they show nobody needs.

## Commits

- Commit after each completed cycle (`.agents/rules/commits.md`).
- Never commit a failing test to `main`.
