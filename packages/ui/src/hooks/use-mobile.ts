import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function isMobileViewport() {
  return window.innerWidth < MOBILE_BREAKPOINT;
}

// There is no viewport on the server; render the desktop layout there.
function isMobileOnServer() {
  return false;
}

/**
 * Reactive mobile-width detector (port of dashboard's `use-mobile`).
 * Returns true when the viewport is narrower than the 768px breakpoint,
 * updating on resize via `matchMedia`.
 */
export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, isMobileViewport, isMobileOnServer);
}
