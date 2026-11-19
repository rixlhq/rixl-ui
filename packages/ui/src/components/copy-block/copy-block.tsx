import {forwardRef, useId, type ComponentProps} from "react";
import {cn} from "../../lib/cn";
import {useTranslations} from "../locale/use-translations";
import {CopyButton, type CopyBlockTooltip} from "./copy-button";
import {DEFAULT_COPY_BLOCK_LABELS, type CopyBlockLabels} from "./copy-block-labels";
import {useCopyState} from "./use-copy-state";

export type {CopyBlockTooltip};

export type CopyBlockProps = Omit<ComponentProps<"div">, "title"> & {
  /** Visible name of the value; it also describes the copy button. */
  title: string;
  value?: string;
  /** Opt-in tooltip on the copy button. Without it, no tooltip renders. */
  tooltip?: CopyBlockTooltip;
  /** Names for the copy button and the copied status. Each defaults to the provider's string, then English. */
  labels?: Partial<CopyBlockLabels>;
};

export const CopyBlock = forwardRef<HTMLDivElement, CopyBlockProps>(
  ({title, value, tooltip, labels, className, children, ...props}, ref) => {
    const {state, handleCopy} = useCopyState(value);
    const t = useTranslations("copyBlock", DEFAULT_COPY_BLOCK_LABELS, labels);
    const titleId = useId();
    const copied = state === "copied";
    return (
      <div
        ref={ref}
        data-slot="copy-block"
        data-copied={copied || undefined}
        className={cn("flex min-w-0 items-center gap-2 rounded-lg bg-rixl-bg p-2", className)}
        {...props}
      >
        <span id={titleId} className="shrink-0 text-xs font-medium text-rixl-fg-muted">
          {title}:
        </span>
        <div className="min-w-0 flex-1 overflow-x-auto">
          {children ?? <p className="whitespace-nowrap font-mono text-sm text-rixl-fg-muted">{value}</p>}
        </div>
        <CopyButton
          state={state}
          disabled={!value}
          labels={t}
          describedBy={titleId}
          tooltip={tooltip}
          onCopy={() => {
            void handleCopy();
          }}
        />
        <output className="sr-only">{copied ? t.copied : ""}</output>
      </div>
    );
  }
);
CopyBlock.displayName = "CopyBlock";
