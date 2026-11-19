import type {ReactNode} from "react";

/** A native `ValidityState` key, or `true` to always show the error (server-side validation). */
export type InputErrorMatch = boolean | keyof ValidityState;
export type NormalizedInputError = {message: ReactNode; match: InputErrorMatch};
export type InputErrorProp = string | NormalizedInputError;

export function normalizeInputError(error: InputErrorProp | undefined): NormalizedInputError | undefined {
  if (!error) return undefined;
  if (typeof error === "string") return {message: error, match: true};
  return error;
}
