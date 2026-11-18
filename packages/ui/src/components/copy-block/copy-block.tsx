import {forwardRef, type ComponentProps} from "react";
import {cn} from "../../lib/cn";
import {Button} from "../button";
import {Tooltip, TooltipContent, TooltipTrigger} from "../tooltip";
import {CopyIndicator} from "./copy-indicator";
import {useCopyState} from "./use-copy-state";

export type CopyBlockProps = Omit<ComponentProps<"div">, "title"> & {
  title: string;
  value?: string;
  tooltipText?: string;
};
export const CopyBlock = forwardRef<HTMLDivElement, CopyBlockProps>(({title, value, tooltipText, className, children, ...props}, ref) => {
  const {state, handleCopy} = useCopyState(value);
  const copied = state === "copied";
  const message = {idle: "", pending: "Copying", copied: "Copied!", error: "Unable to copy. Try again."}[state];
  return (
    <div
      ref={ref}
      data-slot="copy-block"
      data-copied={copied || undefined}
      className={cn("flex min-w-0 items-center gap-2 rounded-rixl-lg bg-rixl-bg p-2", className)}
      {...props}
    >
      <span className="shrink-0 text-xs font-medium text-rixl-fg-muted">{title}:</span>
      <div className="min-w-0 flex-1 overflow-x-auto">
        {children ?? <p className="whitespace-nowrap font-mono text-sm text-rixl-fg-muted">{value}</p>}
      </div>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Copy ${title}`}
              data-copied={copied || undefined}
              disabled={!value || state === "pending"}
              aria-busy={state === "pending" || undefined}
              onClick={() => {
                void handleCopy();
              }}
            />
          }
        >
          <CopyIndicator copied={copied} />
        </TooltipTrigger>
        <TooltipContent>{message || tooltipText || `Copy ${title}`}</TooltipContent>
      </Tooltip>
      <output className="sr-only">{message}</output>
    </div>
  );
});
CopyBlock.displayName = "CopyBlock";
