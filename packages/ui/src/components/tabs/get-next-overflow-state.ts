export type OverflowState = {
  isRtl: boolean;
  isOverflowing: boolean;
  canScrollStart: boolean;
  canScrollEnd: boolean;
};

export function getNextOverflowState(el: HTMLElement, prev: OverflowState): OverflowState {
  const isRtl = getComputedStyle(el).direction === "rtl";
  const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
  const scrollLeft = Math.min(Math.max(0, getComputedStyle(el).direction === "rtl" ? -el.scrollLeft : el.scrollLeft), maxScrollLeft);
  const next: OverflowState = {
    isRtl,
    isOverflowing: maxScrollLeft > 1,
    canScrollStart: scrollLeft > 1,
    canScrollEnd: maxScrollLeft - scrollLeft > 1,
  };
  if (
    prev.isRtl === next.isRtl &&
    prev.isOverflowing === next.isOverflowing &&
    prev.canScrollStart === next.canScrollStart &&
    prev.canScrollEnd === next.canScrollEnd
  ) {
    return prev;
  }
  return next;
}
