import * as React from "react";

import {cn} from "cnfast";

/**
 * Rixl Card — surface container for grouping related content.
 * Ported verbatim from dashboard; token-mapped to rixl tokens
 * (bg-rixl-surface / text-rixl-fg stand in for card colors).
 */
function Card({className, ...props}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn("bg-rixl-surface text-rixl-fg flex flex-col gap-6 rounded-rixl-xl border py-6 shadow-rixl-sm", className)}
      {...props}
    />
  );
}

function CardHeader({className, ...props}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({className, ...props}: React.ComponentProps<"div">) {
  return <div data-slot="card-title" className={cn("leading-none font-semibold", className)} {...props} />;
}

function CardDescription({className, ...props}: React.ComponentProps<"div">) {
  return <div data-slot="card-description" className={cn("text-rixl-fg-muted text-sm", className)} {...props} />;
}

function CardAction({className, ...props}: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-action" className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)} {...props} />
  );
}

function CardContent({className, ...props}: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />;
}

function CardFooter({className, ...props}: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex items-center px-6 [.border-t]:pt-6", className)} {...props} />;
}

export type CardProps = React.ComponentProps<"div">;
export type CardHeaderProps = React.ComponentProps<"div">;
export type CardTitleProps = React.ComponentProps<"div">;
export type CardDescriptionProps = React.ComponentProps<"div">;
export type CardActionProps = React.ComponentProps<"div">;
export type CardContentProps = React.ComponentProps<"div">;
export type CardFooterProps = React.ComponentProps<"div">;

export {Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent};
