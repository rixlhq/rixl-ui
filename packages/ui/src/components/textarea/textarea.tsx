import {forwardRef} from "react";
import {InputArea, type InputAreaProps} from "../input-area";

/** @deprecated Use InputArea from @rixl/ui/input-area. */
export const Textarea = forwardRef<HTMLTextAreaElement, InputAreaProps>((props, ref) => (
  <InputArea data-slot="textarea" {...props} ref={ref} />
));
Textarea.displayName = "Textarea";
export type TextareaProps = InputAreaProps;
