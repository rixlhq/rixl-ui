import type {ReactNode} from "react";
import {Field as FieldPrimitive} from "@base-ui/react/field";
import {FieldDescription} from "./field-description";
import {FieldError} from "./field-error";
import type {NormalizedFieldError} from "./field.types";

export function FieldMessage({error, description}: {error?: NormalizedFieldError; description?: ReactNode}) {
  return (
    <FieldPrimitive.Validity>
      {({validity}) => {
        const active = error && (error.match === true || (typeof error.match === "string" && Boolean(validity[error.match])));
        if (active) return <FieldError match={error.match}>{error.message}</FieldError>;
        return description ? <FieldDescription>{description}</FieldDescription> : null;
      }}
    </FieldPrimitive.Validity>
  );
}
