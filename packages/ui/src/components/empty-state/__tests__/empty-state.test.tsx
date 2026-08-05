import {describe, it, expect, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import {EmptyState} from "../empty-state";

describe("EmptyState", () => {
  it("renders title and description without an action", () => {
    render(<EmptyState title="No projects" description="Create one to get started." />);
    expect(screen.getByText("No projects")).toBeInTheDocument();
    expect(screen.getByText("Create one to get started.")).toBeInTheDocument();
  });

  it("renders the action button and fires onClick", () => {
    const onClick = vi.fn();
    render(<EmptyState title="No projects" description="Create one to get started." action={{label: "New project", onClick}} />);
    const button = screen.getByRole("button", {name: /new project/i});
    button.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies rixl tokens to the muted description", () => {
    render(<EmptyState title="Empty" description="Nothing here." />);
    const p = screen.getByText("Nothing here.");
    expect(p.className).toContain("text-rixl-fg-muted");
  });

  it("uses a custom icon", () => {
    const CustomIcon = () => <svg data-testid="custom-icon" />;
    render(<EmptyState title="Empty" description="Nothing here." icon={CustomIcon} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });
});
