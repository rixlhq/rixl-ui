import {afterEach, describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {Sidebar, SidebarProvider, SidebarRail, SidebarTrigger} from "../index";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const spyOnWarn = () => vi.spyOn(console, "warn").mockImplementation(() => {});

describe("SidebarTrigger name", () => {
  const trigger = (props: object = {}) => (
    <SidebarProvider>
      <SidebarTrigger {...props} />
    </SidebarProvider>
  );

  it("comes from aria-label, silently", () => {
    const warn = spyOnWarn();
    render(trigger({"aria-label": "Toggle navigation"}));
    expect(screen.getByRole("button", {name: "Toggle navigation"})).toBeInTheDocument();
    expect(warn).not.toHaveBeenCalled();
  });

  it("comes from aria-labelledby, silently", () => {
    const warn = spyOnWarn();
    render(
      <>
        <span id="nav-name">Navigation</span>
        {trigger({"aria-labelledby": "nav-name"})}
      </>
    );
    expect(screen.getByRole("button", {name: "Navigation"})).toBeInTheDocument();
    expect(warn).not.toHaveBeenCalled();
  });

  it("is not named by the library, and warns naming aria-label", () => {
    const warn = spyOnWarn();
    render(trigger());
    expect(screen.getByRole("button")).not.toHaveAccessibleName();
    expect(warn).toHaveBeenCalledExactlyOnceWith(
      expect.stringMatching(/\[Rixl SidebarTrigger\].*must have an accessible name.*aria-label/)
    );
  });
});

describe("SidebarRail name", () => {
  const rail = (props: object = {}) => (
    <SidebarProvider>
      <Sidebar>
        <SidebarRail {...props} />
      </Sidebar>
    </SidebarProvider>
  );

  it("comes from aria-label, silently, and adds no title of its own", () => {
    const warn = spyOnWarn();
    render(rail({"aria-label": "Resize sidebar"}));
    const button = screen.getByRole("button", {name: "Resize sidebar", hidden: true});
    expect(button).not.toHaveAttribute("title");
    expect(warn).not.toHaveBeenCalled();
  });

  it("comes from aria-labelledby, silently", () => {
    const warn = spyOnWarn();
    render(
      <>
        <span id="rail-name">Resize</span>
        {rail({"aria-labelledby": "rail-name"})}
      </>
    );
    expect(screen.getByRole("button", {name: "Resize", hidden: true})).toBeInTheDocument();
    expect(warn).not.toHaveBeenCalled();
  });

  it("warns naming SidebarRail and aria-label when unnamed", () => {
    const warn = spyOnWarn();
    render(rail());
    expect(warn).toHaveBeenCalledExactlyOnceWith(expect.stringMatching(/\[Rixl SidebarRail\].*must have an accessible name.*aria-label/));
  });
});

describe("Sidebar mobile sheet name", () => {
  function openSheet(sidebarProps: object = {}) {
    vi.stubGlobal("innerWidth", 500);
    render(
      <SidebarProvider>
        <SidebarTrigger aria-label="Open" />
        <Sidebar {...sidebarProps} />
      </SidebarProvider>
    );
    fireEvent.click(screen.getByRole("button", {name: "Open"}));
  }

  it("comes from aria-label, silently", () => {
    const warn = spyOnWarn();
    openSheet({"aria-label": "Main navigation"});
    expect(screen.getByRole("dialog", {name: "Main navigation"})).toBeInTheDocument();
    expect(warn).not.toHaveBeenCalled();
  });

  it("comes from aria-labelledby, silently", () => {
    const warn = spyOnWarn();
    vi.stubGlobal("innerWidth", 500);
    render(
      <SidebarProvider>
        <span id="sheet-name">Site menu</span>
        <SidebarTrigger aria-label="Open" />
        <Sidebar aria-labelledby="sheet-name" />
      </SidebarProvider>
    );
    fireEvent.click(screen.getByRole("button", {name: "Open"}));
    expect(screen.getByRole("dialog", {name: "Site menu"})).toBeInTheDocument();
    expect(warn).not.toHaveBeenCalled();
  });

  it("renders no hidden title or description of its own", () => {
    spyOnWarn();
    openSheet({"aria-label": "Main navigation"});
    expect(document.querySelector("[data-slot='dialog-title'], [data-slot='dialog-description']")).toBeNull();
  });

  it("warns naming Sidebar and aria-label when unnamed", () => {
    const warn = spyOnWarn();
    openSheet();
    expect(warn).toHaveBeenCalledExactlyOnceWith(expect.stringMatching(/\[Rixl Sidebar\].*must have an accessible name.*aria-label/));
  });

  it("does not warn on desktop, where the sidebar is not a dialog", () => {
    const warn = spyOnWarn();
    vi.stubGlobal("innerWidth", 1280);
    render(
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
    );
    expect(warn).not.toHaveBeenCalled();
  });
});
