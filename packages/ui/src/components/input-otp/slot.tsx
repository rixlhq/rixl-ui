import {useContext, type ComponentProps} from "react";
import {OTPInputContext} from "input-otp";
import {cn} from "cn";

export type InputOTPSlotProps = ComponentProps<"div"> & {
  index: number;
};

export function InputOTPSlot({index, className, ...props}: InputOTPSlotProps) {
  const inputOTPContext = useContext(OTPInputContext);
  const {char, hasFakeCaret, isActive} = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-rixl-ring data-[active=true]:ring-rixl-ring/50 data-[active=true]:aria-invalid:ring-rixl-danger/20 aria-invalid:border-rixl-danger data-[active=true]:aria-invalid:border-rixl-danger border-rixl-border relative flex h-9 w-9 items-center justify-center border-y border-e text-sm tabular-nums shadow-rixl-xs transition-[border-color,box-shadow,background-color] duration-rixl-fast ease-rixl-out outline-none first:rounded-s-rixl-md first:border-s last:rounded-e-rixl-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink motion-reduce:animate-none bg-rixl-fg h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}
