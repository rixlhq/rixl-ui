import {forwardRef, useId, useState, type ComponentProps} from "react";
import {cn} from "../../lib/cn";
import {useTranslations} from "../locale/use-translations";
import type {ButtonProps} from "../button";
import {CopyButton, type CopyBlockTooltip} from "./copy-button";
import {DEFAULT_COPY_BLOCK_LABELS, type CopyBlockLabels} from "./copy-block-labels";
import {CopyBlockTitle, CopyBlockValue} from "./copy-block-value";
import {RevealButton} from "./reveal-button";
import {useCopyState} from "./use-copy-state";

export type {CopyBlockTooltip};

export type CopyBlockSize = "sm" | "base" | "lg";

/** `lg` keeps the original layout; the smaller sizes tighten the padding, the text and the buttons together. */
const SIZES: Record<CopyBlockSize, {surface: string; text: string; button: ButtonProps["size"]}> = {
  sm: {surface: "gap-1.5 p-1", text: "text-xs", button: "xs"},
  base: {surface: "gap-2 p-1.5", text: "text-sm", button: "xs"},
  lg: {surface: "gap-2 p-2", text: "text-sm", button: "sm"},
};

export type CopyBlockProps = Omit<ComponentProps<"div">, "title"> & {
  /** Visible name of the value; when set, it also describes the copy button. */
  title?: string;
  /** The value to show. Copied too, unless `textToCopy` is set. */
  text?: string;
  /** Copied instead of `text`, for a shown value that differs from what is worth copying. */
  textToCopy?: string;
  /** Shows bullets in place of `text` and children until the reveal button is pressed. Copying still works. */
  masked?: boolean;
  /** @default "lg" */
  size?: CopyBlockSize;
  /** Opt-in tooltip on the copy button. Without it, no tooltip renders. */
  tooltip?: CopyBlockTooltip;
  /** Names for the copy and reveal buttons and the copied status. Each defaults to the provider's string, then English. */
  labels?: Partial<CopyBlockLabels>;
};

export const CopyBlock = forwardRef<HTMLDivElement, CopyBlockProps>(
  ({title, text, textToCopy, masked = false, size = "lg", tooltip, labels, className, children, ...props}, ref) => {
    const copyValue = textToCopy ?? text;
    const {state, handleCopy} = useCopyState(copyValue);
    const t = useTranslations("copyBlock", DEFAULT_COPY_BLOCK_LABELS, labels);
    const titleId = useId();
    const [revealed, setRevealed] = useState(false);
    const copied = state === "copied";
    const {surface, text: textSize, button} = SIZES[size];
    const describedBy = title ? titleId : undefined;
    return (
      <div
        ref={ref}
        data-slot="copy-block"
        data-copied={copied || undefined}
        className={cn("flex min-w-0 items-center rounded-lg bg-rixl-bg", surface, className)}
        {...props}
      >
        <CopyBlockTitle id={titleId}>{title}</CopyBlockTitle>
        <CopyBlockValue text={text} textSize={textSize} masked={masked && !revealed}>
          {children}
        </CopyBlockValue>
        {masked && (
          <RevealButton
            revealed={revealed}
            size={button}
            label={revealed ? t.hideAction : t.revealAction}
            describedBy={describedBy}
            onToggle={() => setRevealed((value) => !value)}
          />
        )}
        <CopyButton
          state={state}
          size={button}
          disabled={!copyValue}
          labels={t}
          describedBy={describedBy}
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
