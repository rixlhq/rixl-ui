import type {ReactNode} from "react";

const labelHints = {
  Input: "<Input label='Email' />",
  InputArea: "<InputArea label='Email' />",
  InputGroupInput: "<InputGroup label='Email'> (on the group)",
} as const;

export function warnInputProps(named: {
  component: keyof typeof labelHints;
  label: ReactNode;
  ariaLabel: string | undefined;
  ariaLabelledBy: string | undefined;
}): void {
  if (process.env.NODE_ENV === "production") return;
  const {component} = named;
  if (!named.label && !named.ariaLabel && !named.ariaLabelledBy) {
    console.warn(
      `[Rixl ${component}]: ${component} must have an accessible name. Provide either:\n` +
        `  - label prop: ${labelHints[component]}\n` +
        `  - aria-label: <${component} aria-label='Email address' />\n` +
        "  - aria-labelledby for custom label association"
    );
  }
}
