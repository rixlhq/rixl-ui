import type {ComponentType, ReactNode} from "react";
import * as button from "./button";
import * as buttonGroup from "./button-group";
import * as label from "./label";
import * as separator from "./separator";
import * as badge from "./badge";
import * as avatar from "./avatar";
import * as skeleton from "./skeleton";
import * as progress from "./progress";
import * as alert from "./alert";
import * as input from "./input";
import * as inputGroup from "./input-group";
import * as inputArea from "./input-area";
import * as checkbox from "./checkbox";
import * as radioGroup from "./radio-group";
import * as switchShowcase from "./switch";
import * as select from "./select";
import * as inputOtp from "./input-otp";
import * as tooltip from "./tooltip";
import * as popover from "./popover";
import * as dialog from "./dialog";
import * as dropdownMenu from "./dropdown-menu";
import * as collapsible from "./collapsible";
import * as tabs from "./tabs";
import * as breadcrumb from "./breadcrumb";
import * as sidebar from "./sidebar";
import * as card from "./card";
import * as table from "./table";
import * as pagination from "./pagination";
import * as datePicker from "./date-picker";
import * as copyBlock from "./copy-block";
import * as empty from "./empty";
import * as toaster from "./toaster";
import * as locale from "./locale";
import * as direction from "./direction";

export type ControlValue = string | boolean;

export type Control =
  | {
      name: string;
      label: string;
      type: "select";
      options: {value: string; label: string}[];
      defaultValue?: string;
    }
  | {name: string; label: string; type: "boolean"; defaultValue?: boolean};

export type Example = {
  /** URL-safe id for this example. */
  id: string;
  /** Short title shown on the example card. */
  title: string;
  /** Optional one-line description. */
  description?: string;
  /** The rendered example. Receives live control state when `controls` is set. */
  render: ComponentType<{state: Record<string, ControlValue>} & {children?: ReactNode}>;
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
  /** Optional overview description for the component. */
  description?: string;
  /** Technical details shown after the examples. */
  notes?: string;
  /** Compact preview rendered on the home grid card. */
  Showcase: ComponentType;
  /** The examples the detail page renders as ExampleCards. */
  examples: Example[];
};

/**
 * Ordered registry. Add a new component: create `showcases/<name>.tsx` and
 * append an entry here. The sidebar, routing, and content pane all read from
 * this array.
 */
export const showcases: Showcase[] = [
  button,
  buttonGroup,
  label,
  separator,
  badge,
  avatar,
  skeleton,
  progress,
  alert,
  input,
  inputGroup,
  inputArea,
  checkbox,
  radioGroup,
  switchShowcase,
  select,
  inputOtp,
  tooltip,
  popover,
  dialog,
  dropdownMenu,
  collapsible,
  tabs,
  breadcrumb,
  sidebar,
  card,
  table,
  pagination,
  datePicker,
  copyBlock,
  empty,
  toaster,
  locale,
  direction,
];
