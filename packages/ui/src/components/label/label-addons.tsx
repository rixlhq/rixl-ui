import type {ReactNode} from "react";
import {InfoIcon} from "lucide-react";
import {Tooltip} from "../tooltip";

type LabelAddonsProps = {
  /** The text shown after the label, or nothing when `undefined`. */
  optional?: ReactNode;
  tooltip?: ReactNode;
  tooltipAriaLabel?: string;
};

/** What follows a label's text: the optional marker, then a tooltip trigger. The caller owns the missing-name warning, so it can name its own prop. */
export function LabelAddons({optional, tooltip, tooltipAriaLabel}: LabelAddonsProps) {
  return (
    <>
      {optional === undefined ? null : <span className="font-normal text-rixl-fg-muted">{optional}</span>}
      {tooltip ? (
        <Tooltip
          content={tooltip}
          render={<button type="button" aria-label={tooltipAriaLabel} />}
          className="inline-flex items-center text-rixl-fg-muted transition-colors duration-(--rixl-motion-fast) ease-out hover:text-rixl-fg [&_svg]:size-3.5"
        >
          <InfoIcon aria-hidden="true" />
        </Tooltip>
      ) : null}
    </>
  );
}
