# Tasks

## 1. Toggle states (fix)

- [x] 1.1 Disabled, hover and press reach the span roots. Evidence: `lib/__tests__/toggle-controls.browser.test.tsx` (9 tests); before the change a disabled Checkbox and RadioGroupItem measured `opacity: 1`, `cursor: auto` and hover did not move the border or track on any of the three (5 of 9 failed), after it all pass. Commit `fix(checkbox,radio-group,switch,select)`.

## 2. Shared classes

- [x] 2.1 `pressFeedback`, `pressable`, `invalidRing`, `toggleControl`; `buttonPressClasses` removed; `rounded-xs`. Evidence: `lib/__tests__/classes.test.tsx` (19 tests failed on the missing constants, then passed; each site is rendered and must carry the constant) and `checkbox.browser.test.tsx` "rounds its corners to 4px" (measured `4px` with `rounded-xs`, the radius `rounded-[4px]` gave). `git grep -n "buttonPressClasses" packages apps` finds nothing.

## 3. Label

- [x] 3.1 `Label` takes `showOptional`, `optionalLabel`, `tooltip`, `tooltipAriaLabel`; the Input family renders through `FieldLabelContent`; provider group `label`; `fieldLabel` shared. Evidence: `label.test.tsx` (17 tests; 6 new ones failed first), `input-field-labels.test.tsx` and `input-field-names.test.tsx` (provider key changed from `input` to `label`, nothing else; they failed on the old key first), `classes.test.tsx` "fieldLabel".

## 4. Controls

- [x] 4.1 `Checkbox` field chrome. Evidence: `checkbox-field.test.tsx` (11 of 20 failed first).
- [x] 4.2 `CheckboxGroup`. Evidence: `checkbox-group.test.tsx` (12 tests).
- [x] 4.3 `Switch` field chrome. Evidence: `switch-field.test.tsx` (10 of 18 failed first).
- [x] 4.4 `RadioGroup` chrome and `RadioGroupItem` `label`. Evidence: `radio-group-field.test.tsx` (13 of 15 failed first).
- [x] 4.5 Browser and axe for the labelled forms. Evidence: `checkbox-field.browser.test.tsx`, `checkbox-group.browser.test.tsx`, `switch-field.browser.test.tsx`, `radio-group-field.browser.test.tsx` (axe `[]`, label click, arrow keys, alignment, orientation).

## 5. Docs and verification

- [x] 5.1 Showcases use the new props. Evidence: `apps/docs/src/showcases/__tests__/accessible-names.test.tsx` renders every example and fails on any `[Rixl …]` warning.
- [ ] 5.2 Gate: `vp pack`, root `vp check`, `vp test --run` in packages/ui and apps/docs, `vpr knip`, `vpr budget`, `vpr publint`, root `vpr ci`. See the commit that ticks this.
