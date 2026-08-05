import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Reactive mobile-width detector (port of dashboard's `use-mobile`).
 * Returns true when the viewport is narrower than the 768px breakpoint,
 * updating on resize via `matchMedia`.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
