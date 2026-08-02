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

`bun install` at the repo root installs [lefthook](https://github.com/evilmartians/lefthook), which owns git hooks for the whole workspace. Config lives in `lefthook.yml`.

- **pre-commit** — `vp check --fix` + `vp fmt --write` on staged files, scoped to `packages/ui`.
- **pre-push** — `vp check`, `vp fmt --check`, `vp test --run`, `vp pack`. This mirrors what CI runs, catching failures before they reach GitHub.

The `vp+`-native hook mechanism (`.vite-hooks/`) doesn't fit a workspace with the library nested in `packages/ui`, so we disable it via `vp config --no-hooks` in the `prepare` script and use lefthook instead (same choice as mediasdk).

## Do Not

- Do not commit failing tests to the main branch.
- Do not bundle unrelated changes in a single commit.
- Do not skip pre-commit or pre-push hooks (`--no-verify`).
- Do not commit generated files (`dist/`, `coverage/`).
- Do not manually edit `CHANGELOG.md` or `.release-please-manifest.json` — release-please owns them.
