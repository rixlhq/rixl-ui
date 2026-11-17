# Tasks

## 1. Forms and dates

- [x] 1.1 Implement InputArea and shared field state/ref integration; verify label/help/error/required behavior in unit and browser tests.
- [x] 1.2 Rename DatePicker internals, fix locale and split form controls into individual component files; verify real locale and refs in scoped tests.

## 2. Overlays and navigation

- [x] 2.1 Consolidate Dialog/AlertDialog/Sheet and migrate mobile Sidebar, with one component/hook per file; verify dismissal/focus and mobile browser tests.
- [x] 2.2 Preserve Tabs animation while fixing overflow, handlers and refs; verify keyboard activation, RTL and reduced-motion browser tests.
- [x] 2.3 Add normalized/composable Pagination and refactor Collapsible defaults; verify page bounds, page input and disclosure tests.

## 3. Surfaces and remaining primitives

- [x] 3.1 Make Card passive, add Empty, and correct CopyBlock async feedback; verify behavioral regression tests and browser accessibility.
- [x] 3.2 Split remaining component/hook files and implement React 18 refs and consistent tokens; verify source organization and full tests.
- [x] 3.3 Integrate canonical exports and migration adapters, update guidance and package API documentation; verify pack, exports and unchanged docs build.

## 4. Integration

- [ ] 4.1 Run React 18 runtime/type compatibility fixture and React 19 suite; verify refs and composition on both versions.
- [x] 4.2 Run checks, unit/browser tests with coverage, package build/budget/exports and OpenSpec validation; record results and resolve findings.
