## Context

`@rixl/ui` is shared across `dashboard`, `landing`, and `docs`. Prior passes ported primitives from Base UI and shadcn, leaving a mix of legacy CSS keyframe classes (`data-open:animate-in`), upward hover jumps (`hover:-translate-y-px`), oversized mobile/touch overrides (`min-h-11` on tabs, `size-11` on modal close buttons, `max-sm:h-dvh` on dialogs), and unlayered CSS transitions in the playground (`* { transition: ... }`) that overrode Tailwind v4 `@layer utilities` rules.

We audited the library against Apple Human Interface Guidelines and Emil Kowalski's design engineering skills (`emil-design-eng`, `apple-design`, `animate`, `review-animations`, `remove-animations`, `animation-performance`, `choreograph`, `gestures`, `mobile-native`, `break-ui`, `ask-sonner`).

## Goals / Non-Goals

**Goals:**

- Ensure every interactive surface has physical, interruptible feedback (`active:scale-[var(--rixl-press-scale)]`, `data-starting-style` / `data-ending-style`) without artificial hover jumps.
- Standardize easing curves (`--rixl-ease-out`, `--rixl-ease-in-out`, `--rixl-ease-drawer`) in `preset.css`.
- Close functional design-system gaps (`Button.loading`, `CopyBlock` morphing confirmation, `Alert`/`Badge` `success` and `warning` variants, light-theme `--rixl-danger` WCAG AA contrast).
- Harden components against real-world mobile and layout edge cases (`touch-manipulation`, `select-none`, `overscroll-contain`, `object-cover` on `AvatarImage`, `min-w-0` / `break-words` on text containers).
- Verify all overlays and interactive layout primitives in real Chromium via Vitest Browser Mode (`axeViolations`) with zero `act(...)` noise.

**Non-Goals:**

- Introducing a JS spring runtime (`motion`) into `@rixl/ui`.
- Breaking any existing component prop signatures or subpath exports.

## Decisions

### 1. Pure CSS `transition` with `data-starting-style` / `data-ending-style` on Base UI overlays

- **Chosen**: Drive `Dialog`, `AlertDialog`, `Popover`, `DropdownMenu`, `Select`, and `Tooltip` entrance and exit animations exclusively through CSS `transition-[scale,opacity]` paired with Base UI's `data-starting-style` and `data-ending-style` attributes (and `data-instant:duration-0` on `TooltipContent`).
- **Alternatives considered**:
  - _CSS `@keyframes` (`data-open:animate-in` / `data-closed:animate-out`)_: Keyframes cannot retarget mid-flight; pressing Escape while a popup is 50% open snaps to `scale(1)` before animating out.
  - _Framer Motion (`motion`)_: Adds ~15–30 kB to the bundle and a runtime peer dependency for transitions that Base UI's `data-starting-style` / `data-ending-style` lifecycle handles natively in CSS.
- **Dropped**: Keeping both `transition-[scale,opacity] data-starting-style:...` and `data-open:animate-in data-closed:animate-out` on the same popup element. Tried in the 1st pass; dropped in the 3rd pass because CSS `@keyframes` take precedence over CSS `transition` in the cascade on the same properties (`transform`/`opacity`), defeating mid-flight interruptibility. Replaced by pure `transition-[scale,opacity]` + `data-starting-style` / `data-ending-style`.
- **Evidence**: Base UI transitions docs; `review-animations/STANDARDS.md` (Interruptibility rule); verified in `dialog.browser.test.tsx`, `popover.browser.test.tsx`, `dropdown-menu.browser.test.tsx`, `select.browser.test.tsx`, `tooltip.browser.test.tsx`, and `alert-dialog.browser.test.tsx`.

### 2. Easing tokens and dedicated `--rixl-ease-drawer` curve

- **Chosen**:
  - `--rixl-ease-out: cubic-bezier(0.23, 1, 0.32, 1)` (strong ease-out for UI entrances and press feedback)
  - `--rixl-ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` (strong ease-in-out for on-screen indicator movement)
  - `--rixl-ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` (`ease-rixl-drawer` for `SheetContent`)
