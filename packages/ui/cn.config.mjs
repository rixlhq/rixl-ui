// Extension for `cn build` (script `cn:tables`). `@theme` scales in preset.css
// register radius, shadow, easing and colour tokens on their own; tailwind-merge
// has no duration scale, so the preset's `--transition-duration-*` names are
// added to the duration group here to keep preset.css the only token list.
import {readFileSync} from "node:fs";

const preset = readFileSync(new URL("./src/styles/preset.css", import.meta.url), "utf8");
const durations = [...new Set([...preset.matchAll(/--transition-duration-([\w-]+):/g)].map(([, name]) => name))];

export default {extend: {classGroups: {duration: [{duration: durations}]}}};
