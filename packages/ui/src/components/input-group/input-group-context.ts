import {createContext} from "react";
import type {InputSize} from "../input/resolve-input-size";

export type InputGroupState = {required?: boolean; disabled?: boolean; labelled: boolean; inputSize: InputSize};

export const InputGroupContext = createContext<InputGroupState>({labelled: false, inputSize: "default"});
