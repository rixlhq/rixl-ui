import {InfoIcon, PlusIcon, type LucideIcon} from "lucide-react";
import {cn} from "cn";
import {Button} from "../button";

/**
 * Rixl EmptyState — placeholder for empty content, with an optional
 * primary action.
 */
export function EmptyState({title, description, icon: Icon = InfoIcon, action, className}: EmptyStateProps) {
  if (action) {
    return (
      <div
        data-slot="empty-state"
        className={cn(
          "flex flex-col items-center justify-center rounded-rixl-lg border border-dashed border-rixl-border p-8 text-center",
          className
        )}
      >
        <div className="bg-rixl-surface-muted text-rixl-fg-muted mb-3 flex size-10 items-center justify-center rounded-full">
          <Icon className="size-5" />
        </div>
        <h3 className="text-rixl-fg mb-1.5 text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-rixl-fg-muted mb-5 max-w-sm text-sm text-balance">{description}</p>
        <Button onClick={action.onClick}>
          <PlusIcon className="size-4" />
          {action.label}
        </Button>
      </div>
    );
  }

  return (
    <div data-slot="empty-state" className={cn("rounded-rixl-lg border border-dashed border-rixl-border py-6 text-center", className)}>
      <div className="text-rixl-fg-muted mb-1 flex items-center justify-center gap-2">
        <Icon className="size-4" />
        <span className="text-rixl-fg text-sm font-medium">{title}</span>
      </div>
      <p className="text-rixl-fg-muted text-xs text-balance">{description}</p>
    </div>
  );
}

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon | React.ComponentType<{className?: string}>;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}
