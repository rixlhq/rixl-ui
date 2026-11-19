## Context

Sources read: https://kumo-ui.com/components/{tooltip,meter,slider,input-group}.md and Kumo's `tooltip.tsx`, `meter.tsx`, `slider.tsx`, `input-group-button.tsx`, `button.tsx` at commit 989cc18.

## Decisions

1. **Tooltip follows Kumo's shape.** `content` is the popup, `render` is the trigger element and `children` go inside it. Props Kumo spreads on the root (`open`, `onOpenChange`, `disabled`) still reach Base UI's `Tooltip.Root`; `delay` and `closeDelay` go to the trigger. `className` goes to the trigger, as in Kumo. The popup keeps Rixl's surface and `data-slot="tooltip-content"`.
2. **Parts are removed, not kept.** Kumo has no `TooltipTrigger` or `TooltipContent`. Every caller in the repo fits the shorthand, so keeping them would be dead API.
3. **Sidebar uses `disabled`, not `hidden`.** The collapsed-only tooltip used `hidden` on the popup, which still opened and closed it. `disabled` on the root never opens it. The object form of `tooltip` is `{content, side, align}`.
4. **`InputGroupButton` does not reuse `Button`'s `title`.** `title` names a button only when it has no children, and an `InputGroupButton` usually holds an icon child. It also has no `side`. `InputGroupButton` wraps `Button` in `Tooltip` itself, as Kumo does, and derives `aria-label` from a string `tooltip`.
5. **Progress follows `Meter`.** `label` renders in Base UI's `Progress.Label`, `showValue` (default `true` when a label is set) in `Progress.Value`, `customValue` replaces the value text. With no `label`, `aria-label` or `aria-labelledby`, it warns in development through `useWarnMissingName`. `showValue` defaults to on only when a `label` is set, so a bare `Progress` looks as before; `customValue` shows whatever `showValue` says, as in Kumo. `trackClassName` and `indicatorClassName` are added as in Kumo, because the root no longer is the bar and `className="h-1"` would no longer thin it. Progress keeps indeterminate (`value={null}`), which Kumo's `Meter` has no equivalent for.
6. **Slider is one piece.** Kumo's `Slider` takes `label`, `size`, `getAriaLabel` and Base UI's root props; it has no parts. `Slider` renders the control, track, indicator and one thumb per value. `orientation` stays, because Rixl's slider has supported vertical.

7. **Slider is published.** It was left out of `pack.entry`, `package.json#exports` and `src/index.ts` while it did not fit the budget: with it, `vpr budget` read 58.69 kB against the 58 kB limit. The budget sums the brotli size of each unminified `dist/*.js`, JSDoc included, so `pack.outputOptions.comments.jsdoc: false` leaves JSDoc out of the JS (the `.d.ts` files keep it) and takes the figure from 57.11 kB to 49.65 kB. With Slider it is 50.88 kB.
8. **Progress keeps its track colour.** Progress uses `bg-rixl-primary/20 h-2` and Slider `bg-rixl-secondary h-1.5`. Kumo does not align them either (`Meter` `bg-kumo-fill h-2`, `Slider` `bg-kumo-recessed` inside a padded `h-6`/`h-8` track), and a change would restyle every Progress, so both keep their look.

## Migration

- `<Tooltip><TooltipTrigger render={x} /><TooltipContent side="top">Hi</TooltipContent></Tooltip>` → `<Tooltip content="Hi" side="top" render={x} />`; trigger text moves to the children.
- `<Progress className="h-1" />` → `<Progress trackClassName="h-1" />`; a bare `Progress` needs `aria-label` or `label`.
- `SidebarMenuButton tooltip={{children: "Hi"}}` → `tooltip={{content: "Hi"}}`.
- `<Slider><SliderControl><SliderTrack><SliderIndicator /><SliderThumb aria-label="Volume" /></SliderTrack></SliderControl></Slider>` → `<Slider label="Volume" />`, or `getAriaLabel={() => "Volume"}` with no visible label.
