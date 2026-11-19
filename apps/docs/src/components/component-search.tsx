import {useEffect, useRef, useState} from "react";
import {Button} from "@rixl/ui/button";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@rixl/ui/input-group";
import {Popover, PopoverContent, PopoverTrigger} from "@rixl/ui/popover";
import {matchesShowcase} from "../hooks/use-hash-route";
import {showcases} from "../showcases/registry";
import {ArrowRightIcon, SearchIcon} from "./icons";

export function ComponentSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigated = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const results = showcases.filter((showcase) => matchesShowcase(showcase, query)).sort((a, b) => a.title.localeCompare(b.title));

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        navigated.current = false;
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
        if (next) navigated.current = false;
        if (!next) setQuery("");
      }}
    >
      <PopoverTrigger
        render={
          <Button ref={triggerRef} variant="outline" size="sm" className="docs-search-trigger">
            <SearchIcon />
            <span className="max-[540px]:sr-only">Search components</span>
            <kbd aria-hidden="true">⌘ K</kbd>
          </Button>
        }
      />
      <PopoverContent
        aria-label="Component search"
        align="end"
        sideOffset={8}
        initialFocus={inputRef}
        finalFocus={() => {
          if (!navigated.current) return triggerRef.current;
          return document.querySelector<HTMLElement>("#docs-main h1") ?? true;
        }}
        className="docs-search-popup p-0 transition-none"
      >
        <div className="p-3 border-b border-rixl-border">
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search components"
              placeholder="Find a component…"
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
          </InputGroup>
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
                  navigated.current = true;
                  setOpen(false);
                  setQuery("");
                }}
              >
                <span>{showcase.title}</span>
                <ArrowRightIcon />
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
