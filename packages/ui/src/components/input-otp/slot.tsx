import {forwardRef, useContext, type ComponentProps} from "react";
import {OTPInputContext} from "input-otp";
import {cn} from "../../lib/cn";
import {controlSurface} from "../input/input-variants";

export type InputOTPSlotProps = ComponentProps<"div"> & {
  index: number;
};

export const InputOTPSlot = forwardRef<HTMLDivElement, InputOTPSlotProps>(function InputOTPSlot({index, className, ...props}, ref) {
  const inputOTPContext = useContext(OTPInputContext);
  const {char, hasFakeCaret, isActive} = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      ref={ref}
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        controlSurface,
        "relative h-9 w-9 items-center justify-center text-sm tabular-nums",
        // Slots join into one bar: only the outer edges are rounded and neighbours share one border.
        "rounded-none! first:rounded-s-rixl-md! last:rounded-e-rixl-md! not-first:border-s-0",
        // The caret lives in the hidden input, so the active slot stands in for :focus-visible.
        "data-[active=true]:z-10 data-[active=true]:border-rixl-ring data-[active=true]:ring-rixl-ring/50 data-[active=true]:ring-[3px]",
        "data-[active=true]:aria-invalid:border-rixl-danger data-[active=true]:aria-invalid:ring-rixl-danger/20",
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
});
InputOTPSlot.displayName = "InputOTPSlot";
