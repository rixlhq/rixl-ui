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
export const showcases: Showcase[] = [button, label, separator, badge, avatar, skeleton, progress, alert, input, textarea];
