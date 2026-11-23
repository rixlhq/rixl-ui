import type {ReactNode} from "react";
import {cn} from "../../lib/cn";

const MASK = "••••••••";

type CopyBlockValueProps = {
  text?: string;
  /** Replaces `text`. */
  children?: ReactNode;
  /** Text size class of the default line. */
  textSize: string;
  /** Shows bullets instead of `text` and children, so custom children cannot leak a masked value. */
  masked: boolean;
};

/** The scrolling area of a `CopyBlock`: its value, custom children, or bullets while masked. */
export function CopyBlockValue({text, children, textSize, masked}: CopyBlockValueProps) {
  const line = "whitespace-nowrap font-mono text-rixl-fg-muted";
  return (
    <div className="min-w-0 flex-1 overflow-x-auto">
      {masked ? (
        <p aria-hidden="true" className={cn(line, textSize)}>
          {MASK}
        </p>
      ) : (
        (children ?? <p className={cn(line, textSize)}>{text}</p>)
      )}
    </div>
  );
}

/** The visible name of a `CopyBlock`; renders nothing without one. */
export function CopyBlockTitle({id, children}: {id: string; children?: string}) {
  if (!children) return null;
  return (
    <span id={id} className="shrink-0 text-xs font-medium text-rixl-fg-muted">
      {children}:
    </span>
  );
}
