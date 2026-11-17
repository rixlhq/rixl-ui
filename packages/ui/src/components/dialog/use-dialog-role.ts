import {useContext} from "react";
import {DialogRoleContext} from "./dialog-context";
export function useDialogRole() {
  return useContext(DialogRoleContext);
}
