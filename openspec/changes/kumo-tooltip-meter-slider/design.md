## Context

Sources read: https://kumo-ui.com/components/{tooltip,meter,slider,input-group}.md and Kumo's `tooltip.tsx`, `meter.tsx`, `slider.tsx`, `input-group-button.tsx`, `button.tsx` at commit 989cc18.

## Decisions

1. **Tooltip follows Kumo's shape.** `content` is the popup, `render` is the trigger element and `children` go inside it. Props Kumo spreads on the root (`open`, `onOpenChange`, `disabled`) still reach Base UI's `Tooltip.Root`; `delay` and `closeDelay` go to the trigger. `className` goes to the trigger, as in Kumo. The popup keeps Rixl's surface and `data-slot="tooltip-content"`.
2. **Parts are removed, not kept.** Kumo has no `TooltipTrigger` or `TooltipContent`. Every caller in the repo fits the shorthand, so keeping them would be dead API.
3. **Sidebar uses `disabled`, not `hidden`.** The collapsed-only tooltip used `hidden` on the popup, which still opened and closed it. `disabled` on the root never opens it. The object form of `tooltip` is `{content, side, align}`.
4. **`InputGroupButton` does not reuse `Button`'s `title`.** `title` names a button only when it has no children, and an `InputGroupButton` usually holds an icon child. It also has no `side`. `InputGroupButton` wraps `Button` in `Tooltip` itself, as Kumo does, and derives `aria-label` from a string `tooltip`.
5. **Progress follows `Meter`.** `label` renders in Base UI's `Progress.Label`, `showValue` (default `true` when a label is set) in `Progress.Value`, `customValue` replaces the value text. With no `label`, `aria-label` or `aria-labelledby`, it warns in development through `useWarnMissingName`. `trackClassName` and `indicatorClassName` are not added: no caller needs them.
6. **Slider is one piece.** Kumo's `Slider` takes `label`, `size`, `getAriaLabel` and Base UI's root props; it has no parts. `Slider` renders the control, track, indicator and one thumb per value. `orientation` stays, because Rixl's slider has supported vertical.

## Migration

- `<Tooltip><TooltipTrigger render={x} /><TooltipContent side="top">Hi</TooltipContent></Tooltip>` → `<Tooltip content="Hi" side="top" render={x} />`; trigger text moves to the children.
- `SidebarMenuButton tooltip={{children: "Hi"}}` → `tooltip={{content: "Hi"}}`.
- `<Slider><SliderControl><SliderTrack><SliderIndicator /><SliderThumb aria-label="Volume" /></SliderTrack></SliderControl></Slider>` → `<Slider label="Volume" />`, or `getAriaLabel={() => "Volume"}` with no visible label.
