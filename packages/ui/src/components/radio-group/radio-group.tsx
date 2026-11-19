import {forwardRef, type ReactNode, type Ref} from "react";
import {Radio as RadioPrimitive} from "@base-ui/react/radio";
import {RadioGroup as RadioGroupPrimitive} from "@base-ui/react/radio-group";
import {Circle} from "lucide-react";
import {cn} from "../../lib/cn";
import {indicatorPop, invalidRing, toggleControl} from "../../lib/classes";
import {useWarnUnnamedControl} from "../../lib/warn-missing-name";
import {ControlField} from "../label/control-field";
import {ControlGroup} from "../label/control-group";

/**
 * Rixl RadioGroup — single-selection group of radio inputs.
 *
 * Ported from dashboard's shadcn RadioGroup (Base UI Radio +
 * RadioGroup). Class names swapped to `--rixl-*` tokens; `dark:*`
 * variants dropped.
 *
 * Composition:
 * - `<RadioGroup legend="…">` — a fieldset that is the radiogroup, named by
 *   `legend`, with an optional `description` and `error`.
 * - `<RadioGroupItem value="…" label="…" />` — an individual radio; with a
 *   `label` it is named by it and the text is clickable.
 */
const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(function RadioGroup(
  {legend, description, error, orientation, className, disabled, "aria-describedby": describedBy, children, ...props},
  ref
) {
  return (
    <ControlGroup
      slot="radio-group"
      legend={legend}
      description={description}
      error={error}
      orientation={orientation}
      disabled={disabled}
      describedBy={describedBy}
      className={className}
      group={
        <RadioGroupPrimitive
          // as: `render={<fieldset />}` makes the root a fieldset, which Base UI's `HTMLDivElement` ref type cannot know.
          ref={ref as Ref<HTMLDivElement>}
          render={<fieldset />}
          data-slot="radio-group"
          aria-invalid={error ? true : undefined}
          disabled={disabled}
          {...props}
        />
      }
    >
      {children}
    </ControlGroup>
  );
});
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = forwardRef<HTMLElement, RadioGroupItemProps>(function RadioGroupItem(
  {className, label, controlFirst, variant, disabled, ...props},
  ref
) {
  useWarnUnnamedControl({component: "RadioGroupItem", label, ariaLabel: props["aria-label"], ariaLabelledBy: props["aria-labelledby"]});
  const control = (
    <RadioPrimitive.Root
      ref={ref}
      data-slot="radio-group-item"
      disabled={disabled}
      aria-invalid={variant === "error" ? true : undefined}
      className={cn(
        toggleControl,
        "text-rixl-primary flex justify-center aspect-square size-4 rounded-full",
        "data-unchecked:not-data-disabled:hover:border-rixl-border-strong data-checked:border-rixl-primary",
        invalidRing,
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator data-slot="radio-group-indicator" className={cn("flex items-center justify-center", indicatorPop)}>
        {/* A dot, not a ring: fill with no stroke, so it stays the size the dot was drawn at. */}
        <Circle strokeWidth={0} className="fill-rixl-primary size-2" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
  if (!label) return control;
  return (
    <ControlField component="RadioGroupItem" label={label} controlFirst={controlFirst} disabled={disabled} inGroup>
      {control}
    </ControlField>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export {RadioGroup, RadioGroupItem};
export type RadioGroupProps = Omit<RadioGroupPrimitive.Props, "render" | "className"> & {
  className?: string;
  /** Names the group. A node, so it can be visually hidden with `sr-only`. */
  legend?: ReactNode;
  /** Helper text under the group, linked to it with `aria-describedby`. */
  description?: ReactNode;
  /** Error text under the group, linked to it with `aria-describedby`; also marks the group `aria-invalid`. */
  error?: ReactNode;
  /** `vertical` (default) stacks the items, `horizontal` wraps them in a row. */
  orientation?: "vertical" | "horizontal";
};
export type RadioGroupItemProps = RadioPrimitive.Root.Props & {
  /** Visible label. Turns on the `Field` wrapper that names the radio and makes the text clickable. */
  label?: ReactNode;
  /** `true` (default) puts the control before the label text, `false` after it. */
  controlFirst?: boolean;
  /** `error` marks the radio `aria-invalid`, which draws the danger border. */
  variant?: "default" | "error";
};
