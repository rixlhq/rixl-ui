import type {ComponentProps} from "react";
import {mergeProps} from "@base-ui/react/merge-props";
import {useRender} from "@base-ui/react/use-render";
import {cn} from "../../lib/cn";

export type BreadcrumbItemProps = ComponentProps<"li">;
export type BreadcrumbLinkProps = useRender.ComponentProps<"a">;
export type BreadcrumbPageProps = ComponentProps<"span">;

export function BreadcrumbItem({className, ...props}: BreadcrumbItemProps) {
  return <li data-slot="breadcrumb-item" className={cn("inline-flex items-center gap-1.5", className)} {...props} />;
}

export function BreadcrumbLink({className, render, ...props}: BreadcrumbLinkProps) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn("hover:text-rixl-fg transition-colors duration-rixl-fast ease-rixl-out", className),
      },
      props
    ),
    render,
    state: {slot: "breadcrumb-link"},
  });
}

export function BreadcrumbPage({className, ...props}: BreadcrumbPageProps) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-rixl-fg font-normal", className)}
      {...props}
    />
  );
}
