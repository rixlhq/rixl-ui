## Why

`Input` and `InputArea` share one `controlSurface` (border, hover, focus ring, invalid state). Four other places re-implement a drifted copy of the same look instead of reusing it:

- `select/trigger.tsx` has its own border, hover, focus, invalid and disabled classes, and two heights (`h-9`, `h-8`) that do not follow Input's scale.
- `input-otp/slot.tsx` hand-writes border, ring and invalid classes per slot.
- `pagination/pagination-page-input.tsx` renders a raw, unstyled `<input>`.
- `pagination/pagination-page-size.tsx` renders a native `<select>` styled by hand. Its stated reason, "so the primitive ships no overlay dependency", no longer holds inside one package.

Owner rule: components reuse each other; they do not duplicate. Pre-1.0, so the old shapes are replaced, not kept.

## What Changes

- `input/input-variants.ts` exports the shared surface (`controlSurface`) and the shared size scale (`controlSizes`). Input's and InputArea's classes are unchanged. The `read-only:` look moves out of the shared surface into a text-only part, because `:read-only` matches every non-editable element, buttons included.
- **BREAKING** `SelectTrigger`/`selectTriggerVariants` take `size?: "xs" | "sm" | "base" | "lg"`, default `"base"`, with Input's heights (`h-7`/`h-8`/`h-9`/`h-10`). `"default"` is removed; `"sm"` keeps `h-8`.
- **BREAKING** The trigger is `w-full` like Input (it was `w-fit`); set a width with `className`.
- `Select` takes Kumo's built-in field props: `label`, `labelTooltip`, `description`, `error` (shared with `Input` through `InputField`), plus `required={false}` for the "(optional)" marker.
- `InputOTPSlot` composes `controlSurface`, so border, hover and invalid look match Input; it keeps the joined bar (shared inner edges, outer radius) and its active-slot ring.
- `PaginationPageInput` renders `Input`; its commit-on-Enter/blur, Escape reset and ref behaviour stay.
- **BREAKING** `PaginationPageSize` renders `Select`, not a native `<select>`. Its props change from `select` attributes to trigger (`button`) attributes; `value`, `onPageSizeChange`, `options`, `label` stay. On touch devices the page-size picker is now our popup, not the OS picker.

**Breaking status**: breaking; ships through a `feat(select)!:` commit, with the migration notes in design.md.

## Capabilities

### Modified Capabilities

- `design-system`: one control surface for bordered form controls; Select size scale and built-in field; pagination reuses Input and Select.

## Non-goals

- Kumo's Select `loading`, `hideLabel` and root-level `placeholder`/`size` (see design.md, decisions 3 and 4).
- Moving the `Select` root's `size` into context; `size` stays on the trigger.
- Touching `select/content.tsx`, `select/item.tsx`, `select/icons.tsx` (icon and shared-class work) or `date-picker/**`.
- Removing Pagination's legacy `currentPage` alias (a separate breaking change; listed in design.md).

## Acceptance

- `Input`, `InputArea`, the select trigger and OTP slots carry the same border, hover, focus and invalid classes from one definition.
- `<SelectTrigger size="xs|sm|base|lg">` has `h-7|h-8|h-9|h-10`, matching `inputVariants`.
- `<Select label description error>` renders a labelled field and marks the trigger invalid like `Input`.
- `Pagination`'s page-size control is a `combobox` from `@rixl/ui/select` with a visible label, and its page input is an `Input`.
- `vp check`, `vp test run`, `vp pack`, `vpx size-limit` and `vpr docs` pass.
