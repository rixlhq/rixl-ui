# Proposal

## Why

Component composition, names and React 18 refs are inconsistent across the library. Complete the reviewed component architecture so shared controls inherit fixes, date labels respect locale and consumers can compose larger patterns without duplicating control styling.

## What Changes

- Add canonical InputArea and Empty entries; keep deprecated Textarea/EmptyState adapters while docs remain unchanged.
- Keep DatePicker canonical, remove calendar-named implementation, and use its date-fns locale consistently.
- Consolidate normal and alert dialogs in Dialog, replacing independent AlertDialog and Sheet implementations with compatibility adapters; migrate mobile Sidebar.
- **BREAKING**: make Card passive, removing built-in interactive styling (legacy props may remain inert for migration).
- Preserve intentional Tabs animation while fixing overflow, refs, handlers and reduced-motion scrolling.
- Add composable Pagination parts and page entry; compose styled Collapsible parts from raw parts.
- One component/hook per file, React 18 ref forwarding, shared token/state treatment, and accurate clipboard feedback.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `design-system`: component composition, canonical names, field/date/clipboard behavior, pagination, passive surfaces and React 18 compatibility.

## Impact

packages/ui components, tests, build/export maps, compatibility fixtures, shared tokens and agent guidance. apps/docs is not edited. No new animation dependency.

## Non-goals

Docs/demo redesign, removing intentional tab motion, data fetching, cursor storage, immediate deletion of compatibility exports required by untouched docs.

## Acceptance

Canonical components are exported and tested; legacy entries are adapters without duplicated implementations. React 18 runtime and types exercise refs and composition. Unit/browser accessibility tests, checks, package build/export validation and untouched docs build pass. Card no longer adds clickable affordances by default or through the deprecated interactive prop.
