import { useDeferredValue, useState } from "react";
import { SidebarInset, SidebarProvider } from "@rixl/ui/sidebar";
import { Toaster } from "@rixl/ui/toaster";
import { Detail } from "./components/detail";
import { Header } from "./components/header";
import { HomeGrid } from "./components/home-grid";
import { AppSidebar } from "./components/sidebar";
import { useHashRoute } from "./hooks/use-hash-route";
import { useTheme } from "./hooks/use-theme";
import { showcases } from "./showcases/registry";

/**
 * Rixl Studio — component playground built entirely from @rixl/ui primitives.
 */
export function App() {
  const [theme, setTheme] = useTheme();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const active = useHashRoute(showcases);
  const isHome = active === null;

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar showcases={showcases} query={deferredQuery} activePath={active?.path} />
      <SidebarInset>
        <Header
          theme={theme}
          onThemeChange={setTheme}
          query={query}
          onQueryChange={setQuery}
          active={active}
        />
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-6 sm:py-8 lg:px-10">
          {isHome ? (
            <HomeGrid
              showcases={showcases}
              query={deferredQuery}
              onClearQuery={() => setQuery("")}
            />
          ) : (
            <Detail showcase={active} />
          )}
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
