import {afterEach, describe, expect, it} from "vitest";
import {page} from "vitest/browser";
import {cleanup, render} from "@testing-library/react";
import {InboxIcon} from "lucide-react";
import {axeViolations} from "../../../../test/a11y";
import {Button} from "../../button";
import {Empty} from "../empty";

describe("Empty Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("has no axe violations with every part rendered", async () => {
    render(
      <Empty
        title="No apps yet"
        description="Create your first app from the terminal."
        icon={<InboxIcon />}
        commandLine="npm create rixl"
        action={<Button>Read the docs</Button>}
      />
    );
    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("exposes the command copy button and the action by role", async () => {
    render(<Empty title="No apps yet" commandLine="npm create rixl" action={<Button>Read the docs</Button>} />);
    await expect.element(page.getByRole("button", {name: "Copy to clipboard"})).toBeVisible();
    await expect.element(page.getByRole("button", {name: "Read the docs"})).toBeVisible();
  });
});
