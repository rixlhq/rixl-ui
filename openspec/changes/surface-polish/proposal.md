## Why

Measured in Chromium against the built preset, three surfaces disagree with the rest of the system:

- `preset.css` sets no default border colour, so Tailwind 4 draws a bare `border`, `border-b` or `border-t` in `currentColor`. `TableRow`, `TableFooter` and the `Badge` `outline` variant render near-black (the foreground colour) instead of `--rixl-border`.
- `Alert` always carries `role="alert"`, so a static banner (a deprecation note, an empty-state hint) is announced assertively on mount. Its title has `line-clamp-1`, which truncates a long title with no way to read it.
- `Badge` has its own focus ring (`ring-4 ring-rixl-ring/40` plus an outline) while every other component uses `ring-[3px] ring-rixl-ring/50`. `TableRow` styles selection from `data-[state=selected]`, which nothing in Base UI sets. `Breadcrumb`, `Label`, `Separator` and the table parts do not forward refs under React 18. `BreadcrumbLink` has no focus ring.

Separately, `axeViolations` waits for every running animation to finish, which never happens for an infinite one; the Progress axe test works around it by cancelling animations.

## What Changes

- **Border colour**: every bare border in alert, badge, table and breadcrumb names `border-rixl-border`. No global base rule, because one in `preset.css` would restyle consumers' own markup.
- **Alert** (**BREAKING**): no implicit `role`. Consumers pass `role="alert"` for urgent dynamic messages or `role="status"` for polite ones. `AlertTitle` no longer clamps to one line and wraps instead. `Alert`, `AlertTitle`, `AlertDescription` forward refs.
- **Badge**: the focus ring matches the other components; a `ref` reaches the element under React 18.
- **Table**: a row is styled as selected when `aria-selected="true"` (and still for `data-state="selected"`). Every table part forwards a ref.
- **Breadcrumb, Label, Separator**: forward refs with a `displayName`; `BreadcrumbLink` gets the standard focus ring.
- **Test helper**: `axeViolations` ignores animations with infinite iterations; the Progress test drops its workaround.

**Breaking status**: Breaking, for `Alert` only.

Migration: a consumer who relied on the implicit role writes `<Alert role="alert">` (assertive, for errors that appear after user action) or `<Alert role="status">` (polite). A banner present at page load needs no role.

## Capabilities

### Modified Capabilities

- `design-system`: border colours, alert semantics, badge focus ring, table selection, ref forwarding, breadcrumb focus ring, the axe helper.

## Non-goals

- No global default border colour in `preset.css`.
- No new Alert props (no `live` or `urgency` prop): the standard `role` attribute already says it.
- No change to components outside alert, badge, table, breadcrumb, label and separator.
- No change to `.size-limit.json`.

## Acceptance

- In Chromium, the computed border colour of a `TableRow`, a `TableFooter` and an outline `Badge` equals the `--rixl-border` colour.
- `<Alert>` has no `role` attribute; `<Alert role="alert">` has one.
- A long `AlertTitle` is not clamped.
- The focused `Badge` link and `BreadcrumbLink` show the same box-shadow ring as a focused `Button`.
- A `TableRow` with `aria-selected="true"` has the selected background.
- A `ref` on each part resolves to its DOM element.
- `vp check`, `vp test run`, `vp pack`, `vpx size-limit` and `vpr docs` pass.
