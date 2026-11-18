import type {DateRange, PropsBase, PropsMulti, PropsRange, PropsSingle} from "react-day-picker";

/**
 * Everything react-day-picker's `PropsBase` takes, except the selection props:
 * `mode` is set per variant, and `required` would change the `onChange`
 * signature, which Kumo's DatePicker does not expose.
 */
type DatePickerBaseProps = Omit<PropsBase, "mode" | "required">;

export type DatePickerSingleProps = DatePickerBaseProps & {
  mode: "single";
  selected?: PropsSingle["selected"];
  onChange?: (date: Date | undefined) => void;
};

export type DatePickerRangeProps = DatePickerBaseProps &
  Pick<PropsRange, "min" | "max" | "excludeDisabled" | "resetOnSelect"> & {
    mode: "range";
    selected?: DateRange;
    onChange?: (range: DateRange | undefined) => void;
  };

export type DatePickerMultipleProps = DatePickerBaseProps &
  Pick<PropsMulti, "min" | "max"> & {
    mode: "multiple";
    selected?: Date[];
    onChange?: (dates: Date[] | undefined) => void;
  };

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps | DatePickerMultipleProps;
