import {forwardRef, type ComponentProps} from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "cn";

/**
 * Rixl Card — surface container for grouping related content.
 *
 * A bare `<Card>` is unchanged from the original port (surface + border +
 * `shadow-rixl-sm`). Additions are opt-in:
 *
 * - `variant` → `default` (elevated) · `outline` (flat, no shadow) · `ghost`
 *   (borderless, for nested/embedded cards).
 * - `interactive` → the clickable-card affordance the dashboard hand-rolls
 *   (`cursor-pointer` with no feedback today): a subtle lift + shadow expansion
 *   on hover, a press that settles back down, and a focus-visible ring. Only
 *   `transform`/`box-shadow` animate, and the movement is dropped under reduced
 *   motion. It styles only — the consumer still owns click/keyboard semantics
 *   (render as a button/link, or add `tabIndex`/`role`, for a11y).
 * - `selected` → a ring highlight for selection lists (plans, thumbnails).
 *
 * Motion follows the shared language: `duration-rixl-base ease-rixl-out`.
 */
const cardVariants = cva(
  cn(
    "bg-rixl-surface text-rixl-fg flex flex-col gap-6 rounded-rixl-xl py-6",
    "transition-[transform,box-shadow,border-color] duration-rixl-base ease-rixl-out"
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
          "hover:-translate-y-0.5 hover:shadow-rixl-md",
          "active:translate-y-0 active:scale-[var(--rixl-press-scale)] active:shadow-rixl-sm",
          "motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
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

const Card = forwardRef<HTMLDivElement, CardProps>(({className, variant, interactive, selected, ...props}, ref) => (
  <div
    ref={ref}
    data-slot="card"
    data-selected={selected || undefined}
    className={cn(cardVariants({variant, interactive, selected}), className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, ComponentProps<"div">>(({className, ...props}, ref) => (
  <div
    ref={ref}
    data-slot="card-header"
    className={cn(
      "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLDivElement, ComponentProps<"div">>(({className, ...props}, ref) => (
  <div ref={ref} data-slot="card-title" className={cn("leading-none font-semibold", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLDivElement, ComponentProps<"div">>(({className, ...props}, ref) => (
  <div ref={ref} data-slot="card-description" className={cn("text-rixl-fg-muted text-sm", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardAction = forwardRef<HTMLDivElement, ComponentProps<"div">>(({className, ...props}, ref) => (
  <div
    ref={ref}
    data-slot="card-action"
    className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
    {...props}
  />
));
CardAction.displayName = "CardAction";

const CardContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(({className, ...props}, ref) => (
  <div ref={ref} data-slot="card-content" className={cn("px-6", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, ComponentProps<"div">>(({className, ...props}, ref) => (
  <div ref={ref} data-slot="card-footer" className={cn("flex items-center px-6 [.border-t]:pt-6", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export type CardHeaderProps = ComponentProps<"div">;
export type CardTitleProps = ComponentProps<"div">;
export type CardDescriptionProps = ComponentProps<"div">;
export type CardActionProps = ComponentProps<"div">;
export type CardContentProps = ComponentProps<"div">;
export type CardFooterProps = ComponentProps<"div">;

export {Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent, cardVariants};
