import {describe, it, expect} from "vitest";
import fc from "fast-check";
import {mergeTranslations} from "../merge-translations";
import type {RixlTranslationsPartial} from "../translations";

describe("mergeTranslations", () => {
  it("keeps a lower layer's keys in the same group", () => {
    const merged = mergeTranslations({copyBlock: {copying: "A"}}, {copyBlock: {copied: "B"}});
    expect(merged).toEqual({copyBlock: {copying: "A", copied: "B"}});
  });

  it("lets an undefined value leave the lower layer's string alone", () => {
    const merged = mergeTranslations({dialog: {close: "Fermer"}}, {dialog: {close: undefined}});
    expect(merged.dialog?.close).toBe("Fermer");
  });

  it("skips undefined layers", () => {
    expect(mergeTranslations(undefined, {dialog: {close: "X"}}, undefined)).toEqual({dialog: {close: "X"}});
  });

  it("[property] each key takes the last layer that defines it, and no other key appears", () => {
    const group = fc.dictionary(fc.constantFrom("a", "b", "c"), fc.option(fc.string(), {nil: undefined}));
    const layer = fc.dictionary(fc.constantFrom("g1", "g2"), group);
    fc.assert(
      fc.property(fc.array(fc.option(layer, {nil: undefined}), {maxLength: 5}), (layers) => {
        // as: the generated dictionaries use arbitrary group and key names, not the real translation keys.
        const merged = mergeTranslations(...(layers as (RixlTranslationsPartial | undefined)[])) as Record<string, Record<string, string>>;
        for (const g of ["g1", "g2"]) {
          for (const key of ["a", "b", "c"]) {
            const expected = layers.map((l) => l?.[g]?.[key]).findLast((value) => value !== undefined);
            expect(merged[g]?.[key]).toBe(expected);
          }
        }
      })
    );
  });
});
