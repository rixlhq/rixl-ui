## Why

An audit of `@rixl/ui` against Emil Kowalski's design-engineering guidance found components that pass every test yet behave wrongly in a browser, plus motion that breaks the token rule or feels slower than it should. Each broken item was measured in Chromium or verified against Base UI 1.9.0 source.

## What Changes

- **className merging**: `cn` from the `cn` package does not know the `rixl-*` radius, shadow, duration and easing tokens, so `rounded-rixl-md rounded-full` keeps both and the token utility wins by CSS order. Add a configured `cn` in `src/lib/cn.ts` and use it in every component.
- **Switch**: the checked thumb overflows the track under `dir="rtl"`; mirror the translation.
- **Progress**: `value={null}` renders a full static bar; render an animated indeterminate band instead.
- **Tooltip**: every `Tooltip` wraps its own `TooltipProvider` with `delay={0}`, which shadows any app-level provider and prevents grouping. `Tooltip` stops wrapping a provider; `TooltipProvider` defaults to a hover-intent delay.
- **CollapsibleDefaultTrigger**: its `transition-colors` replaces Button's press transition; keep the press transition.
- **Mobile Sidebar**: the edge sheet's `w-[85%]` overrides the 18rem mobile width; honour `--sidebar-width`.
- **Motion polish**: tokenised Tabs indicator timing, faster exits than entrances on overlays, a 0.97 tooltip entry scale, composite-only Skeleton shimmer, Slider thumb border transition, Sidebar group label motion on tokens, removal of the unused, misnamed `zoom-in-50` utility.

**Breaking status**: Not breaking by API. Tooltip timing changes: consumers relying on instant tooltips pass `delay={0}` to `TooltipProvider` or `TooltipTrigger`.

## Capabilities

### Modified Capabilities

- `design-system`: consumer classes override token classes; RTL switch; indeterminate progress; tooltip delay inheritance.
