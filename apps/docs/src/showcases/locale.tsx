import {Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbList} from "@rixl/ui/breadcrumb";
import {CopyBlock} from "@rixl/ui/copy-block";
import {Input} from "@rixl/ui/input";
import {RixlLocaleProvider, type RixlTranslationsPartial} from "@rixl/ui/locale";
import {Pagination} from "@rixl/ui/pagination";
import {Group} from "../components/showcase-layout";
import type {Control, ControlValue, Example} from "./registry";

export const path = "locale";
export const title = "Locale Provider";
export const description = "Replace the English strings @rixl/ui renders on its own.";
export const notes =
  "RixlLocaleProvider takes a partial translations object; every key you leave out stays English, and no provider is needed for English. Values are plain strings, or functions for the strings that interpolate (copyBlock.copy, pagination.page, pagination.showing), so compiled message functions from an i18n library can be passed in directly. A component's labels prop beats the provider, which beats the English default; Breadcrumb's aria-label beats both. The provider computes its value on every render, so passing new strings after a locale switch updates every component. The library ships English only and has no i18n dependency.";

/** What an app would keep in its message files. German and French are demo data, not shipped by the library. */
const messages = {
  en: {
    copied: "Copied!",
    copy_label: (title: string) => `Copy ${title}`,
    optional: "(optional)",
    more: "More",
    showing: "Showing",
    of: "of",
  },
  de: {
    copied: "Kopiert!",
    copy_label: (title: string) => `${title} kopieren`,
    optional: "(optional)",
    more: "Mehr",
    showing: "Zeige",
    of: "von",
  },
  fr: {
    copied: "Copié !",
    copy_label: (title: string) => `Copier ${title}`,
    optional: "(facultatif)",
    more: "Plus",
    showing: "Affichage de",
    of: "sur",
  },
};
type Locale = keyof typeof messages;

/** The app-side adapter: maps message functions onto the library's keys. Call it during render so it reads the active locale. */
function toRixlTranslations(m: (typeof messages)[Locale]): RixlTranslationsPartial {
  return {
    copyBlock: {copy: m.copy_label, copied: m.copied},
    input: {optional: m.optional},
    breadcrumb: {more: m.more},
    pagination: {showing: (range, total) => `${m.showing} ${range} ${m.of} ${total}`},
  };
}

const localeControl: Control = {
  name: "locale",
  label: "Locale",
  type: "select",
  options: [
    {value: "en", label: "English"},
    {value: "de", label: "Deutsch"},
    {value: "fr", label: "Français"},
  ],
  defaultValue: "de",
};

function toLocale(value: ControlValue | undefined): Locale {
  return value === "en" || value === "fr" ? value : "de";
}

function Demo({locale}: {locale: Locale}) {
  return (
    <RixlLocaleProvider translations={toRixlTranslations(messages[locale])}>
      <div className="flex w-full max-w-md flex-col gap-4">
        <CopyBlock title="Token" value="sk_live_51H3xQ9kP2e0R8m" />
        <Input label="Display name" required={false} placeholder="Ada" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Pagination page={2} setPage={() => {}} perPage={10} totalCount={80} />
      </div>
    </RixlLocaleProvider>
  );
}

export function Showcase() {
  return <Demo locale="de" />;
}

function SwitchExample({state}: {state: Record<string, ControlValue>}) {
  return <Demo locale={toLocale(state.locale)} />;
}

function InstanceExample() {
  return (
    <RixlLocaleProvider translations={toRixlTranslations(messages.de)}>
      <Group label="Provider: German; this instance: labels={{copied: ...}}">
        <CopyBlock title="Token" value="sk_live_51H3xQ9kP2e0R8m" labels={{copied: "Fertig!"}} className="w-full max-w-md" />
      </Group>
    </RixlLocaleProvider>
  );
}

export const examples: Example[] = [
  {
    id: "switch",
    title: "Switch locale",
    description: "Re-rendering the provider with new strings updates every component; unset keys stay English.",
    render: SwitchExample,
    controls: [localeControl],
    code: `import {RixlLocaleProvider} from "@rixl/ui/locale";

<RixlLocaleProvider
  translations={{
    copyBlock: {copied: "Kopiert!", copy: (title) => \`\${title} kopieren\`},
    input: {optional: "(optional)"},
  }}
>
  <App />
</RixlLocaleProvider>`,
  },
  {
    id: "instance",
    title: "Per-instance labels",
    description: "A component's labels prop beats the provider for the keys it sets and leaves the rest alone.",
    render: InstanceExample,
    code: `<CopyBlock title="Token" value={token} labels={{copied: "Fertig!"}} />`,
  },
  {
    id: "paraglide",
    title: "Wiring Paraglide JS",
    description:
      "Paraglide compiles each message to a function, which matches the shape of RixlTranslations. Wrap the ones that take parameters; no Paraglide code ships in @rixl/ui.",
    render: SwitchExample,
    controls: [localeControl],
    code: `// rixl-translations.ts
import type {RixlTranslationsPartial} from "@rixl/ui/locale";
import {m} from "./paraglide/messages.js";
import type {Locale} from "./paraglide/runtime.js";

// Paraglide message functions take an optional { locale } as a second argument,
// so this stays a pure function of the locale you pass.
export const rixlTranslations = (locale: Locale): RixlTranslationsPartial => ({
  breadcrumb: {label: m.breadcrumb_label({}, {locale}), more: m.breadcrumb_more({}, {locale})},
  copyBlock: {
    // The library passes the title; Paraglide takes an object of parameters.
    copy: (title) => m.copy_label({title}, {locale}),
    copying: m.copy_copying({}, {locale}),
    copied: m.copy_copied({}, {locale}),
    error: m.copy_error({}, {locale}),
  },
  dialog: {close: m.dialog_close({}, {locale})},
  input: {optional: m.input_optional({}, {locale}), moreInformation: m.input_more_information({}, {locale})},
  pagination: {
    page: (page) => m.pagination_page({page}, {locale}),
    showing: (range, total) => m.pagination_showing({range, total}, {locale}),
  },
});

// providers.tsx
import {RixlLocaleProvider} from "@rixl/ui/locale";

// \`locale\` comes from your state or router. When it changes this re-renders, and the
// provider, which does not cache, hands every component the strings for the new locale.
export function Providers({locale, children}: {locale: Locale; children: React.ReactNode}) {
  return <RixlLocaleProvider translations={rixlTranslations(locale)}>{children}</RixlLocaleProvider>;
}`,
  },
];
