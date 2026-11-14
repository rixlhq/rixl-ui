---
trigger: when preparing to commit code
description: Commit order, git hooks and message rules.
---

# Commits

A commit records claims: the message and the code. Only commit what has been checked.

## Order

1. Finish one logical change.
2. Run the checks for what you touched, from `packages/ui`: `vp check`, `vp test`, and `vp pack` when entries, exports or config changed.
3. Run the `code-simplifier` skill on the changed code, then rerun the checks.
4. Commit. Then move on to the next change.

## Hooks

Lefthook runs them (`lefthook.yml` at the repo root, installed by the root `prepare`, using the version pinned in the root `package.json`). Every command sets `root: packages/ui/`, so it runs there with staged paths relative to it.

- **pre-commit**, in order, stopping at the first failure: `vp check --fix` on staged files (fixes are re-staged); `vp run lint:suppressions`; and `vp test related` on the staged files (unit project).
- **pre-push:** the whole test suite (unit and browser), `vp pack`, `vp run knip`, and React Doctor on changed components.

Every job reads stdin from `/dev/null`, so a hidden prompt can't block it, and the slow ones have a `timeout`, so a stuck run fails the hook instead of hanging it.

Never skip a hook (`--no-verify`, `-n`, `LEFTHOOK=0`, `core.hooksPath`). If a hook fails, fix the cause. For Claude Code this is enforced: `.agents/hooks/no-skip-git-hooks.mjs` blocks those commands.

## Messages

- Conventional commits (`feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`, `build`, `perf`, `style`), with a short scope: the component (`button`, `dialog`), or `tokens`, `config`, `deps`, `ci`. Release Please builds the version and changelog from them.
- A breaking change to an export says so (`feat(button)!:` or a `BREAKING CHANGE:` footer).
- One logical change per commit. Commit only what the current step changed.
- Body says why, not what. State only claims you checked.
- Never edit `CHANGELOG.md` or `.release-please-manifest.json`; Release Please owns them. Never commit `dist/`, `coverage/` or `reports/`.

## `main`

- Never merge or push to `main` while CI is red.
- Everything goes through a pull request unless a human asks for a hotfix.
