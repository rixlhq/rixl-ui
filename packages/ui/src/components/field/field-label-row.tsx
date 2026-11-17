import type {ReactNode} from "react";
import {InfoIcon} from "lucide-react";
import {FieldLabel} from "./field-label";
import {Tooltip, TooltipContent, TooltipTrigger} from "../tooltip";

export function FieldLabelRow({label, required, labelTooltip}: {label: ReactNode; required: boolean | undefined; labelTooltip: ReactNode}) {
  return (
    <FieldLabel>
      <span className="inline-flex items-center gap-1.5">
        {label}
        {required === false ? <span className="font-normal text-rixl-fg-muted">(optional)</span> : null}
        {labelTooltip ? (
          <Tooltip>
            <TooltipTrigger
              aria-label="More information"
              className="inline-flex items-center text-rixl-fg-muted transition-colors duration-rixl-fast ease-rixl-out hover:text-rixl-fg [&_svg]:size-3.5"
            >
              <InfoIcon aria-hidden="true" />
            </TooltipTrigger>
            <TooltipContent>{labelTooltip}</TooltipContent>
          </Tooltip>
        ) : null}
      </span>
    </FieldLabel>
  );
}
