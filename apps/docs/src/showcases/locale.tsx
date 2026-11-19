import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage} from "@rixl/ui/breadcrumb";
import {CopyBlock} from "@rixl/ui/copy-block";
import {Input} from "@rixl/ui/input";
import {RixlLocaleProvider, type RixlTranslationsPartial} from "@rixl/ui/locale";
import {Pagination} from "@rixl/ui/pagination";
import {Group} from "../components/showcase-layout";
import type {Control, ControlValue, Example} from "./registry";

export const path = "locale";
export const title = "Locale";
export const group = "providers";
export const description = "Replace the English copy @rixl/ui draws on its own.";
export const notes =
  "Every component that renders text owns its English defaults, and takes a labels prop to override them. RixlLocaleProvider is the optional app-wide layer: it overrides only the strings you pass, holds no defaults, and a component's labels prop beats it. Precedence is labels, then the provider, then the component's own default. Provider groups: breadcrumb (label), copyBlock (copyAction, copied), label (optional, the (optional) marker on Label, Input, Checkbox and the other fields) and pagination. Values are plain strings, or functions for the strings that interpolate (pagination.page, pagination.showing), so compiled message functions from an i18n library can be passed in directly. Breadcrumb takes aria-label instead of labels, as Kumo's does. Names for icon buttons and landmarks the library cannot know (a dialog's close button, a field's info icon, the sidebar toggle) are not in the provider: pass your own translated string as aria-label or labelTooltipAriaLabel. Calendar text comes from DatePicker's react-day-picker locale. The provider computes its value on every render, so passing new strings after a locale switch updates every component. The library ships English only and has no i18n dependency; a consumer of one component pulls no strings for another.";

/** What an app would keep in its message files. German and French are demo data, not shipped by the library. */
const messages = {
  en: {
    copied: "Copied!",
    copy_action: "Copy to clipboard",
    optional: "(optional)",
    breadcrumb: "breadcrumb",
    showing: "Showing",
    of: "of",
  },
  de: {
    copied: "Kopiert!",
    copy_action: "In die Zwischenablage kopieren",
    optional: "(optional)",
    breadcrumb: "Brotkrumen",
    showing: "Zeige",
    of: "von",
  },
  fr: {
    copied: "Copié !",
    copy_action: "Copier dans le presse-papiers",
    optional: "(facultatif)",
    breadcrumb: "fil d'Ariane",
    showing: "Affichage de",
    of: "sur",
  },
};
type Locale = keyof typeof messages;

/** The app-side adapter: maps message functions onto the library's keys. Call it during render so it reads the active locale. */
function toRixlTranslations(m: (typeof messages)[Locale]): RixlTranslationsPartial {
  return {
    copyBlock: {copyAction: m.copy_action, copied: m.copied},
    label: {optional: m.optional},
    breadcrumb: {label: m.breadcrumb},
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
              <BreadcrumbPage>Settings</BreadcrumbPage>
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
      <Group label="Provider: German; these instances: labels">
        <CopyBlock title="Token" value="sk_live_51H3xQ9kP2e0R8m" labels={{copied: "Fertig!"}} className="w-full max-w-md" />
        <Input label="Display name" required={false} labels={{optional: "(wenn du magst)"}} className="w-full max-w-md" />
        <Breadcrumb aria-label="Pfad">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Einstellungen</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
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
    copyBlock: {copyAction: "In die Zwischenablage kopieren", copied: "Kopiert!"},
    label: {optional: "(optional)"},
  }}
>
  <App />
</RixlLocaleProvider>`,
  },
  {
    id: "instance",
    title: "Per-instance labels",
    description:
      "A component's labels prop beats the provider for the keys it sets and leaves the rest alone. Breadcrumb takes aria-label instead.",
    render: InstanceExample,
    code: `<CopyBlock title="Token" value={token} labels={{copied: "Fertig!"}} />
<Input label="Display name" required={false} labels={{optional: "(wenn du magst)"}} />
<Breadcrumb aria-label="Pfad">…</Breadcrumb>`,
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
  breadcrumb: {label: m.breadcrumb_label({}, {locale})},
  copyBlock: {
    copyAction: m.copy_action({}, {locale}),
    copied: m.copy_copied({}, {locale}),
  },
  label: {optional: m.input_optional({}, {locale})},
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
