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

/** Passive surface. Actions and their semantics belong to its children. */
export const cardVariants = cva(cn("bg-rixl-surface text-rixl-fg flex flex-col gap-6 rounded-rixl-xl py-6", ""), {
  variants: {
    variant: {
      default: "border border-rixl-border shadow-rixl-sm",
      outline: "border border-rixl-border shadow-none",
      ghost: "border border-transparent shadow-none",
    },
    interactive: {true: "", false: ""},
    selected: {
      true: "border-rixl-ring ring-rixl-ring/50 ring-[3px]",
      false: "",
    },
  },
  defaultVariants: {variant: "default", interactive: false, selected: false},
});

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
