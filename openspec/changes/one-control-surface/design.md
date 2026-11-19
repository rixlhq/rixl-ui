## Context

Source of the target Select API: https://kumo-ui.com/components/select.md. Kumo's `Select` is one component: `label`, `description`, `error`, `labelTooltip`, `placeholder`, `size` (`xs | sm | base | lg`, default `base`, "matching Input and Combobox") and `items` sit on the root, which also renders the trigger. Rixl's Select is a composition (`Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`…), so props go where the part they affect lives.

## Before / after

| Place                 | Before                                                                                       | After                                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `SelectTrigger`       | own border/hover/focus/invalid/disabled classes; `h-9`/`h-8`; `w-fit`; `size: default \| sm` | `cn(controlSurface, controlSizes[size], trigger-only classes)`; `h-7`…`h-10`; `w-full`; `size: xs \| sm \| base \| lg` |
| `Select` root         | no field                                                                                     | `label`, `labelTooltip`, `description`, `error`, `required` through `InputField`                                       |
| `InputOTPSlot`        | own border, ring, invalid classes                                                            | `cn(controlSurface, joined-bar edges, active ring)`                                                                    |
| `PaginationPageInput` | raw `<input>`, no classes                                                                    | `Input` (`w-16` default), same draft logic                                                                             |
| `PaginationPageSize`  | `<label>` + native `<select>` with hand-written classes                                      | visible label + `Select`/`SelectTrigger`/`SelectContent`/`SelectItem`                                                  |

## Kumo Select mapping

| Kumo                                                                                                           | Rixl                                                             |
| -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `label`, `description`, `error`, `labelTooltip`                                                                | same names on `Select` (root)                                    |
| `required={false}` "(optional)"                                                                                | same, as `Input`                                                 |
| `placeholder`                                                                                                  | `<SelectValue placeholder>` (Base UI `Select.Value` prop)        |
| `renderValue`                                                                                                  | `<SelectValue>{(value) => …}</SelectValue>` (Base UI)            |
| `size` `xs \| sm \| base \| lg`, default `base`                                                                | same values and default, on `SelectTrigger` (the part it styles) |
| `value` / `defaultValue` / `onValueChange` / `items` / `multiple` / `disabled` / `name` / `isItemEqualToValue` | same, Base UI root props passed through                          |
| `side` / `align` / `sideOffset` / `alignOffset` / `alignItemWithTrigger`                                       | same, on `SelectContent`                                         |
| `Select.Option`, `.Group`, `.GroupLabel`, `.Separator`                                                         | `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator`    |
| `className`                                                                                                    | on `SelectTrigger`, merged through `cn`                          |
| `hideLabel`, `loading`                                                                                         | not adopted (see decision 4)                                     |

## Decisions

1. **Share the surface by composing it, not by copying it.**
   **Chosen:** export `controlSurface` and `controlSizes` from `input/input-variants.ts`; the trigger and OTP slot compose them with `cn`.
   **Alternatives considered:** a new shared `control-surface/` module (a third location for two consumers of an existing file; the surface already lives with Input); keeping per-component copies (the drift this change removes).
   **Evidence:** `input-variants.ts` already holds the surface; `trigger.tsx` and `slot.tsx` repeat its tokens.

2. **`read-only:` leaves the shared surface.**
   **Chosen:** `controlSurface` has no `read-only:` classes; `inputVariants` and `inputAreaVariants` add them back, so their class set is unchanged (the string order differs).
   **Alternatives considered:** composing the full surface into the trigger (Tailwind's `read-only:` is `:read-only`, which matches buttons and divs, so every trigger would get the muted read-only background and default cursor; checked by the browser test).
   **Evidence:** HTML spec: `:read-only` matches elements that are not editable; test `select-trigger is not styled read-only`.

3. **`size` stays on `SelectTrigger`; field props are on `Select`.**
   **Chosen:** the field wraps the root because Base UI `Select.Root` registers with the nearest `Field.Root`; `size` stays where the classes are applied, so `selectTriggerVariants({size})` stays usable on its own.
   **Alternatives considered:** `size` on the root through context (Kumo's shape; a context and a second source of truth for one class); field props on the trigger (the trigger is inside the root, so `Field.Root` could not reach the root).
   **Evidence:** Base UI `SelectTrigger.js` reads `useFieldRootContext`/`useLabelableContext`.

4. **Kumo `hideLabel` and `loading` are not adopted.** `Input` has neither, and the rule is one field shape across controls. `aria-label` on the trigger already gives a hidden name. Revisit when `Input` gets them.

5. **Trigger is `w-full`.** The shared surface is `w-full`; a field-wrapped trigger fills its column like `Input`. Consumers that want a narrow trigger pass `className="w-48"` (the existing browser test already does).

6. **OTP slots keep per-slot surface, with joined edges.** Each slot is `border` + `not-first:border-s-0` + `rounded-none first:rounded-s-md last:rounded-e-md`, which draws the same bar as before (outer edge on the first slot, shared edges otherwise). Active-slot ring and `z-10` stay slot-specific because the variant is `data-[active=true]`, not `:focus-visible`. Invalid now shows the shared danger background and ring on every slot, as `Input` does.
   **Dropped:** putting the surface on `InputOTPGroup` (would move `aria-invalid` from slot to group, an API change).

7. **Pagination page-size uses `Select` with its own label.** A stacked field label does not fit the inline "Rows per page [20]" row, so the component renders a `<label htmlFor>` beside the trigger (the trigger takes the matching `id`), which names the combobox and is native to buttons. Values are strings inside the select and converted with `Number` at the edge, because Base UI `items` records are keyed by string.

## Migration

- `<SelectTrigger size="default">` → `size="base"` (or omit it). `size="sm"` is unchanged (`h-8`).
- A trigger that relied on `w-fit` now fills its container; add `className="w-fit"` (or a width).
- `PaginationPageSize` props are trigger (`button`) attributes, not `select` attributes; its `ref` reaches the trigger button. Tests that used `selectOptions` or `fireEvent.change` on a `<select>` open the popup and click an option.
- `PaginationPageInput` props are `Input` props (`label`, `size`…); it still needs `aria-label` or `label`.
- OTP slots show the invalid ring on every slot when `aria-invalid` is set.

## Other duplicates found

Fixed here: the four above. Outside this change's scope:

- `checkbox/checkbox.tsx`, `radio-group/radio-group.tsx`, `switch/switch.tsx`, `badge/badge.tsx`, `button/button.tsx`, `collapsible/collapsible-default-trigger.tsx`, `tabs/trigger.tsx`: each repeats the `focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]` (and, for checkbox/radio/button, the `aria-invalid:` pair). A shared focus-ring constant would remove them; checkbox/radio are in another agent's class-constant extraction.
- `date-picker/date-picker-caption-class-names.ts` has its own border/focus surface; date-picker is another agent's.
- `input-group/input-group-input.tsx` strips the surface from `InputControl` inside the group's own bordered shell; intentional.
- `sidebar/trigger.tsx` `SidebarRail` is a positioned drag rail, not a duplicate of `Button`.
- `pagination`'s legacy `currentPage` alias duplicates `page` (pre-1.0 policy says delete; a separate breaking change).
