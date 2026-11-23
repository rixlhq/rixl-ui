import {forwardRef, type ReactNode, type Ref} from "react";
import {CheckboxGroup as CheckboxGroupPrimitive} from "@base-ui/react/checkbox-group";
import {ControlGroup} from "../label/control-group";
import {InCheckboxGroup} from "./checkbox-group-context";

/**
 * Rixl CheckboxGroup — a set of checkboxes that share one value.
 *
 * A fieldset that is the group, named by `legend`, with an optional `description`
 * and `error` linked to it. A `<Checkbox value="…" label="…" />` inside it is the item.
 */
const CheckboxGroup = forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(function CheckboxGroup(
  {legend, description, error, orientation, className, disabled, "aria-describedby": describedBy, children, ...props},
  ref
) {
  return (
    <InCheckboxGroup.Provider value>
      <ControlGroup
        slot="checkbox-group"
        legend={legend}
        description={description}
        error={error}
        orientation={orientation}
        disabled={disabled}
        describedBy={describedBy}
        className={className}
        group={
          <CheckboxGroupPrimitive
            // as: `render={<fieldset />}` makes the root a fieldset, which Base UI's `HTMLDivElement` ref type cannot know.
            ref={ref as Ref<HTMLDivElement>}
            render={<fieldset />}
            data-slot="checkbox-group"
            disabled={disabled}
            {...props}
          />
        }
      >
        {children}
      </ControlGroup>
    </InCheckboxGroup.Provider>
  );
});
CheckboxGroup.displayName = "CheckboxGroup";

export {CheckboxGroup};
export type CheckboxGroupProps = Omit<CheckboxGroupPrimitive.Props, "render" | "className"> & {
  className?: string;
  /** Names the group. A node, so it can be visually hidden with `sr-only`. */
  legend?: ReactNode;
  /** Helper text under the group, linked to it with `aria-describedby`. */
  description?: ReactNode;
  /** Error text under the group, linked to it with `aria-describedby`. */
  error?: ReactNode;
  /** `vertical` (default) stacks the items, `horizontal` wraps them in a row. */
  orientation?: "vertical" | "horizontal";
};