- **Alternatives considered**:
  - _Browser built-in `ease-out` / `ease-in-out`_: Too weak initial acceleration, making 180–260ms UI transitions feel sluggish.
  - _Reusing `--rixl-ease-out` for edge-attached `SheetContent`_: A full-height sheet travels 300–400px; it needs Vaul/iOS's steeper initial acceleration (`cubic-bezier(0.32, 0.72, 0, 1)`) so it feels responsive immediately on click while settling gently.
- **Dropped**: None.
- **Evidence**: `emil-design-eng/SKILL.md` (Easing Rules) and `gestures/SKILL.md` (The Vaul curve); verified in `sheet.test.tsx` and `sheet.browser.test.tsx`.

### 3. Waiting for in-flight Web Animations before running `axe-core` in Browser Mode

- **Chosen**: In `packages/ui/test/a11y.ts`, await `Promise.allSettled(element.getAnimations({subtree: true}).map((a) => a.finished))` before running `axe.run(element)`.
- **Alternatives considered**:
  - _Hardcoded `setTimeout` sleep in browser tests_: Slow and flaky across CI runners.
  - _Forcing `prefers-reduced-motion: reduce` in browser tests_: Would prevent browser tests from exercising the real CSS transitions.
- **Dropped**: Running `axe.run(document.body)` immediately on the frame a portal mounts. Tried initially; failed `color-contrast` in Chromium because `data-starting-style:opacity-0` meant `axe` sampled the popup text at `opacity: 0.05` (`fgColor: #e2e2e3` against `#fefefe`, contrast `1.28:1`). Replaced by awaiting `element.getAnimations({subtree: true})` in `a11y.ts`.
- **Evidence**: Measured in `vp test --project browser --run` across all 9 `.browser.test.tsx` suites (20 browser tests, 0 failures).

### 4. Suppressing false-positive `act(...)` console warnings from Playwright CDP input in Browser Mode

- **Chosen**: Filter `was not wrapped in act(...)` messages in `packages/ui/test/setup.browser.ts` while leaving unit tests (`jsdom`) untouched.
- **Alternatives considered**:
  - _Setting `globalThis.IS_REACT_ACT_ENVIRONMENT = false` in `setup.browser.ts`_: `@testing-library/react` sets `IS_REACT_ACT_ENVIRONMENT = true` inside every `render()` call and restores the previous value, leaving it `true` when async Base UI `ResizeObserver`/pointer handlers fire outside `act(...)`.
  - _Wrapping `userEvent.click()` in `act()`_: Vitest Browser Mode executes `userEvent` via Playwright CDP commands in the host process, which cannot be wrapped in synchronous React `act()`.
- **Dropped**: Setting `IS_REACT_ACT_ENVIRONMENT = false` once at module load in `setup.browser.ts`. Tried first; dropped because `@testing-library/react`'s `render()` overwrote it on first call. Replaced by filtering the warning in `setup.browser.ts`.
- **Evidence**: Measured `vp test --project browser --run` stderr output: reduced from ~700 KB of `act(...)` stack traces to 0 bytes.

## Risks / Trade-offs

- **[Risk] Removing `data-open:animate-in` from overlays leaves `@keyframes rixl-enter` only for non-Base-UI-transition elements** → Mitigation: Keep `@keyframes rixl-enter` and `@utility animate-in` in `preset.css` because `TabsContent` (`data-[activation-direction]`), `Checkbox`, `RadioGroup`, and `DropdownMenuCheckboxItem` indicators still use `animate-in` where Base UI does not apply `data-starting-style`.
- **[Risk] `CopyBlock` blur crossfade (`blur-[2px]`) on older GPUs** → Mitigation: Scoped strictly to a `16×16px` (`size-4`) SVG icon over `120ms` (`duration-rixl-fast`), well under the 2px/small-surface threshold in `animation-performance/SKILL.md`, and disabled under `motion-reduce:transition-none`.
