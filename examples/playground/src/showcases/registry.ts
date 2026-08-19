import type { ComponentType, ReactNode } from "react";
import * as button from "./button";
import * as label from "./label";
import * as separator from "./separator";
import * as badge from "./badge";
import * as avatar from "./avatar";
import * as skeleton from "./skeleton";
import * as progress from "./progress";
import * as alert from "./alert";
import * as input from "./input";
import * as textarea from "./textarea";
import * as checkbox from "./checkbox";
import * as radioGroup from "./radio-group";
import * as switchShowcase from "./switch";
import * as select from "./select";
import * as inputOtp from "./input-otp";
import * as tooltip from "./tooltip";
import * as popover from "./popover";
import * as dialog from "./dialog";
import * as alertDialog from "./alert-dialog";
import * as sheet from "./sheet";
import * as dropdownMenu from "./dropdown-menu";
import * as collapsible from "./collapsible";
import * as tabs from "./tabs";
import * as breadcrumb from "./breadcrumb";
import * as sidebar from "./sidebar";
import * as card from "./card";
import * as table from "./table";
import * as calendar from "./calendar";
import * as copyBlock from "./copy-block";
import * as emptyState from "./empty-state";
import * as toaster from "./toaster";

export type ControlValue = string | boolean;

export type Control =
  | {
      name: string;
      label: string;
      type: "select";
      options: { value: string; label: string }[];
      defaultValue?: string;
    }
  | { name: string; label: string; type: "boolean"; defaultValue?: boolean };

export type Example = {
  /** URL-safe id for this example. */
  id: string;
  /** Short title shown on the example card. */
  title: string;
  /** Optional one-line description. */
  description?: string;
  /** The rendered example. Receives live playground state when `controls` is set. */
  render: ComponentType<{ state: Record<string, ControlValue> } & { children?: ReactNode }>;
  /** Optional live prop controls for the example. */
  controls?: Control[];
  /** Optional source snippet for the Code tab. */
  code?: string;
};

export type Showcase = {
  /** URL-safe id, used in the hash route (e.g. `#/button`). */
  path: string;
  /** Human-readable name shown in the sidebar. */
  title: string;
  /** Sidebar category. */
  group: string;
  /** Optional overview description for the component. */
  description?: string;
  /** Legacy single-example showcase. Kept until every module migrates. */
  Showcase: ComponentType;
  /** Multiple examples. When present, the detail page renders ExampleCards. */
  examples?: Example[];
};

/**
 * Ordered registry. Add a new component: create `showcases/<name>.tsx` and
 * append an entry here. The sidebar, routing, and content pane all read from
 * this array.
 *
 * Migration: older showcases export a single `Showcase` component. Newer ones
 * can export `examples: Example[]` instead. If `examples` is missing, the
 * single `Showcase` is treated as the default example.
 */
export const showcases: Showcase[] = [
  button,
  label,
  separator,
  badge,
  avatar,
  skeleton,
  progress,
  alert,
  input,
  textarea,
  checkbox,
  radioGroup,
  switchShowcase,
  select,
  inputOtp,
  tooltip,
  popover,
  dialog,
  alertDialog,
  sheet,
  dropdownMenu,
  collapsible,
  tabs,
  breadcrumb,
  sidebar,
  card,
  table,
  calendar,
  copyBlock,
  emptyState,
  toaster,
];
