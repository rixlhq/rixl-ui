import {createContext} from "react";

export type TabsVariant = "segmented" | "underline" | "ghost";
export type TabsSize = "sm" | "base";

export const TabsStyleContext = createContext<{
  variant: TabsVariant;
  size: TabsSize;
}>({
  variant: "segmented",
  size: "base",
});
