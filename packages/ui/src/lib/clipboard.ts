/**
 * Copy `text` to the system clipboard. Resolves when the copy succeeds
 * and rejects on failure so callers can surface feedback (e.g. a toast).
 * Inline port of dashboard's copyToClipboard without its sonner coupling.
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (!navigator.clipboard?.writeText) {
    throw new Error("Clipboard API unavailable");
  }
  await navigator.clipboard.writeText(text);
}
