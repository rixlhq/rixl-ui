export type CopyBlockLabels = {
  /** Accessible name of the copy button, and the default tooltip text. */
  copyAction: string;
  /** Announced to screen readers after a copy, and the default tooltip text then. */
  copied: string;
  /** Accessible name of the button that shows a `masked` value. */
  revealAction: string;
  /** Accessible name of the button that hides a revealed `masked` value again. */
  hideAction: string;
};

export const DEFAULT_COPY_BLOCK_LABELS: CopyBlockLabels = {
  copyAction: "Copy to clipboard",
  copied: "Copied",
  revealAction: "Reveal value",
  hideAction: "Hide value",
};
