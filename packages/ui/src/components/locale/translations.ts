/**
 * Every string the library renders on its own. A value is a plain string, or a
 * function for a string with interpolated values, so an app can pass compiled
 * message functions (for example Paraglide's `m.copy_copied()`) straight in.
 */
export type RixlTranslations = {
  breadcrumb: {
    /** Accessible name of the `Breadcrumb` landmark; its `aria-label` prop wins. */
    label: string;
  };
  copyBlock: {
    /** Accessible name of the copy button and its idle tooltip. */
    copy: (title: string) => string;
    copying: string;
    copied: string;
    error: string;
  };
  input: {
    /** Shown after the label when `required` is `false`. */
    optional: string;
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
};

/** `RixlTranslations` with every group and every string optional; unspecified keys fall back to English. */
export type RixlTranslationsPartial = {[Group in keyof RixlTranslations]?: Partial<RixlTranslations[Group]>};

export const DEFAULT_TRANSLATIONS: RixlTranslations = {
  breadcrumb: {label: "breadcrumb"},
  copyBlock: {copy: (title) => `Copy ${title}`, copying: "Copying", copied: "Copied!", error: "Unable to copy. Try again."},
  input: {optional: "(optional)"},
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
};
