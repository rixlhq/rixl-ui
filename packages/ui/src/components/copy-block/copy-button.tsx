import {Button} from "../button";
import {Tooltip, type TooltipProps} from "../tooltip";
import type {CopyBlockLabels} from "./copy-block-labels";
import {CopyIndicator} from "./copy-indicator";
import type {CopyState} from "./use-copy-state";

export type CopyBlockTooltip = {
  /** Shown on hover and focus. Defaults to the copy action's name. */
  text?: string;
  /** Shown after a successful copy. Defaults to `labels.copied`. */
  copiedText?: string;
  /** @default "top" */
  side?: TooltipProps["side"];
};

type CopyButtonProps = {
  state: CopyState;
  disabled: boolean;
  labels: CopyBlockLabels;
  /** Id of the visible title, which describes the button. */
  describedBy?: string;
  tooltip?: CopyBlockTooltip;
  onCopy: () => void;
};

/** The icon button of a `CopyBlock`; wrapped in a tooltip only when the app asks for one. */
export function CopyButton({state, disabled, labels, describedBy, tooltip, onCopy}: CopyButtonProps) {
  const copied = state === "copied";
  const buttonProps = {
    "data-slot": "copy-block-button",
    type: "button",
    variant: "ghost",
    shape: "square",
    size: "sm",
    "aria-label": labels.copyAction,
    "aria-describedby": describedBy,
    "data-copied": copied || undefined,
    disabled: disabled || state === "pending",
    "aria-busy": state === "pending" || undefined,
    onClick: onCopy,
  } as const;
  const indicator = <CopyIndicator copied={copied} />;
  if (!tooltip) return <Button {...buttonProps}>{indicator}</Button>;
  return (
    <Tooltip
      content={copied ? (tooltip.copiedText ?? labels.copied) : (tooltip.text ?? labels.copyAction)}
      side={tooltip.side}
      render={<Button {...buttonProps} />}
      onOpenChange={(_open, details) => {
        // Keep the tooltip open on click so it can show the copied text.
        if (details.reason === "trigger-press") details.cancel();
      }}
    >
      {indicator}
    </Tooltip>
  );
}
