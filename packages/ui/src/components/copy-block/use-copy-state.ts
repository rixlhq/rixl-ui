import {useEffect, useRef, useState} from "react";
import {copyToClipboard} from "../../lib/clipboard";

const COPY_FEEDBACK_MS = 1500;

export type CopyState = "idle" | "pending" | "copied";

export function useCopyState(value?: string) {
  const [state, setState] = useState<CopyState>("idle");
  const [prevValue, setPrevValue] = useState(value);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const request = useRef(0);
  const pending = useRef(false);
  if (prevValue !== value) {
    setPrevValue(value);
    setState("idle");
  }
  useEffect(() => {
    pending.current = false;
    request.current += 1;
    if (timer.current) clearTimeout(timer.current);
  }, [value]);
  const handleCopy = async () => {
    if (!value || pending.current) return;
    const id = ++request.current;
    pending.current = true;
    if (timer.current) clearTimeout(timer.current);
    setState("pending");
    try {
      await copyToClipboard(value);
      if (id !== request.current) return;
      setState("copied");
      timer.current = setTimeout(() => setState("idle"), COPY_FEEDBACK_MS);
    } catch {
      if (id === request.current) setState("idle");
    } finally {
      if (id === request.current) pending.current = false;
    }
  };
  return {state, handleCopy};
}
