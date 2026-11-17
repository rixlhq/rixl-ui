import {DialogPortal, type DialogPortalProps} from "../dialog/dialog-portal";
export type SheetPortalProps = DialogPortalProps;
export function SheetPortal(props: SheetPortalProps) {
  return <DialogPortal {...props} />;
}
