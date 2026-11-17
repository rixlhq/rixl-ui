# Design

## Context

See proposal.md for motivation. Docs must stay unchanged and still imports legacy names. Current runtime/types are React 19 despite an advertised React 18 peer contract. The user requires one component and hook per file.

## Goals / Non-Goals

Goals: canonical names and small-component composition, correct refs and states, no duplicated overlay implementation. Non-goals: docs redesign, a new motion runtime or removing intended tab animation.

## Decisions

### Canonical APIs with compatibility adapters

**Chosen:** InputArea, Empty and DatePicker names; a single role-aware Dialog family. Legacy names re-export or adapt canonical parts. Sheet is only a legacy presentation adapter; Sidebar migrates to canonical Dialog primitives. Card's deprecated interactive prop is inert.
**Alternatives considered:** immediate removal breaks untouched docs; retaining independent implementations duplicates future fixes.
**Dropped:** removing Tabs animation, superseded by user preference and Chromium checks showing activation before animation completion.
**Evidence:** package exports/current docs imports; existing Dialog role branch; scoped review and keyboard probes.

### Composition and file boundaries

**Chosen:** each component, hook and reusable utility has its own named file; exports-only index files. DOM-bearing wrappers use forwardRef with concrete refs and display names. Share Field infrastructure, Button actions and tokenized overlay styles; preserve specialized Base UI semantics.
**Alternatives considered:** component-family files conflict with user direction; wrapping every semantic control in Button creates invalid structures.
**Dropped:** none.
**Evidence:** current Input/InputGroup reuse, duplicated close controls and Collapsible panels, React 18 ref contract.

### Behavior and validation

**Chosen:** locale-aware upstream date formatting; clipboard success after resolution; one normalized pagination model with composable parts and strict page-entry drafts; preserve tab transitions while fixing overflow, JS reduced motion and ref/event merging. Execute React 18 runtime/type fixtures alongside existing React 19 tests.
**Alternatives considered:** parallel locale APIs, optimistic clipboard confirmation and changing peer declarations alone do not fix behavior.
**Dropped:** none.
**Evidence:** existing locale, copy and pagination source paths and prior reproductions.

## Risks / Trade-offs

- [Export churn] → Keep migration adapters and validate package entries plus untouched docs build.
- [Focus/overlay regressions] → Browser focus, dismissal and axe coverage for both Dialog roles and mobile Sidebar.
- [Broad file moves] → Split scope ownership, run full checks and preserve direct import compatibility where current tests rely on it.
- [React type/version mismatch] → Isolated runtime/type fixture, avoiding duplicate React instances.

## Migration Plan

Implement canonical behavior and file organization, then integrate maps and tests. Keep legacy exports for this docs-excluded pass. Physical deletion belongs to a later consumer migration. Revert this change to roll back; no external data migration is involved.
