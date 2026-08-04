import type {ComponentType} from "react";
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

export type Showcase = {
  /** URL-safe id, used in the hash route (e.g. `#/button`). */
  path: string;
  /** Human-readable name shown in the sidebar. */
  title: string;
  /** Sidebar category. */
  group: string;
  /** The showcase component. */
  Showcase: ComponentType;
};

/**
 * Ordered registry. Add a new component: import its showcase module and
 * append an entry here. The sidebar, routing, and content pane all read
 * from this array.
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
];
