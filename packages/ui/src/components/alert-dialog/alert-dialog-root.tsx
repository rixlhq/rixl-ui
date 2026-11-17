import {Dialog} from "../dialog/dialog-root";
import type {AlertDialog as Primitive} from "@base-ui/react/alert-dialog";
export type AlertDialogProps = Primitive.Root.Props;
/** @deprecated Use Dialog from @rixl/ui/dialog. */
export function AlertDialog(props: AlertDialogProps) {
  return <Dialog {...props} role="alertdialog" />;
}
