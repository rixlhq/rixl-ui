import {Menu as MenuPrimitive} from "@base-ui/react/menu";
import {cn} from "cn";

export type DropdownMenuContentProps = MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">;

export function DropdownMenuContent({
  className,
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: DropdownMenuContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "bg-rixl-surface text-rixl-fg z-50 max-h-(--available-height) min-w-[8rem] max-w-[calc(100dvw-2rem)] origin-(--transform-origin) overflow-x-hidden overflow-y-auto overscroll-contain rounded-rixl-md border-rixl-border border p-1 shadow-rixl-md outline-hidden",
            "transition-[scale,opacity] duration-rixl-fast ease-rixl-out motion-reduce:transition-none",
            "data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0",
            className
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}
