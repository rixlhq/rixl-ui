# Tasks

## 1. Caption

- [ ] 1.1 Previous and next flank the caption; controls stay inside the root for every layout. Test: `date-picker-layout.browser.test.tsx` (containment and no overlap, per layout, one and two months, week numbers, `de`/`ru`/`el`; position stability across months).

## 2. Surface

- [ ] 2.1 Standalone surface and host reset. Tests: `date-picker-surface.test.tsx`, `date-picker-layout.browser.test.tsx` (standalone, `Popover`, `Card`, `Dialog`).

## 3. Cells and spacing

- [ ] 3.1 Button fills the cell; today, selected, range and focus visuals; spacing; footer. Tests: `date-picker-layout.browser.test.tsx`.

## 4. Docs

- [ ] 4.1 Showcase examples: standalone, popover, dropdown caption, two months, presets. Check: `vpr docs:build`.

## 5. Verification

- [ ] 5.1 `vp check`, `vp test --run`, coverage floor, `vp pack`, `vpx publint`, `vpx size-limit`, docs build.
