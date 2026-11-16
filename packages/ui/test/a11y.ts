import axe from "axe-core";

// WCAG 2.2 A and AA, the level the European Accessibility Act and most procurement rules require.
const WCAG_AA = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

/**
 * Runs axe on `element` after any in-flight entrance animations settle, returning
 * one line per violating node so a failing `toEqual([])` shows which rule broke.
 */
export async function axeViolations(element: Element): Promise<string[]> {
  const animations = element.getAnimations({subtree: true});
  if (animations.length > 0) {
    await Promise.all(animations.map((animation) => animation.finished.catch(() => undefined)));
  }
  const {violations} = await axe.run(element, {runOnly: {type: "tag", values: WCAG_AA}});
  return violations.flatMap((violation) => violation.nodes.map((node) => `${violation.id}: ${node.target.join(" > ")}`));
}
