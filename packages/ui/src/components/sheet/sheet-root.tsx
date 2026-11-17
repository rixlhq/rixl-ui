import {Dialog as DialogPrimitive} from "@base-ui/react/dialog";
import {Dialog} from "../dialog/dialog-root";

export type SheetProps = DialogPrimitive.Root.Props & {role?: "dialog"};
/** @deprecated Use Dialog from @rixl/ui/dialog. */
export function Sheet(props: SheetProps) {
  const {role: _role, ...rootProps} = props;
  return <Dialog {...rootProps} />;
}
