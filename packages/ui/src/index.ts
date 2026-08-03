// Barrel export for convenience.
//
// For best tree-shaking, import from a subpath instead:
//
//   import {Button} from "@rixl/ui/button";
//
// The subpath exports are declared in `package.json#exports` and each
// resolves to a single component's compiled output — the barrel below
// pulls in every component, which is fine for prototyping but not for
// production bundles.
export * from "./components/button";
export * from "./components/label";

/**
 * Shared className utility, re-exported for consumers that want to
 * compose Tailwind classes the same way @rixl/ui does internally
 * (clsx + tailwind-merge).
 */
export {cn} from "./lib/cn";
