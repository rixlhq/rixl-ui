## Why

`Toaster` and `Select` have polish gaps that show up next to the components around them.

- `Toaster` passes no `theme` to Sonner and sets only the `--normal-*` variables. Under `[data-theme="dark"]`, Sonner's own colours for rich types, descriptions, the close button and the loading spinner stay on its light palette. Its injected stylesheet is unlayered, so the Tailwind classes the wrapper passes (`bg-rixl-primary` on the action button, `text-rixl-fg-muted` on the description, `shadow-rixl-lg` on the toast) lose the cascade and do nothing.
- `Select`'s check indicator appears instantly, while the `DropdownMenu` checkbox and radio indicators scale and fade in. `SelectItem` uses `cursor-pointer`, while every menu item uses `cursor-default`. The leaf parts are plain function components, which under the React 18 peer cannot receive a `ref`.

## What Changes

- **Toaster theming**: the Toaster sets Sonner's `--normal-*`, `--success-*`, `--error-*`, `--warning-*` and `--info-*` variables (and the `--gray*` ones Sonner reads for the close-button hover and spinner) from `--rixl-*` tokens, so it follows `[data-theme="dark"]` through the tokens with no React state. `richColors` defaults to `true`, so success, error and warning toasts take the rixl success, danger and warning colours.
- **Toaster parts**: action and cancel buttons take `Button`'s `sm` height, radius and focus ring; the close button gets a visible focus ring; the description inherits the toast colour at reduced strength. Overrides that cannot go through a variable use Tailwind's `!` modifier, because Sonner's stylesheet is unlayered.
- **Select indicator**: `SelectItem`'s indicator scales and fades in and out with the same classes as the `DropdownMenu` indicators.
- **Select refs**: `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectLabel`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton` and `SelectGroup` forward their ref and have a `displayName`.
- **Select cursor**: `SelectItem` uses `cursor-default`, as the menu items do.
- Found while there (see design.md): details recorded there.

**Breaking status**: Not breaking. No export, prop or variant is removed. `richColors` becomes `true` by default on `Toaster`; a consumer who wants the neutral look passes `richColors={false}`.

## Capabilities

### Modified Capabilities

- `design-system`: Toaster theming and button requirements; Select indicator, cursor and ref requirements.

## Non-goals

- No change to Sonner's 400 ms toast enter, exit and stack motion; it is Sonner's documented timing and the one motion exception in the library.
- No new token. Rich-colour backgrounds and text are mixed from existing tokens with `color-mix`.
- No `info` token: info toasts use the neutral surface.
- No `theme` prop wiring to a React theme provider.

## Acceptance

- In a browser, a success, error and warning toast take different background, border and text colours in light and in dark, and those colours change when `data-theme` changes without remounting the Toaster.
- axe reports no violations with a toast of each type open, in light and in dark.
- `SelectItem` indicator has the menu indicator's transition classes; every `Select*` leaf forwards a ref.
- `vp check`, `vp test run`, `vp pack`, `vpx size-limit` and `vpr docs` pass.
