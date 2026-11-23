import {useId, type ReactElement, type ReactNode} from "react";
import {Field} from "@base-ui/react/field";
import {Fieldset} from "@base-ui/react/fieldset";
import {cn} from "../../lib/cn";

type ControlGroupProps = {
  /** `data-slot` of the group; the items wrapper is `<slot>-items`. */
  slot: string;
  /** The Base UI group (`RadioGroup`, `CheckboxGroup`) rendered as a `<fieldset>`; the fieldset is the group. */
  group: ReactElement;
  legend?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
  /** The app's own `aria-describedby`, kept after the error and description ids. */
  describedBy?: string;
  className?: string;
  children: ReactNode;
};

/**
 * A fieldset around a group of toggle controls: a legend that names the group, the controls in a
 * vertical or horizontal list, and an error and a description linked to the group with
 * `aria-describedby`. The Base UI group is the fieldset itself, so there is no unnamed group
 * wrapped around a named fieldset.
 */
export function ControlGroup({
  slot,
  group,
  legend,
  description,
  error,
  orientation = "vertical",
  disabled,
  describedBy,
  className,
  children,
}: ControlGroupProps) {
  const errorId = useId();
  const descriptionId = useId();
  const ids = [error ? errorId : undefined, description ? descriptionId : undefined, describedBy].filter(Boolean).join(" ");
  return (
    // The Field.Root gives each item's Field.Item and Field.Label the context they need; it renders as the fieldset, which renders as the group.
    <Field.Root
      render={<Fieldset.Root render={group} disabled={disabled} aria-describedby={ids || undefined} />}
      disabled={disabled}
      className={cn("m-0 grid min-w-0 gap-3 border-0 p-0", className)}
    >
      {legend ? <Fieldset.Legend className="text-sm font-medium">{legend}</Fieldset.Legend> : null}
      <div
        data-slot={`${slot}-items`}
        data-orientation={orientation}
        className={cn("gap-3", orientation === "horizontal" ? "flex flex-row flex-wrap" : "grid")}
      >
        {children}
      </div>
      {error ? (
        <p id={errorId} data-slot={`${slot}-error`} className="text-sm leading-normal text-rixl-danger">
          {error}
        </p>
      ) : null}
      {description ? (
        <p id={descriptionId} data-slot={`${slot}-description`} className="text-sm leading-normal text-rixl-fg-muted">
          {description}
        </p>
      ) : null}
    </Field.Root>
  );
}
