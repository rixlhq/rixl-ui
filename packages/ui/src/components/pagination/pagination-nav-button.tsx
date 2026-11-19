import {forwardRef, type ComponentProps} from "react";
import type {LucideIcon} from "lucide-react";
import {rtlFlip} from "../../lib/classes";
import {Button} from "../button";

export type PaginationNavButtonProps = Omit<ComponentProps<typeof Button>, "children"> & {
  target: number;
  setPage: (page: number) => void;
  Icon: LucideIcon;
};

export const PaginationNavButton = forwardRef<HTMLButtonElement, PaginationNavButtonProps>(function PaginationNavButton(
  {target, setPage, Icon, ...props},
  ref
) {
  return (
    <Button
      ref={ref}
      data-slot="pagination-nav-button"
      variant="outline"
      shape="square"
      className="min-h-11 min-w-11"
      onClick={() => setPage(target)}
      {...props}
    >
      <Icon className={rtlFlip} />
    </Button>
  );
});
PaginationNavButton.displayName = "PaginationNavButton";
