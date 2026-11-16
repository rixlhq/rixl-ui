import {createContext} from "react";

export type TabsVariant = "segmented" | "underline" | "ghost";
export type TabsSize = "sm" | "md";

export const TabsStyleContext = createContext<{
  variant: TabsVariant;
  size: TabsSize;
  fullWidth: boolean;
}>({
  variant: "segmented",
  size: "md",
  fullWidth: false,
});
