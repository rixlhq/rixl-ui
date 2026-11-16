import {CheckIcon, CopyIcon} from "lucide-react";
import {useEffect, useRef, useState, type ReactNode} from "react";

import {copyToClipboard} from "../../lib/clipboard";
import {cn} from "cn";
import {Tooltip, TooltipContent, TooltipTrigger} from "../tooltip";

const COPY_FEEDBACK_MS = 1500;

function useCopyState(value?: string) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = () => {
    if (!value) return;
    void copyToClipboard(value);
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
  };

  return {copied, handleCopy};
}

function CopyIndicator({copied}: {copied: boolean}) {
  return (
    <div className="relative m-2 size-4 shrink-0">
      <CopyIcon
        data-slot="copy-icon"
        className={cn(
          "size-4 text-rixl-fg-muted transition-[scale,opacity,filter] duration-rixl-fast ease-rixl-out motion-reduce:transition-none",
          copied ? "scale-50 opacity-0 blur-[2px]" : "scale-100 opacity-100 blur-0"
        )}
      />
      <CheckIcon
        data-slot="check-icon"
        className={cn(
          "absolute inset-0 size-4 text-rixl-success transition-[scale,opacity,filter] duration-rixl-fast ease-rixl-out motion-reduce:transition-none",
          copied ? "scale-100 opacity-100 blur-0" : "scale-50 opacity-0 blur-[2px]"
        )}
      />
    </div>
  );
}

/**
 * Rixl CopyBlock — inline value with a copy button, morphing icon, and tooltip feedback.
 */
export function CopyBlock({title, value, tooltipText, className, children}: CopyBlockProps) {
  const {copied, handleCopy} = useCopyState(value);

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            data-slot="copy-block"
            data-copied={copied || undefined}
            className={cn(
              "flex items-center bg-rixl-bg rounded-rixl-lg cursor-pointer outline-none touch-manipulation",
              "hover:bg-rixl-surface-muted/50 active:scale-[var(--rixl-press-scale)] motion-reduce:active:scale-100",
              "focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]",
              "transition-[scale,background-color,box-shadow] duration-rixl-fast ease-rixl-out",
              className
            )}
            onClick={handleCopy}
          >
            <div className="flex-1 flex items-center min-w-0">
              <span className="text-xs font-medium px-2 text-rixl-fg-muted shrink-0">{title}:</span>
              <div className="flex-1 min-w-0 overflow-x-auto">
                {children || <p className="text-sm text-rixl-fg-muted font-mono p-2 whitespace-nowrap">{value}</p>}
              </div>
            </div>
            <CopyIndicator copied={copied} />
          </button>
        }
      />
      <TooltipContent>{copied ? "Copied!" : tooltipText || `Copy ${title}`}</TooltipContent>
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
