import type {ReactNode} from "react";

export function warnInputProps(named: {
  label: ReactNode;
  ariaLabel: string | undefined;
  ariaLabelledBy: string | undefined;
  variant: "default" | "error" | undefined;
}): void {
  if (process.env.NODE_ENV === "production") return;
  if (!named.label && !named.ariaLabel && !named.ariaLabelledBy) {
    console.warn(
      "[Rixl Input]: Input must have an accessible name. Provide either:\n" +
        "  - label prop: <Input label='Email' />\n" +
        "  - aria-label: <Input aria-label='Email address' />\n" +
        "  - aria-labelledby for custom label association"
    );
  }
  if (named.variant === "error") {
    console.warn(
      '[Rixl Input]: variant="error" is deprecated. Error styling is now automatically applied when the `error` prop is truthy.'
    );
  }
}
