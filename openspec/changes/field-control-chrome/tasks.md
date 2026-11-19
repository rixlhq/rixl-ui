# Tasks

## 1. Toggle states (fix)

- [ ] 1.1 Disabled, hover and press reach the span roots. Test: `toggle-controls.browser.test.tsx`.

## 2. Shared classes

- [ ] 2.1 `pressFeedback`, `invalidRing`, `toggleControl`, `fieldLabel`; `buttonPressClasses` removed; `rounded-xs`. Tests: `lib/__tests__/classes.test.tsx`, component class tests, `toggle-controls.browser.test.tsx`.

## 3. Label

- [ ] 3.1 `Label` takes `showOptional`, `optionalLabel`, `tooltip`, `tooltipAriaLabel`; Input family renders through `FieldLabelContent`; provider group `label`. Tests: `label.test.tsx`, `input-field-labels.test.tsx`, `input-field-names.test.tsx`.

## 4. Controls

- [ ] 4.1 `Checkbox` field chrome. Test: `checkbox-field.test.tsx`.
- [ ] 4.2 `CheckboxGroup`. Test: `checkbox-group.test.tsx`.
- [ ] 4.3 `Switch` field chrome. Test: `switch-field.test.tsx`.
- [ ] 4.4 `RadioGroup` chrome and `RadioGroupItem` `label`. Test: `radio-group-field.test.tsx`.
- [ ] 4.5 Browser and axe for the labelled forms. Tests: `*-field.browser.test.tsx`.

## 5. Docs and verification

- [ ] 5.1 Showcases use the new props.
- [ ] 5.2 Gate: `vp pack`, root `vp check`, `vp test --run` in packages/ui and apps/docs, `vpr knip`, `vpr budget`, `vpr publint`, root `vpr ci`.
