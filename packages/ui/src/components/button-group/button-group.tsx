import {forwardRef, type ComponentProps} from "react";
import {cn} from "../../lib/cn";

/**
 * Rixl ButtonGroup — joins a small set of tightly-coupled buttons into a
 * single control, most commonly a split button: a primary action next to a
 * dropdown trigger for related, secondary actions.
 *
 * A layout wrapper only: children keep their own `variant` and `size`, the
 * group flattens the inner corners and overlaps borders so the buttons share
 * a single seam. Renders `role="group"` so assistive technology treats the
 * buttons as a related set — pair it with an `aria-label`.
 *
 * Grouping multiple independent buttons or inputs (e.g. a formatting bar)
 * needs roaming-focus keyboard semantics this group intentionally does not
 * provide.
 */
export type ButtonGroupProps = Omit<ComponentProps<"div">, "role">;

const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(({className, children, ...props}, ref) => (
  <div
    ref={ref}
    // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- a split button is not a form section: no suggested tag applies, and group is the APG pattern
    role="group"
    data-slot="button-group"
    className={cn(
      // `isolate` keeps child z-index changes contained; `w-max` shrinks the
      // group to its content so it doesn't stretch across its container.
      "relative isolate inline-flex w-max flex-row",
      // Every child gets a stacking context so a keyboard-focused control can
      // lift above the adjacent seam, including tooltip-wrapped buttons.
      "[&>*]:relative [&>*:focus-visible]:z-10 [&>*:has(:focus-visible)]:z-10",
      // Each Button carries its own `shadow-rixl-xs`. Inside a group those
      // shadows overlap at the seams and make the middle button look elevated.
      // Drop them so the group reads as one control.
      "[&>*>:is(button,a)]:shadow-none [&>:is(button,a)]:shadow-none",
      // A press must never move the seam: shrinking one segment would tug the
      // shared edge and read as the whole control reacting, so children stay
      // at full scale and the press reads as a colour change on that segment
      // alone (the wrapped selector covers tooltip-wrapped buttons).
      "[&>:is(button,a)]:active:scale-100",
      "[&>*>:is(button,a)]:active:scale-100",
      // Join by child position rather than element type so mixed Button and
      // anchor groups keep the correct outer corners. The one-level descendant
      // selectors support wrapped triggers (e.g. a tooltip around a Button).
      "[&>*:not(:first-child):is(button,a)]:rounded-s-none",
      "[&>*:is(button,a):has(~_:is(button,a))]:rounded-e-none",
      "[&>*:not(:first-child)>:is(button,a)]:rounded-s-none",
      "[&>*:not(:last-child)>:is(button,a)]:rounded-e-none",
      // Overlap borders/rings by 1px so adjacent buttons share a single seam
      // instead of doubling up. Logical utility supports RTL.
      "[&>*:not(:first-child)]:-ms-px",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
ButtonGroup.displayName = "ButtonGroup";

export {ButtonGroup};
