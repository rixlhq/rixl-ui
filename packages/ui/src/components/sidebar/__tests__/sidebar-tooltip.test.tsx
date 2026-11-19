import {describe, it, expect} from "vitest";
import {act, fireEvent, render, screen} from "@testing-library/react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  type SidebarMenuButtonProps,
} from "../index";

function Menu({defaultOpen, tooltip}: {defaultOpen: boolean; tooltip: SidebarMenuButtonProps["tooltip"]}) {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={tooltip}>Dashboard</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}

async function hover() {
  const button = screen.getByRole("button", {name: "Dashboard"});
  fireEvent.mouseEnter(button);
  fireEvent.mouseMove(button);
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 20));
  });
}

describe("SidebarMenuButton tooltip", () => {
  it("shows the string tooltip while the sidebar is collapsed", async () => {
    render(<Menu defaultOpen={false} tooltip="Go to dashboard" />);
    await hover();
    expect(screen.getByText("Go to dashboard")).toBeInTheDocument();
  });

  it("shows no tooltip while the sidebar is expanded", async () => {
    render(<Menu defaultOpen tooltip="Go to dashboard" />);
    await hover();
    expect(screen.queryByText("Go to dashboard")).not.toBeInTheDocument();
  });

  it("takes the object form with content and side", async () => {
    render(<Menu defaultOpen={false} tooltip={{content: "Go to dashboard", side: "bottom"}} />);
    await hover();
    expect(document.querySelector("[data-slot=tooltip-content]")).toHaveAttribute("data-side", "bottom");
  });
});
