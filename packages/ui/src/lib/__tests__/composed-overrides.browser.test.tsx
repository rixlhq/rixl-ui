import {afterEach, describe, expect, it} from "vitest";
import {cleanup, render} from "@testing-library/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../components/dropdown-menu";
import {InputGroup, InputGroupButton, InputGroupInput} from "../../components/input-group";
import {SidebarInput} from "../../components/sidebar";
import {Tabs, TabsList, TabsTrigger} from "../../components/tabs";

const RADIUS_SM = "6px";
const RADIUS_LG = "12px";
// The rixl shadows are `oklch()` colours; `shadow-none` resolves to transparent zero-size layers.
const RIXL_SHADOW_COLOUR = "oklch";

const styleOf = (selector: string) => {
  const el = document.querySelector(selector);
  if (!el) throw new Error(`missing ${selector}`);
  return getComputedStyle(el);
};

// `cn` does not know the rixl tokens, so a component that sets a radius or shadow on top of a base that
// already sets one keeps both classes and CSS order decides. These check what the browser resolves.
describe("a radius or shadow one component sets over its base", () => {
  afterEach(cleanup);

  it("leaves InputGroupInput square and flat inside its group", () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label="Address" />
      </InputGroup>
    );
    const style = styleOf("[data-slot='input-group-input']");
    expect(style.borderRadius).toBe("0px");
    expect(style.boxShadow).not.toContain(RIXL_SHADOW_COLOUR);
  });

  it("gives InputGroupButton the small radius", () => {
    render(
      <InputGroup>
        <InputGroupButton>Go</InputGroupButton>
      </InputGroup>
    );
    expect(styleOf("[data-slot='input-group-button']").borderRadius).toBe(RADIUS_SM);
  });

  it("draws SidebarInput without the Input shadow", () => {
    render(<SidebarInput aria-label="Search" />);
    expect(styleOf("[data-slot='sidebar-input']").boxShadow).not.toContain(RIXL_SHADOW_COLOUR);
  });

  it("rounds the segmented tabs overflow control with the large radius", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
      </Tabs>
    );
    expect(styleOf("[data-slot='tabs-overflow-control']").borderRadius).toBe(RADIUS_LG);
  });

  it("gives a sub-menu the large shadow, not the menu's", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub defaultOpen>
            <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>Inner</DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    await new Promise((resolve) => setTimeout(resolve, 300));
    const menu = styleOf("[data-slot='dropdown-menu-content']").boxShadow;
    expect(styleOf("[data-slot='dropdown-menu-sub-content']").boxShadow).not.toBe(menu);
  });
});
