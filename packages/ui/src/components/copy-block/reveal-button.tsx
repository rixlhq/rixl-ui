import {EyeIcon, EyeOffIcon} from "lucide-react";
import {Button, type ButtonProps} from "../button";

type RevealButtonProps = {
  revealed: boolean;
  size: ButtonProps["size"];
  /** Already the reveal or the hide name, whichever the next press does. */
  label: string;
  /** Id of the visible title, which describes the button. */
  describedBy?: string;
  onToggle: () => void;
};

/** Shows or hides a `masked` `CopyBlock` value. Named by its next action, so it carries no pressed state. */
export function RevealButton({revealed, size, label, describedBy, onToggle}: RevealButtonProps) {
  const Icon = revealed ? EyeOffIcon : EyeIcon;
  return (
    <Button
      data-slot="copy-block-reveal-button"
      type="button"
      variant="ghost"
      shape="square"
      size={size}
      aria-label={label}
      aria-describedby={describedBy}
      onClick={onToggle}
    >
      <Icon className="text-rixl-fg-muted" aria-hidden="true" />
    </Button>
  );
}
