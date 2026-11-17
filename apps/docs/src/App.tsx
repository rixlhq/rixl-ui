import {useDeferredValue, useEffect, useState} from "react";
import {SidebarInset, SidebarProvider} from "@rixl/ui/sidebar";
import {Toaster} from "@rixl/ui/toaster";
import {Detail} from "./components/detail";
import {Header} from "./components/header";
import {HomeGrid} from "./components/home-grid";
import {AppSidebar} from "./components/sidebar";
import {useHashRoute} from "./hooks/use-hash-route";
import {useTheme} from "./hooks/use-theme";
import {showcases} from "./showcases/registry";

export function App() {
  const [theme, setTheme] = useTheme();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const active = useHashRoute(showcases);
  const isHome = active === null;

  useEffect(() => {
    const clearSearch = () => setQuery("");
    window.addEventListener("hashchange", clearSearch);
    return () => window.removeEventListener("hashchange", clearSearch);
  }, []);

  useEffect(() => {
    window.scrollTo({top: 0});
    document.title = active ? `${active.title} · Rixl UI` : "Components · Rixl UI";
  }, [active]);

  return (
    <SidebarProvider defaultOpen className="docs-shell">
      <a
        href="#docs-main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("docs-main")?.focus();
        }}
        className="docs-skip-link"
      >
        Skip to content
      </a>
      <AppSidebar showcases={showcases} query={deferredQuery} activePath={active?.path} />
      <SidebarInset>
        <Header theme={theme} onThemeChange={setTheme} query={query} onQueryChange={setQuery} active={query.trim() ? null : active} />
        <main id="docs-main" className="docs-main" tabIndex={-1}>
          {isHome || query.trim() ? (
            <HomeGrid showcases={showcases} query={deferredQuery} onClearQuery={() => setQuery("")} />
          ) : (
            <Detail key={active.path} showcase={active} />
          )}
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
