---
trigger: when preparing to commit code
description: Commit workflow and conventional commit standards.
---

# Commit Rules

## Conventional Commits

Every commit message must follow the format:

```
type(scope): description
```

**Types:** `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `style`, `perf`

**Scopes:** `button`, `input`, `dialog`, `tabs`, `tokens`, `preset`, `lib`, `config`, `ci`, `deps` (add a scope per new component; keep them short).

**Examples:**

- `feat(button): add destructive variant`
- `feat(dialog): initial component`
- `fix(button): forward ref to underlying <button>`
- `feat(tokens): add motion tokens for reduced-motion`
- `chore(config): pin typescript@6.0.3`
- `docs(readme): document preset.css usage`

Release-please reads these to compute the next version.

## Workflow

1. Run relevant tests for touched code: `vp test --run`.
2. Run code-simplifier skill on the diff before committing.
3. Commit — vp's staged hook will run lint + format on the touched files.
4. Keep each commit scoped to one logical change.
5. Make step-by-step commits as work progresses.

## Git hooks (lefthook)

`vp install` at the repo root runs `prepare`, which installs lefthook (`lefthook.yml` at the repo root owns git hooks for the whole workspace).

- **pre-commit** — `vp check --fix` on staged `*.{ts,tsx}` and `vp fmt --write` on staged `*.{json,md,yaml,yml,css}`, scoped to `packages/ui`; fixes are re-staged.
- **pre-push** — `vp check`, `vp fmt --check`, `vp test --run`, `vp pack`. This mirrors what CI runs, catching failures before they reach GitHub.

The library is nested in `packages/ui`, so the `pre-commit` commands set lefthook's `root: packages/ui/` (each runs there, with staged paths relative to it, and files outside the package are left alone), and `pre-push` uses `vp run -F @rixl/ui …`. `packages/ui` keeps `vp config --no-hooks` in its own `prepare` so only the root installs hooks.

## Do Not

- Do not commit failing tests to the main branch.
- Do not bundle unrelated changes in a single commit.
- Do not skip pre-commit or pre-push hooks (`--no-verify`).
- Do not commit generated files (`dist/`, `coverage/`).
- Do not manually edit `CHANGELOG.md` or `.release-please-manifest.json` — release-please owns them.
