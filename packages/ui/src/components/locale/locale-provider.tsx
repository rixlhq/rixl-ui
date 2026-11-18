import {useContext, type ReactNode} from "react";
import {LocaleContext} from "./locale-context";
import {mergeTranslations} from "./merge-translations";
import type {RixlTranslationsPartial} from "./translations";

export type RixlLocaleProviderProps = {
  /** Strings to replace; every key you leave out stays English. Pass new strings on re-render to switch locale. */
  translations: RixlTranslationsPartial;
  children: ReactNode;
};

/**
 * Overrides the strings `@rixl/ui` renders on its own. Components need no
 * provider for English. A nested provider overrides its parent key by key, and a
 * component's `labels` prop beats both.
 */
export function RixlLocaleProvider({translations, children}: RixlLocaleProviderProps) {
  const parent = useContext(LocaleContext);
  return <LocaleContext.Provider value={mergeTranslations(parent ?? undefined, translations)}>{children}</LocaleContext.Provider>;
}
