import {forwardRef, type ComponentType} from "react";
import type {LucideIcon} from "lucide-react";
import {Button} from "../button";
import {Empty, type EmptyProps} from "../empty";

/** @deprecated Use Empty with caller-supplied action content. */
export type EmptyStateProps = Omit<EmptyProps, "action" | "icon"> & {
  icon?: LucideIcon | ComponentType<{className?: string}>;
  action?: {label: string; onClick: () => void};
};
/** @deprecated Use Empty. */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(({icon: Icon, action, ...props}, ref) => (
  <Empty
    ref={ref}
    data-slot="empty-state"
    icon={Icon ? <Icon /> : undefined}
    action={action && <Button onClick={action.onClick}>{action.label}</Button>}
    {...props}
  />
));
EmptyState.displayName = "EmptyState";
