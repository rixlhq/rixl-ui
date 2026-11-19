# Design

## D1. Defaults live in the component, the provider holds none

**Chosen**: each component with copy exports its label type and defaults from its own module, and reads them with `useTranslations(group, defaults, labels)`. `RixlLocaleProvider` stores only what the app passes (merged with a parent provider); `RixlTranslations` is a type that names each component's label type.

**Alternatives considered**

- Keep `DEFAULT_TRANSLATIONS` and make the groups lazy. Still one module naming every string; rejected.
- Kumo's literal shape: a context created with the whole default object. That is the central catalogue this change removes; the Kumo components do carry their copy in `locale-provider.tsx`.

**Evidence**: dist chunk check recorded in tasks.md.

## D2. One shared hook, four callers

`useTranslations` and `mergeDefined` are used by `CopyBlock`, `InputField` and `Pagination`, and `Breadcrumb` reads the same context. Three callers meet the extract-at-three rule in `anti-slop.md`, so the helper stays. It holds no strings.

## D3. CopyBlock follows ClipboardText

**Chosen**: accessible name from `labels.copyAction`, not `title`. Kumo's button is named `copyAction` only. Identical names on several blocks are disambiguated by `aria-describedby` pointing at the visible title, which needs no translated string.

**Chosen**: `tooltip` is opt-in. Without it no tooltip renders (Kumo: "Tooltip config. Shows tooltip on hover"). With it, hover shows `tooltip.text`, and after a copy the same tooltip shows `tooltip.copiedText` for the feedback window.

**Deviation from Kumo, chosen**: `tooltip.text` defaults to the resolved `copyAction` and `tooltip.copiedText` to `labels.copied`, so one `labels` object or one provider translates the tooltip too. Kumo hard-codes "Copy" and "Copied". Kumo also shows the copied text in an anchored toast; here the tooltip content swaps, which needs no toast viewport.

**Deviation from Kumo, chosen**: `labels.copied` exists (Kumo: `copiedText` inside `tooltip`, default "Copied", also read by its `aria-live` region without a tooltip). A copy without a tooltip still needs a status announcement (WCAG 4.1.3), and a string that exists only when `tooltip` is set could not be translated otherwise.

**Dropped**: "Copying" and "Unable to copy. Try again." and their `labels` keys. Pending keeps `disabled` and `aria-busy`; failure returns to idle (Kumo logs a warning and shows nothing).

## D4. (optional) needs an explicit `required={false}`

Kumo shows `(optional)` only for `showOptional`; Rixl derives it from `required === false`. `true` and `undefined` show nothing, because most fields are optional by default and marking all of them is noise. This was already the code; the change adds tests for the three cases on all four components and the `labels` override.

## D5. Breadcrumb has no `labels` prop

Kumo documents `aria-label` (per trail) and the provider's `breadcrumbs.label` (app-wide). A third path would add API Kumo lacks.
