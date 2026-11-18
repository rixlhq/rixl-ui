# Tasks

## 1. Rename

- [ ] 1.1 Move the `Empty` tests to `empty/__tests__/empty.test.tsx`; delete `empty-state/`, its export, pack entry and barrel line. Evidence: `empty/__tests__/empty.test.tsx`; `vp pack` has no `empty-state` output.
- [ ] 1.2 Rename the docs showcase and registry entry to `empty`. Evidence: `vpr docs:build`.

## 2. Kumo parity

- [ ] 2.1 `size` is `sm | default | lg`. Evidence: `empty.test.tsx` "applies distinct spacing per size".
- [ ] 2.2 `icon` is optional with no default. Evidence: `empty.test.tsx` "renders no icon container without an icon".
- [ ] 2.3 `commandLine` renders a copyable block. Evidence: `empty.test.tsx` "copies the command line"; `empty.browser.test.tsx` axe check.
- [ ] 2.4 `headingLevel` sets the title element. Evidence: `empty.test.tsx` "renders the title at the requested heading level".

## 3. Gate

- [ ] 3.1 `vp check`, `vp test run`, `vp pack`, `vpx size-limit`, `vpr docs:build` pass.
