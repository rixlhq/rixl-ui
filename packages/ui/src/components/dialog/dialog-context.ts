import {createContext} from "react";
export type DialogRole = "dialog" | "alertdialog";
export const DialogRoleContext = createContext<DialogRole>("dialog");
