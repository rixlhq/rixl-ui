/**
 * Every string the library renders on its own. A value is a plain string, or a
 * function for a string with interpolated values, so an app can pass compiled
 * message functions (for example Paraglide's `m.copy_copied()`) straight in.
 */
export type RixlTranslations = {
  breadcrumb: {
    /** Accessible name of the `Breadcrumb` landmark; its `aria-label` prop wins. */
    label: string;
    /** Screen-reader text of `BreadcrumbEllipsis`. */
    more: string;
  };
  copyBlock: {
    /** Accessible name of the copy button and its idle tooltip. */
    copy: (title: string) => string;
    copying: string;
    copied: string;
    error: string;
  };
  datePicker: {
    previousMonth: string;
    nextMonth: string;
  };
  dialog: {
    /** Screen-reader text of the close button. */
    close: string;
  };
  empty: {
    /** Title of the block that shows `commandLine`. */
    command: string;
  };
  input: {
    /** Shown after the label when `required` is `false`. */
    optional: string;
    /** Accessible name of the `labelTooltip` trigger. */
    moreInformation: string;
  };
  pagination: {
    /** Accessible name of the nav landmark. */
    navigation: string;
    firstPage: string;
    previousPage: string;
    nextPage: string;
    lastPage: string;
    /** Accessible name of the page input and the page dropdown. */
    pageNumber: string;
    /** Visible and accessible name of the page-size Select. */
    pageSize: string;
    /** Default info text when the total is unknown. */
    page: (page: number) => string;
    /** Default info text for a known total; `range` is already formatted, for example `21–25`. */
    showing: (range: string, total: number) => string;
  };
  sidebar: {
    /** Name of the trigger and the rail. */
    toggle: string;
    /** Title of the mobile sidebar sheet, announced by screen readers. */
    title: string;
    /** Description of the mobile sidebar sheet. */
    description: string;
  };
  tabs: {
    scrollLeft: string;
    scrollRight: string;
  };
  toaster: {
    /** Name of the toast region. */
    notifications: string;
    /** Name of each toast's close button. */
    closeToast: string;
  };
};

/** `RixlTranslations` with every group and every string optional; unspecified keys fall back to English. */
export type RixlTranslationsPartial = {[Group in keyof RixlTranslations]?: Partial<RixlTranslations[Group]>};

export const DEFAULT_TRANSLATIONS: RixlTranslations = {
  breadcrumb: {label: "breadcrumb", more: "More"},
  copyBlock: {copy: (title) => `Copy ${title}`, copying: "Copying", copied: "Copied!", error: "Unable to copy. Try again."},
  datePicker: {previousMonth: "Go to the Previous Month", nextMonth: "Go to the Next Month"},
  dialog: {close: "Close"},
  empty: {command: "Command"},
  input: {optional: "(optional)", moreInformation: "More information"},
  pagination: {
    navigation: "Pagination",
    firstPage: "Go to first page",
    previousPage: "Go to previous page",
    nextPage: "Go to next page",
    lastPage: "Go to last page",
    pageNumber: "Page number",
    pageSize: "Rows per page",
    page: (page) => `Page ${page}`,
    showing: (range, total) => `Showing ${range} of ${total}`,
  },
  sidebar: {toggle: "Toggle Sidebar", title: "Sidebar", description: "Displays the mobile sidebar."},
  tabs: {scrollLeft: "Scroll tabs left", scrollRight: "Scroll tabs right"},
  toaster: {notifications: "Notifications", closeToast: "Close toast"},
};
