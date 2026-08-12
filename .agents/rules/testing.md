---
trigger: when writing tests or reviewing test coverage
description: Testing standards, tools, and quality gates for @rixl/ui.
---

# Testing Standards

## Tools

| Tool                      | Purpose                                           | Command              |
| ------------------------- | ------------------------------------------------- | -------------------- |
| Vitest                    | Unit and component tests (jsdom)                  | `vp test`            |
| @testing-library/react    | React component DOM testing                       | Used within Vitest   |
| @testing-library/jest-dom | DOM matchers (`toBeInTheDocument`, etc.)          | Registered in setup  |
| @vitest/coverage-v8       | Coverage reports                                  | `vp test --coverage` |
| fast-check                | Property-based testing (optional, for pure utils) | Used within Vitest   |

We deliberately do **not** ship Playwright CT here — a design system's UI correctness lives in the visual pass on the consumer app plus jsdom + Testing Library for logic. Adding a real-browser layer belongs in the consumer or in a Storybook-based visual harness (future).

## When to use each

- **Vitest + Testing Library (jsdom)** — every component test, every hook test, every utility test. Cover: rendering, all variants, className merging via `cnfast`, ref forwarding, keyboard interaction, disabled/loading states, controlled vs uncontrolled behavior.
- **fast-check** — pure functions like `cn`, size/variant class builders, token helpers. Add property tests inline in the same `__tests__/<name>.test.ts` file.

## Test location

Co-located next to source under `__tests__/`:

```
src/components/<name>/
  <name>.tsx
  index.ts
  __tests__/<name>.test.tsx
```

## Contract every component test must cover

1. Renders with default props and exposes the correct role.
2. Every variant applies its expected class(es).
3. Every size applies its expected class(es).
4. `className` prop is merged last-write-wins via `cn` — pass a conflicting utility and assert the consumer wins.
5. `ref` forwards to the underlying DOM element.
6. Interactive components respond to keyboard (Enter, Space, Escape, arrows where relevant).
7. `disabled` (and `loading` if applicable) suppresses click handlers.
8. `...rest` props (e.g., `data-testid`, `aria-label`, `onClick`) flow through.

Tests that only check "renders without crashing" are not acceptable.

## Quality gates

- Deterministic. No network. No wall-clock timers unless `vi.useFakeTimers()`.
- Prefer focused unit tests over broad integration tests.
- Every pure exported function ships at least one property-based test with fast-check.
- `vp test --run` must pass with zero skipped tests in the changeset unless a `TODO(test):` comment justifies it.

## Coverage thresholds

Coverage floors are declared in `vite.config.ts#test.coverage.thresholds`. They rise as the library matures — never lower them to unblock a PR. If a merge would drop coverage, add the missing tests first.

## Running

```bash
vp test                  # watch mode
vp test --run            # single-pass (CI)
vp test --coverage       # with coverage report
vp test --ui             # UI inspector
```
