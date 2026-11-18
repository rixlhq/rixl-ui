import type {ReactNode} from "react";
import {useWarnMissingName} from "../../lib/warn-missing-name";

const labelHints = {
  Input: "<Input label='Email' />",
  InputArea: "<InputArea label='Email' />",
  InputGroupInput: "<InputGroup label='Email'> (on the group)",
} as const;

/** A field is named by its visible `label`, `aria-label` or `aria-labelledby`; warns in development when none is set. */
export function useWarnUnnamedInput(named: {
  component: keyof typeof labelHints;
  label: ReactNode;
  ariaLabel: string | undefined;
  ariaLabelledBy: string | undefined;
}): void {
  const {component} = named;
  useWarnMissingName(!named.label && !named.ariaLabel && !named.ariaLabelledBy, {
    component,
    subject: component,
    fix: `Provide either a label prop: ${labelHints[component]}, an aria-label: <${component} aria-label='Email address' />, or aria-labelledby for a custom label association.`,
  });
}
