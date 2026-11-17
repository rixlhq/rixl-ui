import type {ReactNode} from "react";

export type FieldErrorMatch = boolean | keyof ValidityState;
export type NormalizedFieldError = {message: ReactNode; match: FieldErrorMatch};
export type FieldErrorProp = string | NormalizedFieldError;
