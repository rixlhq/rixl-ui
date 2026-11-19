# Tasks

## 1. Rename

- [x] 1.1 Move the `Empty` tests to `empty/__tests__/empty.test.tsx`; delete `empty-state/`, its export, pack entry and barrel line. Evidence: `empty.test.tsx` passes; `grep -rn "EmptyState\|empty-state"` finds only changelog and other changes' history; `vp pack` builds without `empty-state`.
- [x] 1.2 Rename the docs showcase and registry entry to `empty`. Evidence: `vpr docs` builds.

## 2. Kumo parity

- [x] 2.1 `size` is `sm | default | lg`. Evidence: `empty.test.tsx` "applies distinct spacing per size", "uses the default size when none is given".
- [x] 2.2 `icon` is optional with no default. Evidence: `empty.test.tsx` "renders no icon container without an icon", "renders a supplied icon inside a container hidden from assistive technology".
- [x] 2.3 `commandLine` renders a copyable block. Evidence: `empty.test.tsx` "renders the command line", "copies exactly the command line"; `empty.browser.test.tsx` "has no axe violations with every part rendered".
- [x] 2.4 `headingLevel` sets the title element. Evidence: `empty.test.tsx` "renders the title at the requested heading level", "renders the title as an h3 by default".

## 3. Gate

- [x] 3.1 `vp check`, `vp test run` (71 files, 667 tests), `vp pack`, `vpx size-limit` (57.17 kB of 58 kB; preset 3.36 kB of 3.5 kB) and `vpr docs` pass.
