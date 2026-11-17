import {DialogPortal, type DialogPortalProps} from "../dialog/dialog-portal";
export type AlertDialogPortalProps = DialogPortalProps;
export function AlertDialogPortal(props: AlertDialogPortalProps) {
  return <DialogPortal {...props} />;
}
