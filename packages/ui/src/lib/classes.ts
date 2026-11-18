/**
 * Class strings that several components repeat. Compose them with `cn` so a
 * consumer `className` still wins (tailwind-merge, last write wins).
 */

/** Focus ring for a part with a border: the ring is drawn and the border takes the ring colour. */
export const focusRing = "focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]";

/** Focus ring for a part with no border of its own, so there is no border colour to change. */
export const focusRingBorderless = "focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]";
