import {useContext} from "react";
import {LocaleContext} from "./locale-context";
import {mergeDefined} from "./merge-translations";
import {DEFAULT_TRANSLATIONS, type RixlTranslations} from "./translations";

/** One component's strings: the `labels` prop, then the provider, then English. */
export function useTranslations<Group extends keyof RixlTranslations>(
  group: Group,
  labels?: Partial<RixlTranslations[Group]>
): RixlTranslations[Group] {
  const provided = useContext(LocaleContext);
  // as: the English defaults define every key, and mergeDefined only adds defined values over them.
  return mergeDefined<RixlTranslations[Group]>([DEFAULT_TRANSLATIONS[group], provided?.[group], labels]) as RixlTranslations[Group];
}
