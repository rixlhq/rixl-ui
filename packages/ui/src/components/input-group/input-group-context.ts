import {createContext} from "react";
import type {VariantProps} from "class-variance-authority";
import type {inputVariants} from "../input/input-variants";

type InputGroupState = {required?: boolean; disabled?: boolean; labelled: boolean; size?: VariantProps<typeof inputVariants>["size"]};

export const InputGroupContext = createContext<InputGroupState>({labelled: false});
