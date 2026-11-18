# Design

## Context

Verified against source (Sonner 2.0.8, `node_modules/sonner/dist/index.js`):

- Sonner injects its stylesheet unlayered. Tailwind 4 utilities live in `@layer utilities`, and an unlayered rule beats any layered one regardless of specificity. So `classNames` with plain utilities lose against Sonner's `[data-sonner-toast][data-styled=true] ...` rules, as the Sonner guidance says ("every class needs `!important`").
- Sonner defines its palette as CSS variables on `[data-sonner-toaster][data-sonner-theme=light|dark]`: `--normal-*`, `--success-*`, `--info-*`, `--warning-*`, `--error-*` (bg, border, text), `--normal-bg-hover`, `--normal-border-hover` (dark only), and `--gray1..12`. An inline `style` on the toaster element beats those rules, so the variables can point at `--rixl-*` tokens and then follow whatever theme the ancestor sets.
- Rich colours only apply when `data-rich-colors="true"`, set by the `richColors` prop.
- Constants that variables cannot reach: description colour (`#3f3f3f`, or `#e8e8e8` for the dark theme), the `rgba(0,0,0,.x)` focus rings, the 4px button radius, 24px button height, and `box-shadow: 0 4px 12px rgba(0,0,0,.1)`.

## Toaster decisions

| Decision                                         | Why                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Variables via inline `style`, not `theme`        | Tokens already switch with `[data-theme]`; a `theme` prop would need React state, and `"system"` follows the OS rather than the rixl attribute. `theme` stays the consumer's to pass.                                                                                                                                                                     |
| Rich colours from `color-mix` of existing tokens | No new token. Background `10%` and border `30%` of the feedback colour over `--rixl-surface`; text `55%` feedback colour over `--rixl-fg`, because the raw `--rixl-warning` and `--rixl-success` fail 4.5:1 as text on a light surface. Mixing toward `--rixl-fg` darkens on light and lightens on dark. Contrast is measured by axe in the browser test. |
| `richColors` defaults to `true`                  | The requirement is that success, error and warning toasts use the feedback tokens; Sonner only applies the `--success-*` variables with rich colours on. Opt out with `richColors={false}`.                                                                                                                                                               |
| Info stays neutral                               | There is no `--rixl-info` token and adding one is not needed for this change.                                                                                                                                                                                                                                                                             |
| Overrides with Tailwind `!`                      | Needed for what variables cannot reach (list above). Few, and per part.                                                                                                                                                                                                                                                                                   |
| Sonner's motion untouched                        | 400 ms ease enter, exit and stack is Sonner's documented timing. Its reduced-motion rule already disables it.                                                                                                                                                                                                                                             |

## Select decisions

- Indicator: same class string as `DropdownMenuCheckboxItem` (`transition-[scale,opacity] duration-rixl-fast ease-rixl-out motion-reduce:transition-none data-starting-style:scale-50 data-starting-style:opacity-0 data-ending-style:scale-50 data-ending-style:opacity-0`). Base UI sets `data-starting-style` and `data-ending-style` on `Select.ItemIndicator` as it does on the menu indicators.
- Cursor: `cursor-default`. Menu items and native `<option>`/`<select>` popups use the default arrow; a pointer cursor is for links. Base UI's own Select and Menu demos use the same default. Keeping both on `cursor-default` makes the two popups feel the same.
- Refs: leaf parts are wrapped in `forwardRef` with a `displayName`, as the repository rule requires for React 18 peers. `SelectGroup` is included because it renders a DOM element.
- `SelectValue` renders a DOM element via Base UI; it is wrapped as well.
- Chevron rotation and popup transitions already use `duration-rixl-fast`, `ease-rixl-out` and `motion-reduce:transition-none`; no change.

## Found while there

Filled in during implementation.
