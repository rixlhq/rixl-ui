import type {ReactNode} from "react";
import {PaginationPageSize} from "./pagination-page-size";

export type PaginationLimitNodeProps = {
  showLimitSelector?: boolean;
  renderLimitSelector?: ReactNode;
  limit?: number;
  setLimit?: (limit: number) => void;
  limitOptions: number[];
  limitLabel: string;
};

export function PaginationLimitNode({
  showLimitSelector,
  renderLimitSelector,
  limit,
  setLimit,
  limitOptions,
  limitLabel,
}: PaginationLimitNodeProps) {
  if (renderLimitSelector) return <>{renderLimitSelector}</>;
  const showLimit = showLimitSelector ?? (limit !== undefined && setLimit !== undefined);
  if (!showLimit || limit === undefined || setLimit === undefined) return null;
  return <PaginationPageSize value={limit} onPageSizeChange={setLimit} options={limitOptions} label={limitLabel} />;
}
