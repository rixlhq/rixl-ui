import {describe, expect, it} from "vitest";
import {act, render, screen} from "@testing-library/react";
import {Badge} from "../../components/badge";
import {BreadcrumbLink} from "../../components/breadcrumb";
import {Button} from "../../components/button";
import {Checkbox} from "../../components/checkbox";
import {Collapsible, CollapsibleDefaultTrigger} from "../../components/collapsible";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../components/dropdown-menu";
import {Popover, PopoverContent, PopoverTrigger} from "../../components/popover";
import {RadioGroup, RadioGroupItem} from "../../components/radio-group";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../components/select";
import {Switch} from "../../components/switch";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../components/tabs";
import {cn} from "../cn";
import {focusRing, focusRingBorderless, menuItem, popupSurface} from "../classes";

const tokens = (classes: string) => classes.split(" ");
const hasEvery = (element: Element, classes: string) => tokens(classes).every((token) => element.classList.contains(token));

describe("focusRing", () => {
  it("draws the ring and recolours the border on focus-visible", () => {
    expect(tokens(focusRing)).toEqual(
      expect.arrayContaining(["focus-visible:border-rixl-ring", "focus-visible:ring-rixl-ring/50", "focus-visible:ring-[3px]"])
    );
  });

  it("loses to a consumer class that sets the ring width", () => {
    const merged = cn(focusRing, "focus-visible:ring-0");
    expect(tokens(merged)).toContain("focus-visible:ring-0");
    expect(tokens(merged)).not.toContain("focus-visible:ring-[3px]");
  });

  it.each([
    ["Checkbox", () => <Checkbox data-testid="el" />],
    [
      "RadioGroupItem",
      () => (
        <RadioGroup>
          <RadioGroupItem value="a" data-testid="el" />
        </RadioGroup>
      ),
    ],
    ["Switch", () => <Switch data-testid="el" />],
    ["Badge", () => <Badge data-testid="el">New</Badge>],
    ["Button", () => <Button data-testid="el">Save</Button>],
    [
      "CollapsibleDefaultTrigger",
      () => (
        <Collapsible>
          <CollapsibleDefaultTrigger data-testid="el">Details</CollapsibleDefaultTrigger>
        </Collapsible>
      ),
    ],
  ])("%s carries it", (_name, ui) => {
    render(ui());
    expect(hasEvery(screen.getByTestId("el"), focusRing)).toBe(true);
  });
});

describe("focusRingBorderless", () => {
  it("draws the ring without recolouring the border", () => {
    expect(tokens(focusRingBorderless)).toEqual(["focus-visible:ring-rixl-ring/50", "focus-visible:ring-[3px]"]);
  });

  it.each([
    [
      "TabsTrigger",
      () => (
        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger value="a" data-testid="el">
              A
            </TabsTrigger>
          </TabsList>
        </Tabs>
      ),
    ],
    [
      "TabsContent",
      () => (
        <Tabs defaultValue="a">
          <TabsContent value="a" data-testid="el">
            A
          </TabsContent>
        </Tabs>
      ),
    ],
    [
      "BreadcrumbLink",
      () => (
        <BreadcrumbLink href="/" data-testid="el">
          Home
        </BreadcrumbLink>
      ),
    ],
  ])("%s carries it and keeps its own border colour", (_name, ui) => {
    render(ui());
    const element = screen.getByTestId("el");
    expect(hasEvery(element, focusRingBorderless)).toBe(true);
    expect(element.classList.contains("focus-visible:border-rixl-ring")).toBe(false);
  });
});

describe("popupSurface", () => {
  it("fades and scales in and out, and holds still under reduced motion", () => {
    expect(tokens(popupSurface)).toEqual(
      expect.arrayContaining([
        "transition-[scale,opacity]",
        "motion-reduce:transition-none",
        "data-starting-style:scale-95",
        "data-starting-style:opacity-0",
        "data-ending-style:scale-95",
        "data-ending-style:opacity-0",
        "origin-(--transform-origin)",
      ])
    );
  });

  it("loses to a consumer class that sets the radius", () => {
    const merged = cn(popupSurface, "rounded-rixl-lg");
    expect(tokens(merged)).toContain("rounded-rixl-lg");
    expect(tokens(merged)).not.toContain("rounded-rixl-md");
  });

  it.each([
    [
      "PopoverContent",
      "popover-content",
      () => (
        <Popover defaultOpen>
          <PopoverTrigger render={<button type="button">Open</button>} />
          <PopoverContent>Panel</PopoverContent>
        </Popover>
      ),
    ],
    [
      "DropdownMenuContent",
      "dropdown-menu-content",
      () => (
        <DropdownMenu open>
          <DropdownMenuTrigger render={<button type="button">Open</button>} />
          <DropdownMenuContent>Menu</DropdownMenuContent>
        </DropdownMenu>
      ),
    ],
    [
      "SelectContent",
      "select-content",
      () => (
        <Select defaultOpen defaultValue="a">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">A</SelectItem>
          </SelectContent>
        </Select>
      ),
    ],
  ])("%s carries it", async (_name, slot, ui) => {
    render(ui());
    await act(async () => {});
    expect(hasEvery(document.querySelector(`[data-slot='${slot}']`)!, popupSurface)).toBe(true);
  });
});

describe("menuItem", () => {
  it("highlights on data-highlighted and dims when disabled", () => {
    expect(tokens(menuItem)).toEqual(
      expect.arrayContaining([
        "data-highlighted:bg-rixl-surface-muted",
        "data-highlighted:text-rixl-fg",
        "data-disabled:pointer-events-none",
        "data-disabled:opacity-50",
      ])
    );
  });

  it("loses to a consumer class that sets the vertical padding", () => {
    const merged = cn(menuItem, "py-3");
    expect(tokens(merged)).toContain("py-3");
    expect(tokens(merged)).not.toContain("py-1.5");
  });

  it("is carried by every menu and listbox row", async () => {
    render(
      <>
        <DropdownMenu open>
          <DropdownMenuTrigger render={<button type="button">Open</button>} />
          <DropdownMenuContent>
            <DropdownMenuItem data-testid="item">Item</DropdownMenuItem>
            <DropdownMenuCheckboxItem data-testid="checkbox-item" checked>
              Checkbox
            </DropdownMenuCheckboxItem>
            <DropdownMenuRadioGroup value="a">
              <DropdownMenuRadioItem data-testid="radio-item" value="a">
                Radio
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger data-testid="sub-trigger">Sub</DropdownMenuSubTrigger>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
        <Select defaultOpen defaultValue="a">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem data-testid="select-item" value="a">
              A
            </SelectItem>
          </SelectContent>
        </Select>
      </>
    );
    await act(async () => {});
    for (const id of ["item", "checkbox-item", "radio-item", "sub-trigger", "select-item"]) {
      expect(hasEvery(screen.getByTestId(id), menuItem), id).toBe(true);
    }
  });
});
