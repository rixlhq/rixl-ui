import {afterEach, describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {RixlLocaleProvider} from "../../locale";
import {Sidebar, SidebarProvider, SidebarRail, SidebarTrigger} from "../index";

afterEach(() => vi.unstubAllGlobals());

const german = {sidebar: {toggle: "Seitenleiste umschalten", title: "Seitenleiste", description: "Zeigt die mobile Seitenleiste."}};

describe("SidebarTrigger labels", () => {
  it("is named in English by default", () => {
    render(
      <SidebarProvider>
        <SidebarTrigger />
      </SidebarProvider>
    );
    expect(screen.getByRole("button", {name: "Toggle Sidebar"})).toBeInTheDocument();
  });

  it("takes the provider's string", () => {
    render(
      <RixlLocaleProvider translations={german}>
        <SidebarProvider>
          <SidebarTrigger />
        </SidebarProvider>
      </RixlLocaleProvider>
    );
    expect(screen.getByRole("button", {name: "Seitenleiste umschalten"})).toBeInTheDocument();
  });

  it("lets labels beat the provider", () => {
    render(
      <RixlLocaleProvider translations={german}>
        <SidebarProvider>
          <SidebarTrigger labels={{toggle: "Menü"}} />
        </SidebarProvider>
      </RixlLocaleProvider>
    );
    expect(screen.getByRole("button", {name: "Menü"})).toBeInTheDocument();
  });
});

describe("SidebarRail labels", () => {
  const rail = (props: {labels?: {toggle?: string}}) => (
    <SidebarProvider>
      <Sidebar>
        <SidebarRail {...props} />
      </Sidebar>
    </SidebarProvider>
  );

  it("names the rail and gives it a title in English by default", () => {
    render(rail({}));
    expect(screen.getByRole("button", {name: "Toggle Sidebar", hidden: true})).toHaveAttribute("title", "Toggle Sidebar");
  });

  it("takes the provider's string for the name and the title", () => {
    render(<RixlLocaleProvider translations={german}>{rail({})}</RixlLocaleProvider>);
    expect(screen.getByRole("button", {name: "Seitenleiste umschalten", hidden: true})).toHaveAttribute("title", "Seitenleiste umschalten");
  });

  it("lets labels beat the provider", () => {
    render(<RixlLocaleProvider translations={german}>{rail({labels: {toggle: "Menü"}})}</RixlLocaleProvider>);
    expect(screen.getByRole("button", {name: "Menü", hidden: true})).toBeInTheDocument();
  });
});

describe("Sidebar mobile sheet labels", () => {
  function openSheet(translations: object, labels?: {title?: string}) {
    vi.stubGlobal("innerWidth", 500);
    render(
      <RixlLocaleProvider translations={translations}>
        <SidebarProvider>
          <SidebarTrigger />
          <Sidebar labels={labels} />
        </SidebarProvider>
      </RixlLocaleProvider>
    );
    fireEvent.click(screen.getByRole("button"));
  }

  it("names the sheet and describes it in English by default", () => {
    openSheet({});
    expect(screen.getByRole("dialog", {name: "Sidebar", description: "Displays the mobile sidebar."})).toBeInTheDocument();
  });

  it("takes the provider's strings", () => {
    openSheet(german);
    expect(screen.getByRole("dialog", {name: "Seitenleiste", description: "Zeigt die mobile Seitenleiste."})).toBeInTheDocument();
  });

  it("lets labels beat the provider and keeps the provider's other string", () => {
    openSheet(german, {title: "Navigation"});
    expect(screen.getByRole("dialog", {name: "Navigation", description: "Zeigt die mobile Seitenleiste."})).toBeInTheDocument();
  });
});
