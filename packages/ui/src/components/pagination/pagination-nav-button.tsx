import {forwardRef, type ComponentProps} from "react";
import type {LucideIcon} from "lucide-react";
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
    <Button ref={ref} variant="outline" size="icon" className="min-h-11 min-w-11" onClick={() => setPage(target)} {...props}>
      <Icon className="rtl:-scale-x-100" />
    </Button>
  );
});
PaginationNavButton.displayName = "PaginationNavButton";
