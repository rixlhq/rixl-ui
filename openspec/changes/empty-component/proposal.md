## Why

`@rixl/ui` ships two components for the same job: `Empty` (canonical) and `EmptyState` (a deprecated adapter over it). `EmptyState` has all the tests, `Empty` has none of its own, and the docs showcase documents the deprecated one. `Empty` also lacks parts that Kumo's `Empty` documents (a size scale, an optional icon, a copyable command) and always renders an info icon and an `h3`, which is wrong for a "no results" state and can break a page's heading outline.

## What Changes

- **Rename**: `Empty` becomes the only component. `@rixl/ui/empty-state`, the `EmptyState` export and `EmptyStateProps` are removed; the tests, docs showcase (id, route, title) move to `empty`.
- **Kumo parity** (https://kumo-ui.com/components/empty.md): sizes `sm | default | lg` (was `default | compact`); `icon` is optional with no default icon; new `commandLine` prop that renders a copyable command.
- **Heading level**: new `headingLevel` prop (1 to 6, default 3) so the title does not break the host page's outline.
- **Tests**: `Empty` gets unit tests per behaviour and a browser test with an axe check for the copyable command.

**Breaking status**: Breaking.

- `@rixl/ui/empty-state` and `EmptyState` are removed.
- `size="compact"` is renamed `size="sm"`.
- `Empty` no longer renders a default icon; consumers who relied on it pass `icon={<InfoIcon />}`.

Migration: `<EmptyState icon={X} action={{label, onClick}}>` becomes `<Empty icon={<X />} action={<Button onClick={onClick}>{label}</Button>}>`.

## Capabilities

### Modified Capabilities

- `design-system`: Empty requirements (title, optional icon, sizes, command, heading level, removal of EmptyState).

## Non-goals

- No `borderless` variant, `contents` prop or `base` size: Kumo does not document a borderless option, and `action` and `children` already cover `contents` (see design.md).
- No change to `CopyBlock`; `Empty` reuses it.
- No changes to other components or other OpenSpec changes.

## Acceptance

- `@rixl/ui/empty-state` no longer exists in `package.json#exports`, `vite.config.ts#pack.entry`, `src/index.ts` or the docs.
- `Empty` unit tests cover title, description, icon (absent and supplied), each size, action, `commandLine`, `headingLevel`, `className` winning over defaults, ref forwarding and props passthrough.
- `vp check`, `vp test run`, `vp pack`, `vpx size-limit` and the docs build pass.
