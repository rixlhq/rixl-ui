import {CopyIcon} from "lucide-react";
import type {ReactNode} from "react";

import {copyToClipboard} from "../../lib/clipboard";
import {cn} from "../../lib/cn";
import {Tooltip, TooltipContent, TooltipTrigger} from "../tooltip";

/**
 * Rixl CopyBlock — inline value with a copy button and tooltip feedback.
 * Ported verbatim from dashboard; the dashboard's paraglide default label
 * is replaced with a static "Copy <label>" fallback (no i18n layer in
 * rixl-ui yet).
 */
export function CopyBlock({title, value, tooltipText, className, children}: CopyBlockProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            className={cn(
              "flex items-center bg-rixl-bg rounded-rixl-lg cursor-pointer hover:bg-rixl-surface-muted/50 transition-colors",
              className
            )}
            onClick={() => value && copyToClipboard(value)}
          >
            <div className="flex-1 flex items-center min-w-0">
              <span className="text-xs font-medium px-2 text-rixl-fg-muted flex-shrink-0">{title}:</span>
              <div className="flex-1 min-w-0 overflow-x-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
                {children || <p className="text-sm text-rixl-fg-muted font-mono p-2 whitespace-nowrap">{value}</p>}
              </div>
            </div>
            <div className="p-2 flex-shrink-0">
              <CopyIcon className="h-4 w-4 text-rixl-fg-muted" />
            </div>
          </button>
        }
      />
      <TooltipContent>{tooltipText || `Copy ${title}`}</TooltipContent>
    </Tooltip>
  );
}

export interface CopyBlockProps {
  title: string;
  value?: string;
  tooltipText?: string;
  className?: string;
  children?: ReactNode;
}
