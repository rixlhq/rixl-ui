import {forwardRef, type ComponentProps} from "react";
import {Minus} from "lucide-react";

export type InputOTPSeparatorProps = ComponentProps<"div">;

export const InputOTPSeparator = forwardRef<HTMLDivElement, InputOTPSeparatorProps>(function InputOTPSeparator(props, ref) {
  return (
    // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- an <hr> can't hold the icon, and the separator is aria-hidden
    <div ref={ref} data-slot="input-otp-separator" role="separator" aria-hidden="true" {...props}>
      <Minus className="size-4" />
    </div>
  );
});
InputOTPSeparator.displayName = "InputOTPSeparator";
