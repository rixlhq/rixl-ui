import {useState} from "react";

export function usePageDraft(page: number) {
  const [draft, setDraft] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState(page);
  if (prevPage !== page) {
    setPrevPage(page);
    setDraft(null);
  }
  return {value: draft ?? String(page), setDraft, resetDraft: () => setDraft(null)};
}
