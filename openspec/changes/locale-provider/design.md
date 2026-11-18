# Design

## Context

Kumo's `KumoLocaleProvider` takes a partial translations object and falls back to English per key; components also take `labels`. Consuming apps use Paraglide JS, whose messages compile to functions: `m.copy_copied()` returns a string, `m.copy_label({title})` takes an object.

## Decisions

### D1. Values are strings or functions, never templates

**Chosen**: `RixlTranslations` values are `string`, or a function of the interpolated values for the three strings that interpolate (`copyBlock.copy(title)`, `pagination.page(page)`, `pagination.showing(range, total)`).

**Alternatives considered**: `"Copy {title}"` templates with a `format` helper. Kumo-style, serializable, but an app would have to translate a placeholder syntax instead of calling its message function, and the library would own an interpolation grammar. Rejected.

**Evidence**: Paraglide messages are functions (`m.copy_label({title})`); the docs showcase wraps them: `copy: (title) => m.copy_label({title})`.

### D2. Two-level shape, grouped by component

**Chosen**: `{breadcrumb: {...}, copyBlock: {...}, ...}`. A component reads its own group, so its `labels` prop is `Partial<RixlTranslations["<group>"]>` and `PaginationLabels` is `RixlTranslations["pagination"]`.

**Alternatives considered**: a flat `"copyBlock.copied"` key map (Kumo's `breadcrumbs.label`). Flat keys cannot be typed as a partial per component without a mapped type, and nothing here needs dotted lookups. Rejected.

### D3. Merge is per group, one helper, no memo

**Chosen**: `mergeTranslations(...layers)` merges group by group and skips `undefined` values (a spread would let `{copied: undefined}` erase a default). `useTranslations(group, labels)` returns `merge(defaults, provider, {[group]: labels})[group]`. A nested `RixlLocaleProvider` merges with its parent. The provider computes its value on every render.

**Alternatives considered**: `useMemo` on the `translations` prop. An inline object changes identity every render anyway, and a stable object cannot carry new strings, so the memo would save nothing and risk a stale locale. Rejected.

### D4. The provider lives in one module both entries import

`locale/` owns the context, and component entries import it by relative path, so the bundler emits one shared chunk and a provider from `@rixl/ui/locale` reaches components imported from `@rixl/ui/copy-block`. Verified by a test that mounts the built entries is not possible in jsdom; the browser project resolves the `development` condition to source, so the check is the `vp pack` output listing one context chunk (see tasks).

### D5. Strings the library does not own stay with their owner

`DatePicker` passes through react-day-picker's `labels` and `locale`; we only add the previous and next month names, which react-day-picker would otherwise render in English. `Toaster` leaves `containerAriaLabel` and `toastOptions.closeButtonAriaLabel` to sonner and supplies the provider's strings as defaults.

## Dropped

None yet.
