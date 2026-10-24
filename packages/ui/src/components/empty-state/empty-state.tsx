import {InfoIcon, PlusIcon, type LucideIcon} from "lucide-react";

import {Button} from "../button";

/**
 * Rixl EmptyState — placeholder for empty content, with an optional
 * primary action. Ported verbatim from dashboard; token-mapped.
 */
export function EmptyState({title, description, icon: Icon = InfoIcon, action}: EmptyStateProps) {
  if (action) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-rixl-lg">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-rixl-fg-muted mb-4">{description}</p>
        <Button onClick={action.onClick}>
          <PlusIcon className="h-4 w-4" />
          {action.label}
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center py-6 border border-dashed rounded-rixl-lg">
      <div className="flex items-center justify-center gap-2 text-rixl-fg-muted mb-1">
        <Icon className="h-4 w-4" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      <p className="text-xs text-rixl-fg-muted">{description}</p>
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
}
