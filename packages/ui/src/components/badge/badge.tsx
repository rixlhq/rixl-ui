import {mergeProps} from "@base-ui-components/react/merge-props";
import {useRender} from "@base-ui-components/react/use-render";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "cn";

/**
 * Rixl Badge — a compact status / count label.
 *
 * Ported from dashboard's shadcn Badge. Uses Base UI's `useRender`
 * hook so the badge can be rendered as any element (default `<span>`;
 * pass `render={<a href=".."/>}` for interactive badges).
 *
 * Class names swapped to `--rixl-*` tokens; dark:* variants dropped
 * (rixl handles dark via `[data-theme="dark"]`).
 */
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-rixl-md border px-2 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none outline-rixl-ring/50 focus-visible:ring-4 focus-visible:ring-rixl-ring/40 focus-visible:outline-1 aria-invalid:focus-visible:ring-0 transition-[color,box-shadow]",
  {
    variants: {
      variant: {
        default: "border-transparent bg-rixl-primary text-rixl-primary-fg shadow-rixl-sm [a&]:hover:bg-rixl-primary-hover",
        secondary: "border-transparent bg-rixl-secondary text-rixl-secondary-fg [a&]:hover:bg-rixl-secondary-hover",
        destructive: "border-transparent bg-rixl-danger text-rixl-danger-fg shadow-rixl-sm [a&]:hover:bg-rixl-danger-hover",
        outline: "text-rixl-fg [a&]:hover:bg-rixl-surface-muted [a&]:hover:text-rixl-fg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({className, variant = "default", render, ...props}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">({className: cn(badgeVariants({variant}), className)}, props),
    render,
    state: {slot: "badge", variant},
  });
}

export {Badge, badgeVariants};
export type BadgeProps = useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>;
