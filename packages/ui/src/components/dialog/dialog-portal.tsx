import {Dialog as DialogPrimitive} from "@base-ui/react/dialog";
export type DialogPortalProps = DialogPrimitive.Portal.Props;
export function DialogPortal(props: DialogPortalProps) {
  return <DialogPrimitive.Portal {...props} />;
}
