import {describe, it, expect, afterEach, vi} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator} from "../dropdown-menu";

function TestDropdownMenu({
  defaultOpen = false,
  onSelect = vi.fn(),
}: {
  defaultOpen?: boolean;
  onSelect?: (val: string) => void;
} = {}) {
  return (
    <div className="p-8">
      <DropdownMenu defaultOpen={defaultOpen}>
        <DropdownMenuTrigger data-testid="menu-trigger" render={<button type="button">Options</button>} />
        <DropdownMenuContent data-testid="menu-content">
          <DropdownMenuItem data-testid="item-profile" onClick={() => onSelect("profile")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem data-testid="item-settings" onClick={() => onSelect("settings")}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator data-testid="menu-separator" />
          <DropdownMenuItem data-testid="item-logout" variant="destructive" onClick={() => onSelect("logout")}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

describe("DropdownMenu Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders trigger and hides menu content by default", async () => {
    render(<TestDropdownMenu />);

    const trigger = page.getByTestId("menu-trigger");
    await expect.element(trigger).toBeVisible();
    await expect.element(trigger).toHaveAttribute("data-slot", "dropdown-menu-trigger");

    const content = page.getByTestId("menu-content");
    await expect.element(content).not.toBeInTheDocument();
  });

  it("opens menu on click and lists action items", async () => {
    render(<TestDropdownMenu />);

    const trigger = page.getByTestId("menu-trigger");
    await userEvent.click(trigger);

    const content = page.getByTestId("menu-content");
    await expect.element(content).toBeVisible();

    const profile = page.getByTestId("item-profile");
    await expect.element(profile).toBeVisible();
    await expect.element(profile).toHaveTextContent("Profile");

    const settings = page.getByTestId("item-settings");
    await expect.element(settings).toBeVisible();

    const logout = page.getByTestId("item-logout");
    await expect.element(logout).toBeVisible();
    await expect.element(logout).toHaveAttribute("data-variant", "destructive");
  });

  it("triggers callback and closes menu on item click", async () => {
    const handleSelect = vi.fn();
    render(<TestDropdownMenu onSelect={handleSelect} />);

    const trigger = page.getByTestId("menu-trigger");
    await userEvent.click(trigger);

    const profile = page.getByTestId("item-profile");
    await userEvent.click(profile);

    expect(handleSelect).toHaveBeenCalledWith("profile");

    const content = page.getByTestId("menu-content");
    await expect.element(content).not.toBeInTheDocument();
  });

  it("supports keyboard Escape key to close menu and returns focus", async () => {
    render(<TestDropdownMenu />);

    const trigger = page.getByTestId("menu-trigger");
    await userEvent.click(trigger);

    const content = page.getByTestId("menu-content");
    await expect.element(content).toBeVisible();

    await userEvent.keyboard("{Escape}");

    await expect.element(content).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });

  it("navigates items with ArrowDown and ArrowUp keys", async () => {
    render(<TestDropdownMenu />);

    const trigger = page.getByTestId("menu-trigger");
    trigger.element().focus();

    // Open menu with ArrowDown from focused trigger
    await userEvent.keyboard("{ArrowDown}");

    const profile = page.getByTestId("item-profile");
    await expect.element(profile).toHaveFocus();

    const settings = page.getByTestId("item-settings");
    await userEvent.keyboard("{ArrowDown}");
    await expect.element(settings).toHaveFocus();

    // ArrowUp moves back
    await userEvent.keyboard("{ArrowUp}");
    await expect.element(profile).toHaveFocus();
  });
});
