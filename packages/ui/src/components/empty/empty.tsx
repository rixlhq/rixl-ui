import {forwardRef, type ComponentProps, type ReactNode} from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "../../lib/cn";
import {CopyBlock} from "../copy-block";
import {useWarnMissingName} from "../../lib/warn-missing-name";

const emptyVariants = cva("flex flex-col items-center justify-center rounded-lg border border-dashed border-rixl-border text-center", {
  variants: {size: {sm: "gap-2 p-4", default: "gap-3 p-8", lg: "gap-4 p-12"}},
  defaultVariants: {size: "default"},
});
/** A command comes with the title the app gives its copy block, which also names the copy button. */
type EmptyCommand = {commandLine: string; commandTitle: string} | {commandLine?: undefined; commandTitle?: undefined};

export type EmptyProps = Omit<ComponentProps<"div">, "title"> &
  VariantProps<typeof emptyVariants> &
  EmptyCommand & {
    title: ReactNode;
    description?: ReactNode;
    /** Decorative; nothing is rendered when omitted. */
    icon?: ReactNode;
    action?: ReactNode;
    /** Heading level of the title, so it fits the host page's outline. */
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  };
export const Empty = forwardRef<HTMLDivElement, EmptyProps>(
  ({title, description, icon, commandLine, commandTitle, action, children, size, headingLevel = 3, className, ...props}, ref) => {
    useWarnMissingName(Boolean(commandLine) && !commandTitle, {
      component: "Empty",
      subject: "The command block",
      fix: "Set commandTitle: <Empty commandLine='npm create rixl' commandTitle='Install command' />.",
    });
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
        {commandLine && <CopyBlock title={commandTitle ?? ""} value={commandLine} className="w-full max-w-sm" />}
        {children}
        {action}
      </div>
    );
  }
);
Empty.displayName = "Empty";
