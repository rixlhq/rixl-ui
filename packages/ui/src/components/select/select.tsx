import {Children, isValidElement, useMemo, type ReactNode} from "react";
import {Select as SelectPrimitive} from "@base-ui/react/select";

import {
  SelectContent,
  SelectScrollDownButton,
  SelectScrollUpButton,
  type SelectContentProps,
  type SelectScrollDownButtonProps,
  type SelectScrollUpButtonProps,
} from "./content";
import {
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  type SelectGroupProps,
  type SelectItemProps,
  type SelectLabelProps,
  type SelectSeparatorProps,
} from "./item";
import {SelectTrigger, SelectValue, selectTriggerVariants, type SelectTriggerProps, type SelectValueProps} from "./trigger";

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

export type SelectProps<Value = string> = Omit<SelectPrimitive.Root.Props<Value>, "onValueChange"> & {
  // Our selects are not clearable, so the emitted value is never null.
  onValueChange?: (value: Value) => void;
};

export function Select<Value = string>({onValueChange, items, children, ...props}: SelectProps<Value>) {
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

export {
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
  type SelectContentProps,
  type SelectGroupProps,
  type SelectItemProps,
  type SelectLabelProps,
  type SelectScrollDownButtonProps,
  type SelectScrollUpButtonProps,
  type SelectSeparatorProps,
  type SelectTriggerProps,
  type SelectValueProps,
};
