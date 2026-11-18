import {useEffect} from "react";

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
