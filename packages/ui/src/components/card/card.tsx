import {forwardRef, type ComponentProps} from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "cn";

import {
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
  type CardActionProps,
  type CardDescriptionProps,
  type CardHeaderProps,
  type CardTitleProps,
} from "./header";
import {CardContent, type CardContentProps} from "./content";
import {CardFooter, type CardFooterProps} from "./footer";

/**
 * Rixl Card — surface container for grouping related content.
 *
 * A bare `<Card>` is unchanged from the original port (surface + border +
 * `shadow-rixl-sm`). Additions are opt-in:
 *
 * - `variant` → `default` (elevated) · `outline` (flat, no shadow) · `ghost`
 *   (borderless, for nested/embedded cards).
 * - `interactive` → the clickable-card affordance the dashboard hand-rolls
 *   (`cursor-pointer` with no feedback today): border emphasis + shadow expansion
 *   on hover, a press that scales down using `--rixl-press-scale`, and a
 *   focus-visible ring. Only `scale`/`box-shadow`/`border-color` animate, and the
 *   scale is dropped under reduced motion. It styles only — the consumer still
 *   owns click/keyboard semantics (render as a button/link, or add
 *   `tabIndex`/`role`, for a11y).
 * - `selected` → a ring highlight for selection lists (plans, thumbnails).
 *
 * Motion follows the shared language: `duration-rixl-base ease-rixl-out`.
 */
export const cardVariants = cva(
  cn(
    "bg-rixl-surface text-rixl-fg flex flex-col gap-6 rounded-rixl-xl py-6",
    "transition-[scale,box-shadow,border-color] duration-rixl-base ease-rixl-out"
  ),
  {
    variants: {
      variant: {
        default: "border border-rixl-border shadow-rixl-sm",
        outline: "border border-rixl-border shadow-none",
        ghost: "border border-transparent shadow-none",
      },
      interactive: {
        true: cn(
          "cursor-pointer outline-none",
          "hover:border-rixl-border-strong hover:shadow-rixl-md",
          "active:scale-[var(--rixl-press-scale)] active:shadow-rixl-sm",
          "motion-reduce:active:scale-100",
          "focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]"
        ),
        false: "",
      },
      selected: {
        true: "border-rixl-ring ring-rixl-ring/50 ring-[3px]",
        false: "",
      },
    },
    defaultVariants: {variant: "default", interactive: false, selected: false},
  }
);

export type CardProps = ComponentProps<"div"> & VariantProps<typeof cardVariants>;

export const Card = forwardRef<HTMLDivElement, CardProps>(({className, variant, interactive, selected, ...props}, ref) => (
  <div
    ref={ref}
    data-slot="card"
    data-selected={selected || undefined}
    className={cn(cardVariants({variant, interactive, selected}), className)}
    {...props}
  />
));
Card.displayName = "Card";

export {
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
  type CardHeaderProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardActionProps,
  type CardContentProps,
  type CardFooterProps,
};
