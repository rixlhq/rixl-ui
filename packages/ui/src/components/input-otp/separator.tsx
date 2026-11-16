import type {ComponentProps} from "react";

export type InputOTPSeparatorProps = ComponentProps<"div">;

export function InputOTPSeparator({...props}: InputOTPSeparatorProps) {
  return (
    // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- an <hr> can't hold the icon, and the separator is aria-hidden
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
