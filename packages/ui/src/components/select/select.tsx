import {Children, isValidElement, useMemo, type ComponentProps, type ReactNode} from "react";
import {Select as SelectPrimitive} from "@base-ui/react/select";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "cn";

/**
 * Rixl Select — an accessible, portalled select composition.
 *
 * Ported from dashboard's shadcn Select (Base UI Select). Lucide
 * icons (CheckIcon, ChevronUpIcon, ChevronDownIcon) inlined as local
 * SVGs so `@rixl/ui` stays icon-dep-free. Class names swapped to
 * `--rixl-*` tokens; `dark:*` variants dropped.
 *
 * Composition:
 * - `<Select>` — the root; auto-derives an `items` map from `<SelectItem>` children so preset values render with their label when the popup is unmounted.
 * - `<SelectTrigger>` — the trigger button; `size="sm" | "default"`.
 * - `<SelectValue>` — placeholder + selected label.
 * - `<SelectContent>` — the popup, portalled; positioning props (side/align/offset) are pass-through.
 * - `<SelectItem value="…">` — an option row with a checkmark indicator.
 * - `<SelectGroup>` + `<SelectLabel>` — grouping and section headings.
 * - `<SelectSeparator>` — divider between groups.
 */

function collectSelectItems(children: ReactNode, map: Record<string, ReactNode>) {
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const childProps = child.props as {value?: string; children?: ReactNode};
    if (child.type === SelectItem && childProps.value != null) {
      map[childProps.value] = childProps.children;
    } else if (childProps.children) {
      collectSelectItems(childProps.children, map);
    }
  });
}

function Select<Value = string>({
  onValueChange,
  items,
  children,
  ...props
}: Omit<SelectPrimitive.Root.Props<Value>, "onValueChange"> & {
  // Our selects are not clearable, so the emitted value is never null.
  onValueChange?: (value: Value) => void;
}) {
  // Base UI resolves the trigger label from `items` when the popup is unmounted,
  // so derive it from the SelectItem children to keep preset values showing their label.
  const resolvedItems = useMemo(() => {
    if (items) return items;
    const map: Record<string, ReactNode> = {};
    collectSelectItems(children, map);
    return map;
  }, [items, children]);

  return (
    <SelectPrimitive.Root
      items={resolvedItems}
      onValueChange={onValueChange as SelectPrimitive.Root.Props<Value>["onValueChange"]}
      {...props}
    >
      {children}
    </SelectPrimitive.Root>
  );
}

function SelectGroup({...props}: SelectPrimitive.Group.Props) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({...props}: SelectPrimitive.Value.Props) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

const selectTriggerVariants = cva(
  cn(
    "border-rixl-border data-[placeholder]:text-rixl-fg-muted [&_svg:not([class*='text-'])]:text-rixl-fg-muted",
    "flex w-fit items-center justify-between gap-2 rounded-rixl-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-rixl-xs outline-none",
    "transition-[color,box-shadow,border-color] duration-rixl-fast ease-rixl-out",
    // Hover strengthens the border; opening the popup keeps it emphasised.
    "enabled:hover:border-rixl-border-strong data-[popup-open]:border-rixl-border-strong",
    "focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-rixl-danger/20 aria-invalid:border-rixl-danger",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  ),
  {
    variants: {size: {default: "h-9", sm: "h-8"}},
    defaultVariants: {size: "default"},
  }
);

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & VariantProps<typeof selectTriggerVariants>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(selectTriggerVariants({size}), className)}
      {...props}
    >
      {children}
      {/* Chevron flips when the popup is open (ancestor carries data-popup-open). */}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="size-4 opacity-50 transition-transform duration-rixl-fast ease-rixl-out [[data-popup-open]_&]:rotate-180" />
        }
      />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<SelectPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger">) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "bg-rixl-surface text-rixl-fg data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 relative z-50 max-h-(--available-height) min-w-[8rem] origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-rixl-md border border-rixl-border shadow-rixl-md",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List className="p-1">{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({className, ...props}: ComponentProps<"div">) {
  return <div data-slot="select-label" className={cn("text-rixl-fg-muted px-2 py-1.5 text-xs", className)} {...props} />;
}

function SelectItem({className, children, ...props}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        // Base UI highlights the active option via data-highlighted (keyboard and
        // pointer) — not :focus — so drive the highlight from that. Selected rows
        // get a touch more weight on top of the checkmark.
        "data-highlighted:bg-rixl-surface-muted data-highlighted:text-rixl-fg data-selected:font-medium transition-colors duration-rixl-fast ease-rixl-out [&_svg:not([class*='text-'])]:text-rixl-fg-muted relative flex w-full cursor-pointer items-center gap-2 rounded-rixl-sm py-1.5 pe-8 ps-2 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute end-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({className, ...props}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-rixl-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({className, ...props}: ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({className, ...props}: ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownArrow>
  );
}

// ── Inlined icons (lucide-react equivalents; keep @rixl/ui icon-dep-free) ──

function ChevronDownIcon({className}: {className?: string}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronUpIcon({className}: {className?: string}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

function CheckIcon({className}: {className?: string}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectTriggerVariants,
};
