import * as React from "react";
import {DayPicker, getDefaultClassNames} from "react-day-picker";
import {cn} from "../../lib/cn";
import {captionClassNames} from "./date-picker-caption-class-names";
import {gridClassNames} from "./date-picker-grid-class-names";
import {animationClassNames} from "./date-picker-animation-class-names";
import {datePickerComponents} from "./date-picker-components";
import {datePickerLabels} from "./date-picker-labels";
import {DatePickerRootContext} from "./date-picker-root-context";

type DatePickerGridProps = React.ComponentProps<typeof DayPicker>;
const DatePickerGrid = React.forwardRef<HTMLDivElement, DatePickerGridProps>(
  (
    {
      className,
      classNames,
      numberOfMonths = 1,
      showOutsideDays = numberOfMonths === 1,
      captionLayout = "label",
      labels,
      components,
      ...props
    },
    ref
  ) => {
    const defaultClassNames = getDefaultClassNames();

    return (
      <DatePickerRootContext.Provider value={ref}>
        <DayPicker
          numberOfMonths={numberOfMonths}
          showOutsideDays={showOutsideDays}
          animate
          className={cn(
            "bg-rixl-bg group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
            className
          )}
          captionLayout={captionLayout}
          labels={{...datePickerLabels, ...labels}}
          classNames={{
            ...captionClassNames(defaultClassNames, captionLayout),
            ...gridClassNames(defaultClassNames),
            ...animationClassNames(),
            ...classNames,
          }}
          components={{
            ...datePickerComponents,
            ...components,
          }}
          {...props}
        />
      </DatePickerRootContext.Provider>
    );
  }
);
DatePickerGrid.displayName = "DatePickerGrid";
export {DatePickerGrid};
