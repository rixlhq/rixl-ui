import {describe, it, expect} from "vitest";
import {act, render, screen} from "@testing-library/react";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "../tabs";

function Basic() {
  return (
    <Tabs defaultValue="account" data-testid="root">
      <TabsList>
        <TabsTrigger value="account" data-testid="tab-account">
          Account
        </TabsTrigger>
        <TabsTrigger value="password" data-testid="tab-password">
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" data-testid="content-account">
        Account panel
      </TabsContent>
      <TabsContent value="password" data-testid="content-password">
        Password panel
      </TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("sets data-slot markers on root, list, trigger, and content", () => {
    render(<Basic />);
    expect(screen.getByTestId("root")).toHaveAttribute("data-slot", "tabs");
    expect(document.querySelector("[data-slot='tabs-list']")).toHaveAttribute("data-slot", "tabs-list");
    expect(screen.getByTestId("tab-account")).toHaveAttribute("data-slot", "tabs-trigger");
    expect(screen.getByTestId("content-account")).toHaveAttribute("data-slot", "tabs-content");
  });

  it("applies base classes to the list", () => {
    render(<Basic />);
    const cls = document.querySelector("[data-slot='tabs-list']")!.className;
    expect(cls).toContain("bg-rixl-surface-muted");
    expect(cls).toContain("text-rixl-fg-muted");
    expect(cls).toContain("rounded-rixl-lg");
  });

  it("activates the matching trigger via data-active", () => {
    render(<Basic />);
    expect(screen.getByTestId("tab-account")).toHaveAttribute("data-active");
    expect(screen.getByTestId("tab-password")).not.toHaveAttribute("data-active");
  });

  it("applies active classes to the selected trigger", () => {
    render(<Basic />);
    const cls = screen.getByTestId("tab-account").className;
    expect(cls).toContain("data-active:bg-rixl-bg");
  });

  it("switches the active trigger on click", () => {
    render(<Basic />);
    act(() => screen.getByTestId("tab-password").click());
    expect(screen.getByTestId("tab-password")).toHaveAttribute("data-active");
    expect(screen.getByTestId("tab-account")).not.toHaveAttribute("data-active");
  });

  it("renders the active content panel", () => {
    render(<Basic />);
    expect(screen.getByText("Account panel")).toBeInTheDocument();
  });

  it("forwards an additional className on the trigger", () => {
    render(
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account" data-testid="tab-account" className="max-w-xs">
            Account
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );
    const cls = screen.getByTestId("tab-account").className;
    expect(cls).toContain("max-w-xs");
    expect(cls).toContain("rounded-rixl-md");
  });
});
