import type {BreadcrumbLabels} from "../breadcrumb/breadcrumb-labels";
import type {CopyBlockLabels} from "../copy-block/copy-block-labels";
import type {LabelLabels} from "../label/label-labels";
import type {PaginationLabels} from "../pagination/pagination-labels";

/**
 * The copy the library draws itself, grouped by component. Each component owns
 * its English defaults; the provider only overrides them. Names for parts only
 * the app can name (an icon-only close button, a sidebar toggle) are props such
 * as `aria-label`, not translations. A value is a plain string, or a function
 * for a string with interpolated values, so an app can pass compiled message
 * functions (for example Paraglide's `m.pagination_page({page})`) straight in.
 */
export type RixlTranslations = {
  breadcrumb: BreadcrumbLabels;
  copyBlock: CopyBlockLabels;
  label: LabelLabels;
  pagination: PaginationLabels;
};

/** `RixlTranslations` with every group and every string optional; a component keeps its own default for each key you leave out. */
export type RixlTranslationsPartial = {[Group in keyof RixlTranslations]?: Partial<RixlTranslations[Group]>};
