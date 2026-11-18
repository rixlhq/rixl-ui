import type {ReactNode} from "react";

export function warnInputProps(named: {
  component: "Input" | "InputArea" | "InputGroup";
  label: ReactNode;
  ariaLabel: string | undefined;
  ariaLabelledBy: string | undefined;
  variant?: "default" | "error";
}): void {
  if (process.env.NODE_ENV === "production") return;
  const {component} = named;
  if (!named.label && !named.ariaLabel && !named.ariaLabelledBy) {
    console.warn(
      `[Rixl ${component}]: ${component} must have an accessible name. Provide either:\n` +
        `  - label prop: <${component} label='Email' />\n` +
        `  - aria-label: <${component} aria-label='Email address' />\n` +
        "  - aria-labelledby for custom label association"
    );
  }
  if (named.variant === "error") {
    console.warn(
      `[Rixl ${component}]: variant="error" is deprecated. Error styling is now automatically applied when the \`error\` prop is truthy.`
    );
  }
}
