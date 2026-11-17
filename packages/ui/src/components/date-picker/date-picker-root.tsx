import {forwardRef, useContext, useMemo, type ComponentProps} from "react";
import type {Root} from "react-day-picker";
import {DatePickerRootContext} from "./date-picker-root-context";
import {mergeDatePickerRefs} from "./merge-date-picker-refs";

export const DatePickerRoot = forwardRef<HTMLDivElement, ComponentProps<typeof Root>>(({rootRef, ...props}, ref) => {
  const publicRef = useContext(DatePickerRootContext);
  const mergedRef = useMemo(() => mergeDatePickerRefs(rootRef ?? null, ref, publicRef), [rootRef, ref, publicRef]);
  return <div data-slot="calendar" {...props} ref={mergedRef} />;
});
DatePickerRoot.displayName = "DatePickerRoot";
