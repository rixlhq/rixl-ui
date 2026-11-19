export type OverflowState = {
  isOverflowing: boolean;
  canScrollStart: boolean;
  canScrollEnd: boolean;
};

export function getNextOverflowState(el: HTMLElement, prev: OverflowState): OverflowState {
  const isRtl = getComputedStyle(el).direction === "rtl";
  const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
  const scrollLeft = Math.min(Math.max(0, isRtl ? -el.scrollLeft : el.scrollLeft), maxScrollLeft);
  const next: OverflowState = {
    isOverflowing: maxScrollLeft > 1,
    canScrollStart: scrollLeft > 1,
    canScrollEnd: maxScrollLeft - scrollLeft > 1,
  };
  if (prev.isOverflowing === next.isOverflowing && prev.canScrollStart === next.canScrollStart && prev.canScrollEnd === next.canScrollEnd) {
    return prev;
  }
  return next;
}
