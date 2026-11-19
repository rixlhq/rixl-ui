import type {ReactNode} from "react";
import {useWarnMissingName} from "../../lib/warn-missing-name";
import {useTranslations} from "../locale/use-translations";
import {LabelAddons} from "./label-addons";
import {DEFAULT_LABEL_LABELS, type LabelLabels} from "./label-labels";

type FieldLabelContentProps = {
  /** The component the app rendered, named in the missing-name warning. */
  component: string;
  children: ReactNode;
  /** `false` shows the optional marker; `true` and `undefined` show nothing. */
  required?: boolean;
  labelTooltip?: ReactNode;
  labelTooltipAriaLabel?: string;
  labels?: Partial<LabelLabels>;
};

/** The inside of a field's `Field.Label`: the label text, the optional marker for `required={false}`, and the `labelTooltip` trigger. */
export function FieldLabelContent({component, children, required, labelTooltip, labelTooltipAriaLabel, labels}: FieldLabelContentProps) {
  const t = useTranslations("label", DEFAULT_LABEL_LABELS, labels);
  useWarnMissingName(Boolean(labelTooltip) && !labelTooltipAriaLabel, {
    component,
    subject: "The labelTooltip trigger",
    fix: `Set labelTooltipAriaLabel: <${component} labelTooltip='…' labelTooltipAriaLabel='About this field' />.`,
  });
  return (
    <span className="inline-flex items-center gap-1.5">
      {children}
      <LabelAddons optional={required === false ? t.optional : undefined} tooltip={labelTooltip} tooltipAriaLabel={labelTooltipAriaLabel} />
    </span>
  );
}
