import {forwardRef, type ComponentProps} from "react";
import {cn} from "../../lib/cn";

export type InputOTPGroupProps = ComponentProps<"div">;

export const InputOTPGroup = forwardRef<HTMLDivElement, InputOTPGroupProps>(function InputOTPGroup({className, ...props}, ref) {
  return <div ref={ref} data-slot="input-otp-group" className={cn("flex items-center", className)} {...props} />;
});
InputOTPGroup.displayName = "InputOTPGroup";
