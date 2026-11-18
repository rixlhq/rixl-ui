import {useState, type ComponentProps} from "react";
import {OTPInput} from "input-otp";
import {cn} from "../../lib/cn";

import {InputOTPGroup, type InputOTPGroupProps} from "./group";
import {InputOTPSlot, type InputOTPSlotProps} from "./slot";
import {InputOTPSeparator, type InputOTPSeparatorProps} from "./separator";

/**
 * Rixl InputOTP — a one-time-password / verification-code input.
 *
 * Ported from dashboard's shadcn InputOTP (built on the `input-otp`
 * package). Composition: `<InputOTP>` root, `<InputOTPGroup>` wrapper,
 * `<InputOTPSlot index={n} />` per digit, `<InputOTPSeparator />` for
 * visual dashes between groups. Lucide `MinusIcon` inlined so
 * `@rixl/ui` stays icon-dep-free.
 *
 * Class names swapped to `--rixl-*` tokens; `dark:*` variants dropped.
 * The blinking caret uses `animate-caret-blink`, registered in
 * `preset.css` via `@theme`.
 */
// OTPInput's props are a union (render function or children); a plain Omit would merge it into one shape.
type OmitFromEach<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

export type InputOTPProps = OmitFromEach<ComponentProps<typeof OTPInput>, "value" | "defaultValue"> & {
  // OTPInput takes a string; the input attributes it extends also allow numbers and arrays.
  value?: string;
  defaultValue?: string;
  containerClassName?: string;
};

export function InputOTP({className, containerClassName, value, defaultValue, onChange, ...props}: InputOTPProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const hasDefault = defaultValue !== undefined;

  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn("flex items-center gap-2 has-disabled:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...(isControlled
        ? {value, onChange}
        : hasDefault
          ? {
              value: internalValue,
              onChange: (val: string) => {
                setInternalValue(val);
                onChange?.(val);
              },
            }
          : {onChange})}
      {...props}
    />
  );
}

export {InputOTPGroup, InputOTPSlot, InputOTPSeparator, type InputOTPGroupProps, type InputOTPSlotProps, type InputOTPSeparatorProps};
