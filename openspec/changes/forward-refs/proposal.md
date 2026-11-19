## Why

`@rixl/ui` declares `react: ^18.0.0 || ^19.0.0` as a peer (`packages/ui/package.json#peerDependencies`). Under React 18 a function component only receives `ref` through `forwardRef`; without it React drops the ref and logs "Function components cannot be given refs". The code-style rule already requires `forwardRef` with a `displayName` on leaf components that wrap a DOM element, but many exported parts are still plain functions, so a consumer on React 18 cannot focus, measure or anchor to them. The dashboard, landing and docs run React 19 today, so nothing fails there; the gap only shows on React 18.

Found with:

```bash
for f in packages/ui/src/components/*/*.tsx; do grep -q forwardRef $f || echo $f; done
```

## What Changes

- Wrap every exported component that renders a DOM element, or a Base UI part that accepts a ref, in `forwardRef` with a `displayName`, and pass the ref to the element or part that receives the rest of the props.
- Folders in this change: `checkbox`, `radio-group`, `switch`, `popover`, `tooltip`, `dropdown-menu`, `avatar`, `progress`, `input-otp`, `pagination`, `sidebar`. `collapsible`, `copy-block`, `button-group`, `empty`, `skeleton`, `slider` and `tabs` already forward refs; this change adds ref tests for them where none exist.
- Parts that render no element (context providers, roots, portals, hooks) are not wrapped; design.md lists each.
- Other folders (`alert`, `badge`, `table`, `breadcrumb`, `label`, `separator`, `toaster`, `select`, `input`, `input-group`, `dialog`, `sheet`, `alert-dialog`, `calendar`, `date-picker`, `card`) are handled by separate changes.

**Breaking status**: Not breaking. Export names and prop types are unchanged. Prop types gain `ref` through `forwardRef`, which is additive.

## Capabilities

### Modified Capabilities

- `design-system`: leaf components forward refs.

## Non-goals

- No new props, variants or visual change.
- No change to parts that render no element.
- No React 18 dependency added to the repo (see design.md, "React 18 verification").
- No change to the folders owned by other changes.

## Acceptance

- Every exported part in the listed folders that renders an element forwards `ref` to it, covered by a `createRef` test per part (`__tests__/forward-refs.test.tsx` in each folder).
- Each wrapped component has a `displayName`.
- `vp check`, `vp test run`, `vp pack`, `vpx size-limit` and `vpr docs` pass, with `.size-limit.json` unchanged.
