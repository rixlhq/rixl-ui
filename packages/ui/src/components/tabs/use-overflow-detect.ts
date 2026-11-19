import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {getNextOverflowState, type OverflowState} from "./get-next-overflow-state";

const INITIAL_OVERFLOW: OverflowState = {isOverflowing: false, canScrollStart: false, canScrollEnd: false};

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
