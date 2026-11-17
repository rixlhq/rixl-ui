import {forwardRef} from "react";
import {DatePickerGrid} from "./date-picker-grid";
import {sharedGridProps} from "./shared-grid-props";
import {selectionHandler} from "./selection-handler";
import type {DatePickerProps} from "./date-picker.types";

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>((props, ref) => {
  const shared = sharedGridProps(props);
  if (props.mode === "range") {
    const {value, selected, onSelect, onChange, min, max} = props;
    return (
      <DatePickerGrid
        ref={ref}
        mode="range"
        {...shared}
        min={min}
        max={max}
        selected={value ?? selected}
        onSelect={selectionHandler(onSelect, onChange)}
      />
    );
  }
  if (props.mode === "multiple") {
    const {value, selected, onSelect, onChange, min, max} = props;
    return (
      <DatePickerGrid
        ref={ref}
        mode="multiple"
        {...shared}
        min={min}
        max={max}
        selected={value ?? selected}
        onSelect={selectionHandler(onSelect, onChange)}
      />
    );
  }
  const {value, selected, onSelect, onChange} = props;
  return (
    <DatePickerGrid ref={ref} mode="single" {...shared} selected={value ?? selected} onSelect={selectionHandler(onSelect, onChange)} />
  );
});
DatePicker.displayName = "DatePicker";
export {DatePicker};
export type {DatePickerProps, DatePickerSingleProps, DatePickerRangeProps, DatePickerMultipleProps} from "./date-picker.types";
export type {DateRange} from "react-day-picker";
