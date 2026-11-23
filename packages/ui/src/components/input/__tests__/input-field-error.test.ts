import {describe, it, expect} from "vitest";
import {normalizeInputError} from "../input-field-error";

describe("normalizeInputError", () => {
  it("returns undefined when no error is given", () => {
    expect(normalizeInputError(undefined)).toBeUndefined();
  });

  it("returns undefined for an empty string", () => {
    expect(normalizeInputError("")).toBeUndefined();
  });

  it("wraps a string message so it always matches", () => {
    expect(normalizeInputError("Enter an email address.")).toEqual({message: "Enter an email address.", match: true});
  });

  it("passes a validation object through untouched", () => {
    const error = {message: "Too short", match: "tooShort" as const};
    expect(normalizeInputError(error)).toBe(error);
  });
});
