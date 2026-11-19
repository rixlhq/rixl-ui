import {forwardRef} from "react";
import {Menu as MenuPrimitive} from "@base-ui/react/menu";
import {cn} from "../../lib/cn";
import {nestedPopupSurface, popupSurface} from "../../lib/classes";

export type DropdownMenuContentProps = MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">;

type DropdownMenuPopupProps = DropdownMenuContentProps & {nested?: boolean};

/** The positioned popup shared by the menu and its sub-menus, which differ in the surface they draw. */
export const DropdownMenuPopup = forwardRef<HTMLDivElement, DropdownMenuPopupProps>(function DropdownMenuPopup(
  {className, nested, align = "start", alignOffset = 0, side = "bottom", sideOffset = 4, ...props},
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
          className={cn(nested ? nestedPopupSurface : popupSurface, "min-w-[8rem] p-1", className)}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
});
DropdownMenuPopup.displayName = "DropdownMenuPopup";

export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(function DropdownMenuContent(props, ref) {
  return <DropdownMenuPopup ref={ref} {...props} />;
});
DropdownMenuContent.displayName = "DropdownMenuContent";
