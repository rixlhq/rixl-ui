import {getScrollBehavior} from "./get-scroll-behavior";

export function scrollTabsByPage(el: HTMLElement | null, direction: "start" | "end") {
  if (!el) return;
  const distance = Math.max(80, Math.floor(el.clientWidth * 0.75));
  const sign = getComputedStyle(el).direction === "rtl" ? -1 : 1;
  el.scrollBy?.({left: (direction === "start" ? -distance : distance) * sign, behavior: getScrollBehavior()});
}
