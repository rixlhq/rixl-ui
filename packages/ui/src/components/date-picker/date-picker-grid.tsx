import * as React from "react";
import {DayPicker, getDefaultClassNames} from "react-day-picker";
import {cn} from "../../lib/cn";
import type {Button} from "../button";
import {captionClassNames} from "./date-picker-caption-class-names";
import {gridClassNames} from "./date-picker-grid-class-names";
import {animationClassNames} from "./date-picker-animation-class-names";
import {datePickerComponents} from "./date-picker-components";
import {DatePickerRootContext} from "./date-picker-root-context";

type DatePickerGridProps = React.ComponentProps<typeof DayPicker> & {buttonVariant?: React.ComponentProps<typeof Button>["variant"]};
const DatePickerGrid = React.forwardRef<HTMLDivElement, DatePickerGridProps>(
  (
    {className, classNames, showOutsideDays = true, captionLayout = "label", buttonVariant = "ghost", formatters, components, ...props},
    ref
  ) => {
    const defaultClassNames = getDefaultClassNames();

    return (
      <DatePickerRootContext.Provider value={ref}>
        <DayPicker
          showOutsideDays={showOutsideDays}
          animate
          className={cn(
            "bg-rixl-bg group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
            "rtl:**:[.rdp-button\\_next>svg]:rotate-180",
            "rtl:**:[.rdp-button\\_previous>svg]:rotate-180",
            className
          )}
          captionLayout={captionLayout}
          formatters={formatters}
          classNames={{
            ...captionClassNames(defaultClassNames, buttonVariant, captionLayout),
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
