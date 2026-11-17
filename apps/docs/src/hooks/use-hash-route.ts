import {useEffect, useState} from "react";
import type {Showcase} from "../showcases/registry";

function readHash(): string {
  if (typeof window === "undefined") return "";
  return window.location.hash.replace(/^#\/?/, "");
}

export function useHashRoute(showcases: Showcase[]): Showcase | null {
  const [path, setPath] = useState<string>(() => readHash());

  useEffect(() => {
    const onChange = () => setPath(readHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  if (path === "") return null;
  return showcases.find((s) => s.path === path) ?? null;
}

export function matchesShowcase(showcase: Showcase, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  return showcase.title.toLowerCase().includes(q) || (showcase.description?.toLowerCase().includes(q) ?? false);
}
