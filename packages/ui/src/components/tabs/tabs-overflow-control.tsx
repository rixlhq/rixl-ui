import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
import {cn} from "../../lib/cn";
import {rtlFlip} from "../../lib/classes";
import {Button} from "../button";
import type {TabsSize, TabsVariant} from "./context";

type TabsOverflowControlProps = {
  side: "start" | "end";
  visible: boolean;
  variant: TabsVariant;
  size: TabsSize;
  onClick: () => void;
};

function overflowPositionClasses(side: "start" | "end") {
  return side === "start"
    ? "start-0 justify-start bg-linear-to-r rtl:bg-linear-to-l"
    : "end-0 justify-end bg-linear-to-l rtl:bg-linear-to-r";
}

function overflowToneClasses(variant: TabsVariant, size: TabsSize) {
  if (variant === "segmented") return size === "sm" ? "w-7 rounded-rixl-lg!" : "w-9 rounded-rixl-lg!";
  return "w-8";
}

function overflowToneBackground(variant: TabsVariant) {
  return variant === "segmented"
    ? "from-rixl-surface-muted via-rixl-surface-muted/95 to-transparent"
    : "from-rixl-bg via-rixl-bg/95 to-transparent";
}

export function TabsOverflowControl({side, visible, variant, size, onClick}: TabsOverflowControlProps) {
  const isStart = side === "start";
  const Icon = isStart ? ChevronLeftIcon : ChevronRightIcon;
  return (
    <Button
      type="button"
      variant="ghost"
      data-slot="tabs-overflow-control"
      data-side={side}
      // A pointer-only affordance: arrowing between tabs already scrolls the focused tab into view.
      aria-hidden="true"
      tabIndex={-1}
      onClick={onClick}
      className={cn(
        "absolute inset-y-0 z-20 flex h-auto items-center border-0 p-0 transition-opacity duration-rixl-fast ease-rixl-out active:scale-100",
        overflowPositionClasses(side),
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        overflowToneBackground(variant),
        overflowToneClasses(variant, size)
      )}
    >
      <span
        className={cn(
          "text-rixl-fg-muted hover:text-rixl-fg flex items-center justify-center rounded-rixl-sm transition-colors duration-rixl-fast",
          size === "sm" ? "size-5" : "size-6",
          isStart ? "ms-1" : "me-1"
        )}
      >
        <Icon className={cn("size-3.5", rtlFlip)} aria-hidden="true" />
      </span>
    </Button>
  );
}
