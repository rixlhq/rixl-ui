import {forwardRef} from "react";
import {Menu as MenuPrimitive} from "@base-ui/react/menu";
import {cn} from "../../lib/cn";
import {popupSurface} from "../../lib/classes";

export type DropdownMenuContentProps = MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">;

export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(function DropdownMenuContent(
  {className, align = "start", alignOffset = 0, side = "bottom", sideOffset = 4, ...props},
  ref
) {
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
          ref={ref}
          data-slot="dropdown-menu-content"
          className={cn(popupSurface, "min-w-[8rem] p-1", className)}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
});
DropdownMenuContent.displayName = "DropdownMenuContent";
