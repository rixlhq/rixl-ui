export function getScrollBehavior(keyboard = false): ScrollBehavior {
  return keyboard || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
}
