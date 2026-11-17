import type {ComponentProps} from "react";
import type {LucideIcon} from "lucide-react";
import {Button} from "../button";

export type PaginationNavButtonProps = Omit<ComponentProps<typeof Button>, "children"> & {
  target: number;
  onPageChange: (page: number) => void;
  Icon: LucideIcon;
};

export function PaginationNavButton({target, onPageChange, Icon, ...props}: PaginationNavButtonProps) {
  return (
    <Button variant="outline" size="icon" className="min-h-11 min-w-11" onClick={() => onPageChange(target)} {...props}>
      <Icon className="rtl:-scale-x-100" />
    </Button>
  );
}
