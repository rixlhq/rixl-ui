import {forwardRef, type ComponentProps, type ReactNode} from "react";
import {cn} from "../../lib/cn";
import {fieldLabel} from "../../lib/classes";
import {useWarnMissingName} from "../../lib/warn-missing-name";
import {useTranslations} from "../locale/use-translations";
import {LabelAddons} from "./label-addons";
import {DEFAULT_LABEL_LABELS} from "./label-labels";

/**
 * Rixl Label — the form-field label primitive.
 *
 * Renders a real `<label>`; consumers wire it to a control via `htmlFor` (or by
 * nesting a control). `showOptional` adds a muted "(optional)" and `tooltip` an
 * info trigger the app names with `tooltipAriaLabel`. Two contextual dim states
 * are supported without extra props:
 *
 * - Inside a `data-disabled="true"` ancestor with class `group`, dims
 *   via `group-data-[disabled=true]:*`.
 * - Adjacent to a `.peer` sibling that is disabled, dims via
 *   `peer-disabled:*`.
 */
const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({className, children, showOptional, optionalLabel, tooltip, tooltipAriaLabel, ...props}, ref) => {
    const t = useTranslations("label", DEFAULT_LABEL_LABELS);
    useWarnMissingName(Boolean(tooltip) && !tooltipAriaLabel, {
      component: "Label",
      subject: "The tooltip trigger",
      fix: "Set tooltipAriaLabel: <Label tooltip='…' tooltipAriaLabel='About this field' />.",
    });
    return (
      <label
        ref={ref}
        data-slot="label"
        className={cn(
          fieldLabel,
          "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <LabelAddons
          optional={showOptional ? (optionalLabel ?? t.optional) : undefined}
          tooltip={tooltip}
          tooltipAriaLabel={tooltipAriaLabel}
        />
      </label>
    );
  }
);
Label.displayName = "Label";

export {Label};
export type LabelProps = ComponentProps<"label"> & {
  /** Shows a muted "(optional)" after the label. */
  showOptional?: boolean;
  /** Replaces the "(optional)" text; defaults to the provider's `label.optional`. */
  optionalLabel?: ReactNode;
  /** Content of a tooltip opened from an info trigger after the label. */
  tooltip?: ReactNode;
  /** The accessible name of the tooltip trigger. The library invents none; without it `Label` warns in development. */
  tooltipAriaLabel?: string;
};
