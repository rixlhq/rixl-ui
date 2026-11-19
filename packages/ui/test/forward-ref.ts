import {createRef, type ReactElement, type RefObject} from "react";
import {describe, expect, it} from "vitest";
import {render} from "@testing-library/react";

// React 19 passes `ref` to a function component as an ordinary prop, so only the exotic type
// tells whether React 18, the other supported peer, would keep it.
const FORWARD_REF_TYPE = Symbol.for("react.forward_ref");

function isForwardRef(component: unknown) {
  return typeof component === "object" && component !== null && "$$typeof" in component && component.$$typeof === FORWARD_REF_TYPE;
}

function displayNameOf(component: unknown) {
  return typeof component === "object" && component !== null && "displayName" in component ? component.displayName : undefined;
}

export type ForwardRefCase = {
  /** The exported name, which is also the expected `displayName`. */
  name: string;
  component: unknown;
  /** Renders the part, inside any parent it needs, with `ref` on it. */
  element: (ref: RefObject<null>) => ReactElement;
  /** `data-slot` of the element the ref must land on. */
  slot: string;
  /** Finds the element when it has no `data-slot` of its own, such as a native `<select>` inside a labelled wrapper. */
  selector?: string;
};

/**
 * One table of parts per component folder. A null-typed ref is assignable to a `Ref` of any
 * element type, so a single table can mix divs, buttons and spans.
 */
export function describeForwardRefs(cases: readonly ForwardRefCase[]) {
  describe.each(cases)("$name", ({name, component, element, slot, selector = `[data-slot="${slot}"]`}) => {
    it(`forwards its ref to the ${slot} element`, () => {
      const ref = createRef<never>();
      render(element(ref));
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current).toBe(document.querySelector(selector));
    });

    it("is a forwardRef component named after its export", () => {
      expect(isForwardRef(component)).toBe(true);
      expect(displayNameOf(component)).toBe(name);
    });
  });
}
