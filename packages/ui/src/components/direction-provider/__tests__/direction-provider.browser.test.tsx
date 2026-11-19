import {afterEach, describe, expect, it} from "vitest";
import {userEvent} from "vitest/browser";
import {cleanup, render, screen} from "@testing-library/react";
import {Tabs, TabsList, TabsTrigger} from "../../tabs";
import {DirectionProvider} from "../index";

afterEach(cleanup);

async function focusFirstTab(direction: "ltr" | "rtl") {
  render(
    <DirectionProvider direction={direction}>
      <div dir={direction}>
        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger value="a">A</TabsTrigger>
            <TabsTrigger value="b">B</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </DirectionProvider>
  );
  screen.getByRole("tab", {name: "A"}).focus();
}

describe("DirectionProvider", () => {
  it("moves focus to the next tab with ArrowRight in LTR", async () => {
    await focusFirstTab("ltr");
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", {name: "B"})).toHaveFocus();
  });

  it("moves focus to the next tab with ArrowLeft in RTL", async () => {
    await focusFirstTab("rtl");
    await userEvent.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", {name: "B"})).toHaveFocus();
  });
});
