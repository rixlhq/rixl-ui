import {forwardRef, type ComponentProps, type ReactNode} from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "../../lib/cn";
import {CopyBlock} from "../copy-block";

const emptyVariants = cva("flex flex-col items-center justify-center rounded-lg border border-dashed border-rixl-border text-center", {
  variants: {size: {sm: "gap-2 p-4", base: "gap-3 p-8", lg: "gap-4 p-12"}},
  defaultVariants: {size: "base"},
});

export type EmptyProps = Omit<ComponentProps<"div">, "title"> &
  VariantProps<typeof emptyVariants> & {
    title: ReactNode;
    description?: ReactNode;
    /** Shell command shown in a copy block. */
    commandLine?: string;
    /** Decorative; nothing is rendered when omitted. */
    icon?: ReactNode;
    action?: ReactNode;
    /** Heading level of the title, so it fits the host page's outline. */
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  };
export const Empty = forwardRef<HTMLDivElement, EmptyProps>(
  ({title, description, icon, commandLine, action, children, size, headingLevel = 3, className, ...props}, ref) => {
    const Heading = `h${headingLevel}` as const;
    return (
      <div ref={ref} data-slot="empty" className={cn(emptyVariants({size}), className)} {...props}>
        {icon && (
          <div
            aria-hidden="true"
            className="flex size-10 items-center justify-center rounded-full bg-rixl-surface-muted text-rixl-fg-muted [&_svg]:size-5"
          >
            {icon}
          </div>
        )}
        <div className="min-w-0 max-w-sm space-y-1.5 wrap-anywhere">
          <Heading className="text-lg font-semibold tracking-tight text-rixl-fg">{title}</Heading>
          {description && <p className="text-sm text-balance text-rixl-fg-muted">{description}</p>}
        </div>
        {commandLine && <CopyBlock text={commandLine} className="w-full max-w-sm" />}
        {children}
        {action}
      </div>
    );
  }
);
Empty.displayName = "Empty";
