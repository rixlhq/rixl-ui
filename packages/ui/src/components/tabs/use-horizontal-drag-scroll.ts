import {useRef, type MouseEvent, type PointerEvent, type RefObject} from "react";

type DragSession = {pointerId: number; startX: number; scrollLeft: number; dragging: boolean};

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
