import {createCn} from "cn/engine";
import tables from "./cn-tables";

/**
 * `cn` with merge tables that know the `rixl-*` tokens, so a consumer's
 * `rounded-full` or `duration-500` replaces a token default instead of
 * losing to it on CSS order. Regenerate the tables with `vpr cn:tables`.
 */
export const cn = createCn(tables);
