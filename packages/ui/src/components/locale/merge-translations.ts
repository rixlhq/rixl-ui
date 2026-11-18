import type {RixlTranslationsPartial} from "./translations";

/** Merges layers left to right; a key an upper layer sets to `undefined` keeps the lower layer's value. */
export function mergeDefined<T extends object>(layers: readonly (Partial<T> | undefined)[]): Partial<T> {
  const merged: Partial<T> = {};
  for (const layer of layers) {
    if (!layer) continue;
    for (const key of Object.keys(layer) as (keyof T)[]) {
      const value = layer[key];
      if (value !== undefined) merged[key] = value;
    }
  }
  return merged;
}

/** Merges translation layers group by group, so an override of one string keeps the group's others. */
export function mergeTranslations(...layers: (RixlTranslationsPartial | undefined)[]): RixlTranslationsPartial {
  // as: groups are looked up by the layers' own keys, so the group names are only known as strings here.
  const byName = layers as (Record<string, Record<string, unknown>> | undefined)[];
  const merged: Record<string, object> = {};
  for (const group of new Set(byName.flatMap((layer) => Object.keys(layer ?? {})))) {
    merged[group] = mergeDefined(byName.map((layer) => layer?.[group]));
  }
  // as: every group was read from a layer's own keys, so the result has the shape of RixlTranslationsPartial.
  return merged as RixlTranslationsPartial;
}
