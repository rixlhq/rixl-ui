import type {ReactElement} from "react";
import {render} from "@testing-library/react";
import {DirectionProvider} from "../src/components/direction-provider";

/**
 * Renders `ui` the way an RTL app does: `dir="rtl"` on the document, so portalled popups inherit it,
 * and Base UI's `DirectionProvider`, which Base UI reads instead of the DOM. Call `resetDirection` in `afterEach`.
 */
export function renderRtl(ui: ReactElement) {
  document.documentElement.dir = "rtl";
  return render(<DirectionProvider direction="rtl">{ui}</DirectionProvider>);
}

export function resetDirection() {
  document.documentElement.removeAttribute("dir");
}
