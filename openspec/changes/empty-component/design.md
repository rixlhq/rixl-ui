# Design

## Context

`Empty` (`src/components/empty/empty.tsx`) is a dashed bordered box: icon (default `InfoIcon`), `h3` title, description, `children`, `action`, size `default | compact`. `EmptyState` wraps it with an icon-component prop and a `{label, onClick}` action. Kumo's `Empty` (https://kumo-ui.com/components/empty.md, fetched 2026-11-18; the fetch returned a summary of the page, not the raw markdown) documents: `size` (`sm | base | lg`, default `base`), `icon` (decorative ReactNode), `title` (required), `description`, `commandLine` (a shell command in a copyable code block), `contents` (extra ReactNode such as buttons), `className`.

## API

Before:

```tsx
type EmptyProps = Omit<ComponentProps<"div">, "title"> & {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode; // defaults to <InfoIcon />
  action?: ReactNode;
  size?: "default" | "compact";
};
```

After:

```tsx
type EmptyProps = Omit<ComponentProps<"div">, "title"> & {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode; // nothing rendered when omitted
  commandLine?: string; // copyable command below the description
  action?: ReactNode;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6; // default 3
  size?: "sm" | "default" | "lg";
};
```

## Kumo mapping

| Kumo              | Rixl                 | Note                                                                |
| ----------------- | -------------------- | ------------------------------------------------------------------- |
| `size` sm/base/lg | `size` sm/default/lg | Names follow `Button` (default, sm, lg); `base` does not exist here |
| `icon`            | `icon`               | Optional, no default                                                |
| `title`           | `title`              | Required                                                            |
| `description`     | `description`        | Unchanged                                                           |
| `commandLine`     | `commandLine`        | Renders `CopyBlock`                                                 |
| `contents`        | `action`, `children` | Both already shipped; no rename                                     |
| `className`       | `className`          | Merged with `cn`; consumer class wins                               |
| not documented    | `headingLevel`       | Added for accessibility, not from Kumo                              |

## Decisions

### Sizes: `sm | default | lg`

**Chosen:** rename `compact` to `sm`, add `lg`. `default` stays so existing `<Empty>` without `size` is unchanged.

**Alternatives considered:** Kumo's `base` (rejected: `Button`, `Badge` and the rest use `default`, one scale per system); keep `compact` and add `lg` (rejected: a one-off name next to `sm` everywhere else); accept both `compact` and `sm` (rejected: dead alias).

**Dropped:** None.

**Evidence:** `button.tsx` size variants `default | sm | lg`; Kumo page lists `sm | base | lg`.

### No default icon

**Chosen:** render the icon container only when `icon` is passed.

**Alternatives considered:** keep `InfoIcon` (rejected: Kumo's "Minimal" example is title only; an info glyph is wrong for "no results" or "no media"; the icon is decorative either way).

**Dropped:** None.

**Evidence:** Kumo page, Minimal example and "icon: decorative ReactNode".

### `commandLine` reuses `CopyBlock`

**Chosen:** `commandLine?: string` renders `<CopyBlock title="Command" value={commandLine} />`, so copying, the live status announcement and tooltip come from the existing component.

**Alternatives considered:** a new code block inside `Empty` (rejected: duplicates clipboard handling and states); leave it to `children` (rejected: Kumo documents `commandLine` as a prop, and consumers should not wire the same `CopyBlock` in every empty state).

**Dropped:** None.

**Evidence:** `copy-block.tsx` already provides the copy button, `aria-label` and `<output>` status; Kumo page, "With Command Line".

### `headingLevel`

**Chosen:** `headingLevel` 1 to 6, default 3, so existing markup is unchanged.

**Alternatives considered:** a `<p>` title (rejected: loses the heading for screen-reader navigation); `render`/`as` prop (rejected: arbitrary elements can break semantics, six levels is the real input space).

**Dropped:** None.

**Evidence:** Kumo does not document heading control, so this is an addition requested for accessibility, not parity. A hard-coded `h3` skips levels when an empty state sits directly under a page `h1`.

### Not added

- `contents`: `action` and `children` already exist and are shipped.
- Borderless variant: not in Kumo's documented API; a consumer `className` can already override the border.

## Risks / Trade-offs

- `Empty` now imports `CopyBlock` (and through it `Button` and `Tooltip`). The dist is shared chunks across entries; the total is checked with `vpx size-limit`.
- Removing the default icon changes existing renders; covered under Migration.

## Migration Plan

1. `import {Empty} from "@rixl/ui/empty"` instead of `@rixl/ui/empty-state`.
2. `<EmptyState icon={X} action={{label, onClick}} />` becomes `<Empty icon={<X />} action={<Button onClick={onClick}>{label}</Button>} />`.
3. `size="compact"` becomes `size="sm"`.
4. Add `icon={<InfoIcon />}` where the former default icon should stay.
