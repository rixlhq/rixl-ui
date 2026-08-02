---
trigger: when writing or reviewing code
description: Eliminate wasteful, speculative, and low-quality code patterns.
---

# Anti-Slop Rules

## Zero Tolerance

- No dead code. If it is not called, delete it.
- No premature abstraction. Extract only at 3+ call sites.
- No "just in case" code. Only write what is needed now.
- No TODOs or FIXMEs without a linked issue or task.
- No magic numbers or strings. Use named constants.
- No feature flags or backwards-compatibility shims unless explicitly required.

## Function Quality

- Functions do one thing.
- Functions have descriptive names that reveal intent.
- Max 3 parameters (enforced by Oxlint). Use an options object if more are needed.
- Max 50 lines per function (enforced by Oxlint).
- Max cyclomatic complexity of 10 (enforced by Oxlint).
- Max nesting depth of 3 (enforced by Oxlint).

## Comments

- Only comment the "why", never the "what".
- Code should be self-documenting through naming and structure.
- Remove commented-out code. Git has history.

## Imports

- Use `@/*` path aliases for `src/*` imports.
- No circular imports.
- No unused imports (enforced by TypeScript strict mode).

## React Specifics

- One exported component per file.
- Components under 80 lines. Extract sub-components or hooks if larger.
- Keep props minimal. Do not pass data a component does not use.
- No data fetching or heavy transformation inside presentational components.
- Use composition over large monolithic components.
