# Tasks

## 1. Fold Field into Input and InputArea

- [x] 1.1 Move the field chrome into `input/` as internals; delete the `field/` component and its entry, exports and showcase
- [x] 1.2 Move `InputArea` into `input/`, add `size` and `onValueChange`, share the control surface and field chrome
- [x] 1.3 Delete `Textarea`, `@rixl/ui/textarea` and `@rixl/ui/input-area`
- [x] 1.4 Rename the field data slots

## 2. Adornments only in InputGroup

- [x] 2.1 Remove `startIcon`, `endIcon`, `wrapperClassName` from `Input`
- [x] 2.2 Add `InputGroupInput`, `InputGroupAddon align`, `role="group"`

## 3. Verify and document

- [x] 3.1 Browser + axe tests for Input, InputArea, InputGroup
- [x] 3.2 Update docs showcases and the docs component search
- [x] 3.3 `vp check`, `vp test run`, `vp pack`, `vpx size-limit`, `vp run knip`, `vpr docs:build`
