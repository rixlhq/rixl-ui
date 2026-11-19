import {useEffect, type ReactNode} from "react";

export type MissingNameWarning = {
  /** The component the app rendered, for example `Input`. */
  component: string;
  /** What needs the name, for example `The tooltip trigger`. */
  subject: string;
  /** The prop to set, with an example. */
  fix: string;
};

/**
 * Dev-only reminder that the app owes a part an accessible name. The library
 * ships no hidden screen-reader text; it warns once per instance instead.
 */
export function useWarnMissingName(missing: boolean, {component, subject, fix}: MissingNameWarning): void {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" || !missing) return;
    console.warn(`[Rixl ${component}]: ${subject} must have an accessible name. ${fix}`);
  }, [missing, component, subject, fix]);
}

/** A toggle control is named by its visible `label`, `aria-label` or `aria-labelledby`; warns in development when none is set. */
export function useWarnUnnamedControl(named: {
  component: string;
  label: ReactNode;
  ariaLabel: string | undefined;
  ariaLabelledBy: string | undefined;
}): void {
  const {component} = named;
  useWarnMissingName(!named.label && !named.ariaLabel && !named.ariaLabelledBy, {
    component,
    subject: component,
    fix: `Provide either a label prop: <${component} label='Accept terms' />, an aria-label: <${component} aria-label='Select item' />, or aria-labelledby for a custom label association.`,
  });
}
