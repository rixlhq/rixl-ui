import {useEffect, useRef, useState} from "react";
import {Button} from "@rixl/ui/button";

const FEEDBACK_DURATION = 1500;

export function CopyButton({text, label = "Copy code"}: {text: string; label?: string}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), FEEDBACK_DURATION);
  };

  let message = label;
  if (status === "copied") message = "Copied";
  if (status === "error") message = "Copy failed";

  return (
    <Button variant="ghost" size="sm" onClick={handleCopy}>
      <span className="grid">
        <span className="invisible col-start-1 row-start-1" aria-hidden="true">
          {label}
        </span>
        <span className="col-start-1 row-start-1" aria-live="polite">
          {message}
        </span>
      </span>
    </Button>
  );
}
