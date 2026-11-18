# Design

## Context

`packages/ui/package.json` lists `react` and `react-dom` as `^18.0.0 || ^19.0.0` peers, and dev-installs React 19 (`react@19.3.1`). The repo has no React 18 install. Several exported parts are plain function components that spread `...props` onto a Base UI part or a DOM element. Where they spread, React 19 delivers `ref` through those props; React 18 strips it before the function runs and warns.

## Decisions

### `forwardRef`, not the React 19 `ref` prop

**Chosen:** `forwardRef<ElementType, Props>(function Name(…, ref) {…})` plus `Name.displayName = "Name"`, matching `button.tsx`, `skeleton.tsx` and `collapsible-*.tsx`.

**Alternatives considered:** rely on React 19 `ref` as a prop (rejected: React 18 is a supported peer and drops the ref); drop React 18 support (rejected: a breaking, separate decision, not part of a fix).

**Dropped:** None.

**Evidence:** `.agents/rules/code-style.md` ("under React 18 a function component only receives `ref` through `forwardRef`"); `package.json#peerDependencies`.

### The ref goes to the element that receives the rest of the props

**Chosen:** the ref lands where `...props` and `data-slot` land, so `ref.current` and `{...rest}` always describe the same element. Concretely: `PopoverContent`, `TooltipContent` and `DropdownMenuContent` forward to the `Popup`, not the `Positioner` or `Portal`; `PaginationPageSize` forwards to the `<select>` (its props already go there), not the wrapping `<label>`; `Sidebar` forwards to the element that takes its props: the container `div` on desktop, the `div` for `collapsible="none"`, and the dialog popup on mobile (`DialogContent` already forwards refs); `SidebarProvider` forwards to its wrapper `div`; `InputOTP` forwards to the `<input>` (`OTPInput` is a `forwardRef` to the input); `SidebarMenuButton` forwards to the button even when a tooltip wraps it.

**Alternatives considered:** forward to the outermost element (rejected: for the popups that is the positioner, which consumers do not style or focus; for `PaginationPageSize` the label, which is not what its props configure).

**Dropped:** None.

**Evidence:** the component sources; Base UI's `*.d.ts` for the ref element types (`MenuPopup` is `RefAttributes<HTMLDivElement>`, `CheckboxRoot` and `SwitchRoot` are `RefAttributes<HTMLElement>`).

### Parts left unwrapped

Parts that render no element of their own have nothing for a ref to point at:

| Part                                                                                                             | Why                                                                       |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `Popover`, `Tooltip`, `TooltipProvider`, `DropdownMenu`, `DropdownMenuPortal`, `DropdownMenuSub`                 | Base UI roots, providers and portals that render no DOM element           |
| `PaginationProvider`, `PaginationLimitNode`                                                                      | A context provider and a conditional node switch; no element of their own |
| `useSidebar`, `SidebarSideContext`, `usePaginationContext` and the other hooks                                   | Not components                                                            |
| `TabsIndicator`, `TabsOverflowControl`, `CopyIndicator`                                                          | Internal; not exported from `index.ts`                                    |
| `CheckIcon`, `MinusIcon`, `CircleIcon`, `ChevronRightIcon`, `SidebarTriggerIcon` and the other local SVG helpers | Internal, decorative, not exported                                        |

**Dropped:** None.

**Evidence:** each folder's `index.ts` (exports) and the sources above.

### Tests: element check plus a `forwardRef` marker

**Chosen:** one table-driven `__tests__/forward-refs.test.tsx` per folder. Each row renders the part with a `createRef`, expects `ref.current` to be the element with the expected `data-slot`, and expects the component to be a `forwardRef` component with a `displayName`. The marker check uses `$$typeof === Symbol.for("react.forward_ref")` from a shared helper in `test/forward-ref.ts`.

**Alternatives considered:** only the `ref.current` check (rejected: the dev install is React 19, where a plain function that spreads `...props` already passes `ref` through, so that test cannot fail for the React 18 defect); install React 18 to run the same tests (rejected: see below).

**Dropped:** None.

**Evidence:** the marker test fails before each change and passes after it (recorded in tasks.md).

### React 18 verification

**Chosen:** do not run the suite against React 18 in this change.

**Alternatives considered:** add `react@18` and `react-dom@18` as dev dependencies, or alias them in the test config (rejected: only React 19 is installed (`node_modules/.bun` holds `react@19.3.1`) and the brief rules out adding React 18 as a dependency; a second React in the lockfile also changes every consumer-facing install check).

**Dropped:** None.

**Evidence:** `ls node_modules/.bun | grep '^react@'` lists only `react@19.3.1`. What the tests prove instead is the exact condition React 18 needs: the exported component is a `forwardRef` exotic component. A follow-up could add a CI matrix job on React 18.

## Risks / Trade-offs

- Wrapping adds a small amount of code per component. The total is checked with `vpx size-limit`; `.size-limit.json` is not raised.
- `forwardRef` hides a generic parameter. `Slider` already restores it with a cast; this change adds no generic components.
- `sidebar/` and `dropdown-menu/` are near the complexity caps; a file that goes over is split, not suppressed.
