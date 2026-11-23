# Design

## Context

`preset.css` imports Tailwind 4, whose preflight sets `border-color: currentcolor` on every element. A bare `border` utility therefore paints in the text colour. Components that set a variant border colour (`Button` outline, `Alert` variants, `Input`) are unaffected; the ones listed below name a width but no colour.

Bare borders in scope (`grep -n border` over the six folders): `TableRow` `border-b`, `TableHeader` `[&_tr]:border-b`, `TableFooter` `border-t`, `Badge` base `border` (colour set by every variant except `outline`). `Alert` and its variants already name a colour.

## Decisions

### Border colour: explicit utility, not a base rule

**Chosen:** add `border-rixl-border` next to each bare border.

**Alternatives considered:** `* { border-color: var(--rixl-border) }` in `@layer base` of `preset.css` (rejected: the preset is imported by consumer apps, so it would recolour their own borders, and `AGENTS.md` keeps component styling inside components).

**Dropped:** None.

**Evidence:** Browser tests assert the computed colour; the bug was measured in Chromium before the fix (see tasks.md).

### Alert: no implicit role

**Chosen:** render no `role` unless the consumer passes one.

**Alternatives considered:** `role="status"` by default (rejected: still a live region announced on mount for some screen readers, and wrong for a static banner); a `live` prop (rejected: `role` already is the standard attribute, and a prop would hide it); keep `role="alert"` (rejected: assertive announcement for content that is not urgent).

**Dropped:** None.

**Evidence:** `Alert` is used for static banners in the docs showcase; ARIA's `alert` role is a live region with implicit `aria-live="assertive"` (https://www.w3.org/TR/wai-aria-1.2/#alert).

### Alert title wraps

**Chosen:** drop `line-clamp-1` and add `min-w-0 wrap-anywhere`, as `Empty` does for its title.

**Alternatives considered:** keep the clamp and add a `title` attribute (rejected: truncated text is unreadable on touch and to screen magnifiers).

**Dropped:** None.

**Evidence:** `empty.tsx` uses `min-w-0 … wrap-anywhere`.

### Badge focus ring

**Chosen:** use `outline-none focus-visible:ring-[3px] focus-visible:ring-rixl-ring/50` (`focus-visible:border-rixl-ring` where the variant has a visible border), the same as `button.tsx`.

**Alternatives considered:** keep the 4px ring (rejected: the only component with it).

**Dropped:** The old `outline-1 outline-rixl-ring/50` pair; the ring alone is the indicator, as everywhere else.

**Evidence:** `button.tsx`, `tabs`, `pagination` use `ring-[3px] ring-rixl-ring/50`.

### Selected row

**Chosen:** `aria-selected:bg-rixl-surface-muted` plus the existing `data-[state=selected]`.

**Alternatives considered:** only `aria-selected` (rejected: removes a style existing consumers may rely on, which would be a second breaking change); only `data-[state=selected]` (rejected: Base UI sets neither, and `aria-selected` is the accessible attribute on a `grid` row).

**Dropped:** None.

**Evidence:** Tailwind's `aria-selected:` variant matches `aria-selected="true"`.

### Refs

**Chosen:** `forwardRef` with a `displayName` for every leaf DOM component in scope, per `code-style.md` (React 18 only passes `ref` through `forwardRef`). `Badge` and `BreadcrumbLink` use `useRender`, which accepts a `ref` option; they get a `forwardRef` wrapper that passes it.

**Alternatives considered:** rely on React 19 ref-as-prop (rejected: React 18 is a supported peer).

**Dropped:** None.

**Evidence:** `.agents/rules/code-style.md`, Components.

### `axeViolations` and infinite animations

**Chosen:** wait only for animations whose `effect.getComputedTiming().iterations` is finite.

**Alternatives considered:** cancel all animations in the helper (rejected: changes what axe sees, for example a half-faded colour is replaced by the final one only if the animation ends); a timeout (rejected: wall-clock time makes a flaky test).

**Dropped:** The `document.getAnimations().forEach(cancel)` workaround in `progress.browser.test.tsx`.

**Evidence:** `getComputedTiming().iterations` is `Infinity` for `animation-iteration-count: infinite`.
