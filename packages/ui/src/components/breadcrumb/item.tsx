import {forwardRef, type ComponentProps, type ReactNode} from "react";
import {mergeProps} from "@base-ui/react/merge-props";
import {useRender} from "@base-ui/react/use-render";
import {cn} from "../../lib/cn";
import {focusRingBorderless} from "../../lib/classes";
import {skeletonVariants} from "../skeleton";

export type BreadcrumbItemProps = ComponentProps<"li">;
type BreadcrumbIconProp = {
  /** Decorative; shown before the text. */
  icon?: ReactNode;
};

export type BreadcrumbLinkProps = useRender.ComponentProps<"a"> & BreadcrumbIconProp;
export type BreadcrumbPageProps = ComponentProps<"span"> &
  BreadcrumbIconProp & {
    /** Replaces the text with a placeholder while the page title loads; the page is then not marked `aria-current`. */
    loading?: boolean;
  };

const iconRow = "inline-flex items-center gap-1";

function BreadcrumbIcon({children}: {children: ReactNode}) {
  return (
    <span data-slot="breadcrumb-icon" aria-hidden="true" className="flex shrink-0 items-center [&_svg:not([class*='size-'])]:size-4">
      {children}
    </span>
  );
}

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(({className, ...props}, ref) => (
  <li ref={ref} data-slot="breadcrumb-item" className={cn("inline-flex items-center gap-1.5", className)} {...props} />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(({className, render, icon, children, ...props}, ref) =>
  useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        children: icon ? (
          <>
            <BreadcrumbIcon>{icon}</BreadcrumbIcon>
            {children}
          </>
        ) : (
          children
        ),
        className: cn(
          icon && iconRow,
          "rounded-sm outline-none hover:text-rixl-fg transition-[color,box-shadow] duration-(--rixl-motion-fast) ease-out",
          focusRingBorderless,
          className
        ),
      },
      props
    ),
    ref,
    render,
    state: {slot: "breadcrumb-link"},
  })
);
BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(({className, icon, loading, children, ...props}, ref) => (
  <span
    ref={ref}
    data-slot="breadcrumb-page"
    aria-disabled="true"
    aria-current={loading ? undefined : "page"}
    aria-busy={loading || undefined}
    className={cn("text-rixl-fg font-normal", (icon || loading) && iconRow, className)}
    {...props}
  >
    {icon && <BreadcrumbIcon>{icon}</BreadcrumbIcon>}
    {loading ? (
      <span data-slot="breadcrumb-skeleton" aria-hidden="true" className={cn(skeletonVariants(), "inline-block h-4 w-32")} />
    ) : (
      children
    )}
  </span>
));
BreadcrumbPage.displayName = "BreadcrumbPage";
