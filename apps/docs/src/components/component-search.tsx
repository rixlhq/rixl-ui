import {useEffect, useRef, useState} from "react";
import {Button} from "@rixl/ui/button";
import {Input} from "@rixl/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@rixl/ui/popover";
import {matchesShowcase} from "../hooks/use-hash-route";
import {showcases} from "../showcases/registry";
import {SearchIcon} from "./icons";

export function ComponentSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const results = showcases.filter((showcase) => matchesShowcase(showcase, query)).sort((a, b) => a.title.localeCompare(b.title));

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setOpen(true);
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <PopoverTrigger
        render={
          <Button variant="outline" size="sm" className="docs-search-trigger" aria-label="Search components">
            <SearchIcon />
            <span>Search components</span>
            <kbd aria-hidden="true">⌘ K</kbd>
          </Button>
        }
      />
      <PopoverContent
        aria-label="Component search"
        align="end"
        sideOffset={8}
        initialFocus={inputRef}
        className="docs-search-popup p-0 transition-none"
      >
        <div className="p-3 border-b border-rixl-border">
          <Input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search components"
            placeholder="Find a component…"
            startIcon={<SearchIcon />}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                resultsRef.current?.querySelector("a")?.focus();
              }
              if (event.key === "Enter") {
                event.preventDefault();
                resultsRef.current?.querySelector("a")?.click();
              }
            }}
          />
        </div>
        <nav ref={resultsRef} aria-label="Component results" className="docs-search-results">
          {results.length ? (
            results.map((showcase) => (
              <a
                key={showcase.path}
                href={`#/${showcase.path}`}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
                  event.preventDefault();
                  const links = [...(resultsRef.current?.querySelectorAll("a") ?? [])];
                  const index = links.findIndex((link) => link === document.activeElement);
                  const next = index + (event.key === "ArrowDown" ? 1 : -1);
                  if (next < 0) inputRef.current?.focus();
                  else links[Math.min(next, links.length - 1)]?.focus();
                }}
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                }}
              >
                <span>{showcase.title}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))
          ) : (
            <output className="block p-4 text-sm text-rixl-fg-muted">No components found. Try a shorter search.</output>
          )}
        </nav>
      </PopoverContent>
    </Popover>
  );
}
