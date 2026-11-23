## D1. `Sidebar side` keeps `left | right`

Kumo's `Sidebar` takes `side: "left" | "right"` and writes physical classes. Renaming to `start | end` would diverge from Kumo and force a breaking change for no behaviour gain. The desktop panel here already resolves `side="left"` with `start-0`, so the values already mean "inline start / inline end". The mobile sheet now agrees. Documented on the `side` prop.

## D2. Slide direction by `ltr:`/`rtl:`

Tailwind has no logical `translate-x`. The mobile sheet's start and end states use `ltr:-translate-x-full rtl:translate-x-full` (and the reverse for the end side), the same idiom the sidebar rail already uses.

## D3. Safe-area insets are physical

`env(safe-area-inset-left|right)` name physical edges. Dialog's `pl`/`pr` pairing is correct as it is. `DialogCloseButton` positions with logical `end`, so its inset must follow `end`: `ltr:end-[max(…, inset-right)] rtl:end-[max(…, inset-left)]`.

## D4. Tabs indicator stays physical

`TabsPrimitive.Indicator` sets `--active-tab-left` from `offsetLeft` against the list's physical left edge. Pairing it with `start-0` would offset from the wrong edge in RTL; `left-0` is the match. A browser test asserts the indicator overlaps the active tab in RTL.

## D5. One flip class

`rtlFlip = "rtl:-scale-x-100"` in `src/lib/classes.ts`. `-scale-x-100` over `rotate-180` because it leaves the glyph upright for non-symmetric icons. Used at five sites (pagination, tabs overflow, dropdown sub, breadcrumb, date picker chevron). Not applied to chevrons that point down or up.

## D6. `DirectionProvider` is Base UI's

The subpath is a re-export; no wrapper, no extra state. Its JS cost is a separate entry file of a few lines.
