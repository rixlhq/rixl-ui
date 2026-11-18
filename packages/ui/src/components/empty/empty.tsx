import {forwardRef, type ComponentProps, type ReactNode} from "react";
import {InfoIcon} from "lucide-react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "../../lib/cn";

const emptyVariants = cva("flex flex-col items-center justify-center rounded-rixl-lg border border-dashed border-rixl-border text-center", {
  variants: {size: {default: "gap-3 p-8", compact: "gap-2 p-4"}},
  defaultVariants: {size: "default"},
});
export type EmptyProps = Omit<ComponentProps<"div">, "title"> &
  VariantProps<typeof emptyVariants> & {
    title: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    action?: ReactNode;
  };
export const Empty = forwardRef<HTMLDivElement, EmptyProps>(
  ({title, description, icon, action, children, size, className, ...props}, ref) => (
    <div ref={ref} data-slot="empty" className={cn(emptyVariants({size}), className)} {...props}>
      <div
        aria-hidden="true"
        className="flex size-10 items-center justify-center rounded-full bg-rixl-surface-muted text-rixl-fg-muted [&_svg]:size-5"
      >
        {icon ?? <InfoIcon />}
      </div>
      <div className="min-w-0 max-w-sm space-y-1.5 wrap-anywhere">
        <h3 className="text-lg font-semibold tracking-tight text-rixl-fg">{title}</h3>
        {description && <p className="text-sm text-balance text-rixl-fg-muted">{description}</p>}
      </div>
      {children}
      {action}
    </div>
  )
);
Empty.displayName = "Empty";
