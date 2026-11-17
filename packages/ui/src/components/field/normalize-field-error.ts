import type {FieldErrorProp, NormalizedFieldError} from "./field.types";

export function normalizeFieldError(error: FieldErrorProp | undefined): NormalizedFieldError | undefined {
  if (!error) return undefined;
  if (typeof error === "string") return {message: error, match: true};
  return error;
}
