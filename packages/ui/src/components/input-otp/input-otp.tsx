import {useContext, type ComponentProps} from "react";
import {OTPInput, OTPInputContext} from "input-otp";
import {cn} from "../../lib/cn";

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
function InputOTP({
  className,
  containerClassName,
  ...props
}: ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn("flex items-center gap-2 has-disabled:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({className, ...props}: ComponentProps<"div">) {
  return <div data-slot="input-otp-group" className={cn("flex items-center", className)} {...props} />;
}

function InputOTPSlot({
  index,
  className,
  ...props
}: ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = useContext(OTPInputContext);
  const {char, hasFakeCaret, isActive} = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-rixl-ring data-[active=true]:ring-rixl-ring/50 data-[active=true]:aria-invalid:ring-rixl-danger/20 aria-invalid:border-rixl-danger data-[active=true]:aria-invalid:border-rixl-danger border-rixl-border relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-rixl-xs transition-all outline-none first:rounded-l-rixl-md first:border-l last:rounded-r-rixl-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-rixl-fg h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({...props}: ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" aria-hidden="true" {...props}>
      <MinusIcon />
    </div>
  );
}

function MinusIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

export {InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator};
export type InputOTPProps = ComponentProps<typeof OTPInput> & {containerClassName?: string};
