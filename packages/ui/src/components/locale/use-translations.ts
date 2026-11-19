import {useContext} from "react";
import {LocaleContext} from "./locale-context";
import {mergeDefined} from "./merge-translations";
import type {RixlTranslations} from "./translations";

/** One component's strings: the `labels` prop, then the provider, then the component's own defaults. */
export function useTranslations<Group extends keyof RixlTranslations>(
  group: Group,
  defaults: RixlTranslations[Group],
  labels?: Partial<RixlTranslations[Group]>
): RixlTranslations[Group] {
  const provided = useContext(LocaleContext);
  // as: the defaults define every key, and mergeDefined only adds defined values over them.
  return mergeDefined<RixlTranslations[Group]>([defaults, provided?.[group], labels]) as RixlTranslations[Group];
}
