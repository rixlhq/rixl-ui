import {CheckIcon, CopyIcon} from "lucide-react";
import {cn} from "../../lib/cn";

export function CopyIndicator({copied}: {copied: boolean}) {
  return (
    <span className="relative size-4 shrink-0" aria-hidden="true">
      <CopyIcon
        data-slot="copy-icon"
        className={cn(
          "size-4 text-rixl-fg-muted transition-[scale,opacity,filter] duration-(--rixl-motion-fast) ease-out motion-reduce:transition-none",
          copied ? "scale-50 opacity-0 blur-[2px]" : "scale-100 opacity-100 blur-0"
        )}
      />
      <CheckIcon
        data-slot="check-icon"
        className={cn(
          "absolute inset-0 size-4 text-rixl-success transition-[scale,opacity,filter] duration-(--rixl-motion-fast) ease-out motion-reduce:transition-none",
          copied ? "scale-100 opacity-100 blur-0" : "scale-50 opacity-0 blur-[2px]"
        )}
      />
    </span>
  );
}
