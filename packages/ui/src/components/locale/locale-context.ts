import {createContext} from "react";
import type {RixlTranslationsPartial} from "./translations";

export const LocaleContext = createContext<RixlTranslationsPartial | null>(null);
