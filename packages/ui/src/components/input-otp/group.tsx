import type {ComponentProps} from "react";
import {cn} from "cn";

export type InputOTPGroupProps = ComponentProps<"div">;

export function InputOTPGroup({className, ...props}: InputOTPGroupProps) {
  return <div data-slot="input-otp-group" className={cn("flex items-center", className)} {...props} />;
}
