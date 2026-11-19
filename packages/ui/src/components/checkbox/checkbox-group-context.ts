import {createContext} from "react";

/** `true` inside a `CheckboxGroup`, where a labelled `Checkbox` is a `Field.Item` rather than its own `Field.Root`. */
export const InCheckboxGroup = createContext(false);
