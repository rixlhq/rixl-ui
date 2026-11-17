import {useContext} from "react";
import {InputGroupContext} from "./input-group-context";

export function useInputGroup() {
  return useContext(InputGroupContext);
}
