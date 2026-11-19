import {forwardRef, type ReactNode} from "react";
import {Progress as ProgressPrimitive} from "@base-ui/react/progress";
import {cn} from "../../lib/cn";
import {useWarnMissingName} from "../../lib/warn-missing-name";

type ProgressHeaderProps = Pick<ProgressProps, "label" | "customValue"> & {showValue: boolean};

/** The row above the track: the label and the value text; nothing when the bar has neither. */
function ProgressHeader({label, showValue, customValue}: ProgressHeaderProps) {
  const hasValue = showValue || customValue !== undefined;
  if (label === undefined && !hasValue) return null;
  return (
    <div className="flex items-center justify-between gap-4">
      {label === undefined ? null : (
        <ProgressPrimitive.Label data-slot="progress-label" className="text-rixl-fg-muted text-xs">
          {label}
        </ProgressPrimitive.Label>
      )}
      {hasValue ? (
        <ProgressPrimitive.Value data-slot="progress-value" className="text-rixl-fg ms-auto text-sm font-medium tabular-nums">
          {customValue === undefined ? undefined : () => customValue}
        </ProgressPrimitive.Value>
      ) : null}
    </div>
  );
}

/**
 * Rixl Progress — a horizontal progress bar with an optional label and value,
 * shaped like Kumo's `Meter`.
 *
 * Value is a 0–100 number. `null` renders an indeterminate band that slides
 * across the track. `label` names the bar and shows above it; the value
 * shows next to a label unless `showValue={false}`, and `customValue`
 * replaces its text, whatever `showValue` says.
 */
const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {className, trackClassName, indicatorClassName, label, showValue = label !== undefined, customValue, value = 0, ...props},
  ref
) {
  useWarnMissingName(!label && !props["aria-label"] && !props["aria-labelledby"], {
    component: "Progress",
    subject: "The progress bar",
    fix: "Set label, aria-label or aria-labelledby: <Progress label='Storage used' value={65} />.",
  });
  return (
    <ProgressPrimitive.Root ref={ref} data-slot="progress" value={value} className={cn("flex w-full flex-col gap-2", className)} {...props}>
      <ProgressHeader label={label} showValue={showValue} customValue={customValue} />
      <ProgressPrimitive.Track
        data-slot="progress-track"
        className={cn("bg-rixl-primary/20 relative h-2 w-full overflow-hidden rounded-full", trackClassName)}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            "bg-rixl-primary h-full transition-[width,transform] duration-(--rixl-motion-base) ease-out motion-reduce:transition-none",
            // Base UI sets no width when the value is null; a narrower band that slides across tells it apart from 100%.
            // Reduced motion holds the band still in the middle so it doesn't read as a partial value.
            "data-indeterminate:w-1/3 rtl:[--rixl-progress-direction:-1]",
            "motion-safe:data-indeterminate:animate-rixl-progress-indeterminate motion-reduce:data-indeterminate:mx-auto",
            indicatorClassName
          )}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = "Progress";

export {Progress};
export type ProgressProps = Omit<ProgressPrimitive.Root.Props, "value" | "children"> & {
  value?: number | null;
  /** Names the bar and shows above it. */
  label?: ReactNode;
  /** Shows the value next to the label. @default true when `label` is set */
  showValue?: boolean;
  /** Text shown in place of the value, such as `750 / 1,000`. */
  customValue?: ReactNode;
  /** Classes for the track behind the indicator. */
  trackClassName?: string;
  /** Classes for the filled indicator. */
  indicatorClassName?: string;
};
