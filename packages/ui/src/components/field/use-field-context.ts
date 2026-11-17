import {useContext} from "react";
import {FieldContext} from "./field-context";

export function useFieldContext() {
  return useContext(FieldContext);
}
