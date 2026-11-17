import {createContext} from "react";

export const InputGroupContext = createContext<{required?: boolean; disabled?: boolean}>({});
