import {AlertDialog as AlertDialogPrimitive} from "@base-ui/react/alert-dialog";
import {Dialog as DialogPrimitive} from "@base-ui/react/dialog";
import {DialogRoleContext} from "./dialog-context";
export type DialogProps = (DialogPrimitive.Root.Props & {role?: "dialog"}) | (AlertDialogPrimitive.Root.Props & {role: "alertdialog"});
export function Dialog(props: DialogProps) {
  if (props.role === "alertdialog") {
    const {role, ...rootProps} = props;
    return (
      <DialogRoleContext.Provider value={role}>
        <AlertDialogPrimitive.Root {...rootProps} />
      </DialogRoleContext.Provider>
    );
  }
  const {role = "dialog", ...rootProps} = props;
  return (
    <DialogRoleContext.Provider value={role}>
      <DialogPrimitive.Root {...rootProps} />
    </DialogRoleContext.Provider>
  );
}
