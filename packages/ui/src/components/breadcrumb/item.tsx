import {forwardRef, type ComponentProps} from "react";
import {mergeProps} from "@base-ui/react/merge-props";
import {useRender} from "@base-ui/react/use-render";
import {cn} from "../../lib/cn";
import {focusRingBorderless} from "../../lib/classes";

export type BreadcrumbItemProps = ComponentProps<"li">;
export type BreadcrumbLinkProps = useRender.ComponentProps<"a">;
export type BreadcrumbPageProps = ComponentProps<"span">;

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(({className, ...props}, ref) => (
  <li ref={ref} data-slot="breadcrumb-item" className={cn("inline-flex items-center gap-1.5", className)} {...props} />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(({className, render, ...props}, ref) =>
  useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "rounded-rixl-sm outline-none hover:text-rixl-fg transition-[color,box-shadow] duration-rixl-fast ease-rixl-out",
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

export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(({className, ...props}, ref) => (
  <span
    ref={ref}
    data-slot="breadcrumb-page"
    aria-disabled="true"
    aria-current="page"
    className={cn("text-rixl-fg font-normal", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";
