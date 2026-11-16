import {useEffect, useLayoutEffect, useRef, useState, type MouseEvent, type PointerEvent, type RefObject} from "react";
import {cn} from "cn";

type OverflowState = {
  isOverflowing: boolean;
  canScrollStart: boolean;
  canScrollEnd: boolean;
};

const INITIAL_OVERFLOW: OverflowState = {
  isOverflowing: false,
  canScrollStart: false,
  canScrollEnd: false,
};

function getNextOverflowState(el: HTMLElement, prev: OverflowState): OverflowState {
  const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
  const scrollLeft = Math.min(Math.max(0, el.scrollLeft), maxScrollLeft);
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

export function useOverflowDetect(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<OverflowState>(INITIAL_OVERFLOW);

  useLayoutEffect(() => {
    if (!enabled || !ref.current) return;
    const el = ref.current;
    setState((prev) => getNextOverflowState(el, prev));
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const el = ref.current;
    const check = () => setState((prev) => getNextOverflowState(el, prev));

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(check) : null;
    ro?.observe(el);
    const mo = typeof MutationObserver !== "undefined" ? new MutationObserver(check) : null;
    mo?.observe(el, {childList: true, characterData: true, subtree: true});
    el.addEventListener("scroll", check, {passive: true});
    check();

    return () => {
      ro?.disconnect();
      mo?.disconnect();
      el.removeEventListener("scroll", check);
    };
  }, [enabled]);

  return {ref, ...state};
}

type DragSession = {
  pointerId: number;
  startX: number;
  scrollLeft: number;
  dragging: boolean;
};

export function useHorizontalDragScroll(ref: RefObject<HTMLElement | null>, enabled: boolean) {
  const dragState = useRef<DragSession | null>(null);
  const suppressClick = useRef(false);

  const releaseDrag = (event: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    const state = dragState.current;
    if (!el || !state || state.pointerId !== event.pointerId) return;
    dragState.current = null;
    if (el.hasPointerCapture?.(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }
    if (suppressClick.current) {
      window.setTimeout(() => {
        suppressClick.current = false;
      }, 0);
    }
  };

  return {
    onPointerDownCapture: (event: PointerEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el || !enabled || event.pointerType !== "mouse" || event.button !== 0) return;
      dragState.current = {pointerId: event.pointerId, startX: event.clientX, scrollLeft: el.scrollLeft, dragging: false};
      suppressClick.current = false;
    },
    onPointerMoveCapture: (event: PointerEvent<HTMLElement>) => {
      const el = ref.current;
      const state = dragState.current;
      if (!el || !enabled || !state || state.pointerId !== event.pointerId) return;
      const deltaX = event.clientX - state.startX;
      if (!state.dragging) {
        if (Math.abs(deltaX) <= 3) return;
        state.dragging = true;
        suppressClick.current = true;
        el.setPointerCapture?.(event.pointerId);
      }
      event.preventDefault();
      el.scrollLeft = state.scrollLeft - deltaX;
    },
    onPointerUpCapture: releaseDrag,
    onPointerCancelCapture: releaseDrag,
    onClickCapture: (event: MouseEvent<HTMLElement>) => {
      if (!suppressClick.current) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClick.current = false;
    },
  };
}

export function scrollTabsByPage(el: HTMLElement | null, direction: "start" | "end") {
  if (!el) return;
  const distance = Math.max(80, Math.floor(el.clientWidth * 0.75));
  el.scrollBy?.({
    left: direction === "start" ? -distance : distance,
    behavior: "smooth",
  });
}

export function TabsOverflowControl({
  side,
  visible,
  variant,
  size,
  onClick,
}: {
  side: "start" | "end";
  visible: boolean;
  variant: "segmented" | "underline" | "ghost";
  size: "sm" | "md";
  onClick: () => void;
}) {
  const isStart = side === "start";
  const isSegmented = variant === "segmented";

  return (
    <button
      type="button"
      data-slot="tabs-overflow-control"
      data-side={side}
      aria-label={isStart ? "Scroll tabs left" : "Scroll tabs right"}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={onClick}
      className={cn(
        " absolute inset-y-0 z-20 flex items-center border-0 p-0 transition-opacity duration-rixl-fast ease-rixl-out outline-none select-none",
        isStart ? "start-0 justify-start bg-linear-to-r" : "end-0 justify-end bg-linear-to-l",
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        isSegmented ? "from-rixl-surface-muted via-rixl-surface-muted/95 to-transparent" : "from-rixl-bg via-rixl-bg/95 to-transparent",
        isSegmented ? (size === "sm" ? "w-7 rounded-rixl-lg" : "w-9 rounded-rixl-lg") : "w-8"
      )}
    >
      <span
        className={cn(
          "text-rixl-fg-muted hover:text-rixl-fg flex items-center justify-center rounded-rixl-sm transition-colors duration-rixl-fast",
          size === "sm" ? "size-5" : "size-6",
          isStart ? "ms-1" : "me-1"
        )}
      >
        <ChevronIcon side={side} />
      </span>
    </button>
  );
}

function ChevronIcon({side}: {side: "start" | "end"}) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-3.5 rtl:-scale-x-100" aria-hidden="true">
      <path
        d={side === "start" ? "M9.5 4L5.5 8L9.5 12" : "M6.5 4L10.5 8L6.5 12"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
