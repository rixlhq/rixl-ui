import {useEffect, useRef} from "react";
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
  const active = useHashRoute(showcases);
  const isHome = active === null;
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo({top: 0});
    mainRef.current?.querySelector("h1")?.focus({preventScroll: true});
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
      <AppSidebar showcases={showcases} activePath={active?.path} />
      <SidebarInset>
        <Header theme={theme} onThemeChange={setTheme} active={active} />
        <main ref={mainRef} id="docs-main" className="docs-main" tabIndex={-1}>
          {isHome ? <HomeGrid showcases={showcases} /> : <Detail key={active.path} showcase={active} />}
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
