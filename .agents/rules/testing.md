---
trigger: when writing tests or reviewing test coverage
description: Testing tools, where tests live and what each kind proves for the design system.
---

# Testing

Test projects are in the `test` block of `packages/ui/vite.config.ts`. Run commands from `packages/ui`.

## Tools

| Tool                | Purpose                                                    | Command                                      |
| ------------------- | ---------------------------------------------------------- | -------------------------------------------- |
| Vitest (`unit`)     | Components, hooks and `src/lib`, in jsdom                  | `vp test --project unit`                     |
| Testing Library     | What a user sees and can do, queried by role and text      | inside the tests                             |
| fast-check          | Property tests for logic with wide inputs                  | inside the unit tests, titled `[property] …` |
| Vitest Browser Mode | Popups and focus in real Chromium, with the preset built   | `vp test --project browser`                  |
| axe-core            | WCAG 2.2 AA checks on what those tests render              | `axeViolations()` from `test/a11y.ts`        |
| Stryker             | Mutation testing: proves the unit tests notice wrong code  | `vp run test:mutation`                       |
| size-limit          | The built JS and the preset stay within `.size-limit.json` | `vp run budget` after `vp pack`              |

Tests import Vitest APIs from `vitest`.

## When to use each

- **Unit** — Every component and hook: role, each variant and size, `className` merging (a conflicting consumer class wins), ref forwarding, keyboard, disabled, and props passthrough. "Renders without crashing" is not a test.
- **fast-check** — Logic whose input space is wide: class resolution across variants (see `button.test.tsx`), parsing, token helpers. Assert an invariant across generated inputs.
- **Browser and axe** — Anything jsdom can't do faithfully: portals, focus traps, positioning, dismissal. Each browser test file asserts `expect(await axeViolations(document.body)).toEqual([])` with its component open. axe finds about a third of accessibility issues; it can't judge whether a label is meaningful.
- **Stryker** — Mutates `src/` and reruns the unit tests. Too slow for pull requests, so `.github/workflows/mutation.yml` runs it report-only every Monday and opens a `mutation-report` issue.

## Test location

- Co-located in `__tests__/` next to the source.
- Unit: `__tests__/<name>.test.ts` or `.test.tsx`
- Browser: `__tests__/<name>.browser.test.tsx`
- Shared browser helpers, setup and CSS: `packages/ui/test/`

## Coverage

CI runs `vp test --coverage` across both projects and fails below the floor in `coverage.thresholds`. Raise it when tests land; never lower it to make a change pass.

## Quality gates

- Deterministic: no network, no real clock (`vi.useFakeTimers()`), no shared state between tests.
- Before trusting a new test, break the code it covers and watch it fail, then restore the code.
- A test that only restates the implementation is slop.
