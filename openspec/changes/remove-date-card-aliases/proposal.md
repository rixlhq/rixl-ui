## Why

This release is already a major version, so deprecated duplicates can go now instead of lingering. Three of them remain:

- `@rixl/ui/calendar` and its `Calendar`, `CalendarProps`, `CalendarDayButton` and `CalendarDayButtonProps` exports re-export the date-picker grid under another name.
- `@rixl/ui/date-picker` still exports `DatePickerCalendar`, `DatePickerCalendarProps`, `DatePickerCalendarDayButton` and `DatePickerCalendarDayButtonProps`, aliases of `DatePicker`, `DatePickerProps`, `DatePickerDayButton` and `DatePickerDayButtonProps`. They go through an internal `date-picker/calendar.tsx` compatibility module.
- `Card` accepts an `interactive` prop that applies no classes ("Card is passive" since `unify-component-architecture`).

## What Changes

- **Remove** the `calendar/` component folder, the `@rixl/ui/calendar` subpath (`package.json#exports`, `vite.config.ts#pack.entry`, `src/index.ts`), `date-picker/calendar.tsx` and the four `DatePickerCalendar*` alias exports.
- **Remove** `Card`'s `interactive` prop and its empty `cva` variant. `selected` and the other variants are unchanged.
- **Tests**: the three `Calendar` tests and the two alias-identity tests only pinned the removed names. The behaviour they exercised (root `data-slot`, `data-day` buttons, single selection) already has tests on `DatePicker`; the `data-slot` check is added there. The "Card is passive" tests stay without the prop.
- **Docs app**: no Calendar showcase exists, so the sidebar needs no change; the Card showcase stops passing `interactive`.

**Breaking status**: Breaking.

Migration:

| Before                                                 | After                                                       |
| ------------------------------------------------------ | ----------------------------------------------------------- |
| `import {Calendar} from "@rixl/ui/calendar"`           | `import {DatePicker} from "@rixl/ui/date-picker"`           |
| `import type {CalendarProps} from "@rixl/ui/calendar"` | `import type {DatePickerProps} from "@rixl/ui/date-picker"` |
| `import {CalendarDayButton} from "@rixl/ui/calendar"`  | `import {DatePickerDayButton} from "@rixl/ui/date-picker"`  |
| `CalendarDayButtonProps`                               | `DatePickerDayButtonProps`                                  |
| `DatePickerCalendar`                                   | `DatePicker`                                                |
| `DatePickerCalendarProps`                              | `DatePickerProps`                                           |
| `DatePickerCalendarDayButton`                          | `DatePickerDayButton`                                       |
| `DatePickerCalendarDayButtonProps`                     | `DatePickerDayButtonProps`                                  |
| `<Card interactive>`                                   | `<Card>` (the prop changed nothing)                         |

Consumers that want a clickable card put the action on a child (`Button`, a link) or pass `onClick`, `role` and `tabIndex` on the `Card` themselves.

## Capabilities

### Modified Capabilities

- `design-system`: DatePicker is the only date grid export (Calendar entry and aliases removed); Card requirement modified to drop `interactive`.

## Non-goals

- The Kumo aliases `selected` and `onChange` on `DatePicker` stay; they are a prop-level compatibility layer with their own tests, not one of the duplicates named above.
- No change to `Input`, `Dialog`, `Sheet` or `AlertDialog`; other changes own them.

## Acceptance

- `grep -rn "components/calendar\|@rixl/ui/calendar\|DatePickerCalendar"` over `packages/ui/src`, `apps/docs/src` and `openspec/specs` finds nothing.
- `vpx knip` reports nothing in `date-picker/` or `card/`.
- `vp check`, `vp test run`, `vp pack`, `vpx size-limit` and `vpr docs` pass.
