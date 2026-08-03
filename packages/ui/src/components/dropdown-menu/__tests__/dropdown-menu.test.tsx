import {describe, it, expect} from "vitest";
import {act, render, screen} from "@testing-library/react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../dropdown-menu";

function Basic({open}: {open?: boolean} = {}) {
  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger data-testid="trigger" render={<button type="button">Open</button>} />
      <DropdownMenuContent data-testid="content">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

describe("DropdownMenu", () => {
  it("sets data-slot='dropdown-menu-trigger' on the trigger", () => {
    render(<Basic />);
    expect(screen.getByTestId("trigger")).toHaveAttribute("data-slot", "dropdown-menu-trigger");
  });

  it("does not render content while closed", () => {
    render(<Basic />);
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
  });

  it("renders content when open", async () => {
    render(<Basic open />);
    await act(async () => {});
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("My Account")).toBeInTheDocument();
  });

  it("applies base classes to the popup", async () => {
    render(<Basic open />);
    await act(async () => {});
    const cls = screen.getByTestId("content").className;
    expect(cls).toContain("bg-rixl-surface");
    expect(cls).toContain("rounded-rixl-md");
    expect(cls).toContain("border-rixl-border");
    expect(cls).toContain("shadow-rixl-md");
    expect(cls).toContain("min-w-[8rem]");
  });

  it("marks destructive items with data-variant and danger text", async () => {
    render(<Basic open />);
    await act(async () => {});
    const item = screen.getByText("Delete");
    expect(item).toHaveAttribute("data-variant", "destructive");
    expect(item.className).toContain("text-rixl-danger");
  });

  it("renders the label with its data-slot and text size", async () => {
    render(<Basic open />);
    await act(async () => {});
    const label = screen.getByText("My Account");
    expect(label).toHaveAttribute("data-slot", "dropdown-menu-label");
    expect(label.className).toContain("font-medium");
  });

  it("renders a separator", async () => {
    render(<Basic open />);
    await act(async () => {});
    const separator = document.querySelector("[data-slot='dropdown-menu-separator']");
    expect(separator).not.toBeNull();
    expect(separator!.className).toContain("bg-rixl-border");
  });

  it("renders checkbox items with an indicator", async () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger render={<button type="button">Open</button>} />
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>Show details</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    await act(async () => {});
    const item = screen.getByText("Show details");
    expect(item).toHaveAttribute("data-slot", "dropdown-menu-checkbox-item");
    expect(item.querySelector("svg")).not.toBeNull();
  });

  it("renders radio items inside a radio group (indicator only on the selected item)", async () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger render={<button type="button">Open</button>} />
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="a">
            <DropdownMenuRadioItem value="a">Asc</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="b">Desc</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    await act(async () => {});
    const group = document.querySelector("[data-slot='dropdown-menu-radio-group']");
    expect(group).not.toBeNull();
    const selected = screen.getByText("Asc");
    expect(selected).toHaveAttribute("data-slot", "dropdown-menu-radio-item");
    expect(selected.querySelector("svg")).not.toBeNull();
    const unselected = screen.getByText("Desc");
    expect(unselected.querySelector("svg")).toBeNull();
  });

  it("renders a submenu trigger with chevron and a sub content popup", async () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger render={<button type="button">Open</button>} />
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Nested item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    await act(async () => {});
    const trigger = screen.getByText("More");
    expect(trigger).toHaveAttribute("data-slot", "dropdown-menu-sub-trigger");
    expect(trigger.querySelector("svg")).not.toBeNull();
    // Sub content is only portalled once the submenu opens.
    expect(screen.queryByText("Nested item")).not.toBeInTheDocument();
  });
});
