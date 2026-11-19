import {describe, expect, it} from "vitest";
import {act, render, screen} from "@testing-library/react";
import {Badge} from "../../components/badge";
import {BreadcrumbLink, BreadcrumbSeparator} from "../../components/breadcrumb";
import {Button} from "../../components/button";
import {Checkbox} from "../../components/checkbox";
import {Input} from "../../components/input";
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
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "../../components/sidebar";
import {
  focusRing,
  focusRingBorderless,
  indicatorPop,
  invalidRing,
  menuItem,
  popupSurface,
  pressable,
  pressFeedback,
  rtlFlip,
  toggleControl,
} from "../classes";

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
    ["Input", () => <Input aria-label="Name" data-testid="el" />],
    [
      "SelectTrigger",
      () => (
        <Select>
          <SelectTrigger aria-label="Fruit" data-testid="el">
            <SelectValue />
          </SelectTrigger>
        </Select>
      ),
    ],
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

const radio = () => (
  <RadioGroup>
    <RadioGroupItem value="a" data-testid="el" />
  </RadioGroup>
);

describe("pressFeedback", () => {
  it("scales to the press token and holds still under reduced motion", () => {
    expect(tokens(pressFeedback)).toEqual(["active:scale-[var(--rixl-press-scale)]", "motion-reduce:active:scale-100"]);
  });

  it("loses to a consumer class that sets the press scale", () => {
    const merged = cn(pressFeedback, "active:scale-100");
    expect(tokens(merged)).toContain("active:scale-100");
    expect(tokens(merged)).not.toContain("active:scale-[var(--rixl-press-scale)]");
  });

  it.each([
    ["Checkbox", () => <Checkbox data-testid="el" />],
    ["RadioGroupItem", radio],
    ["Switch", () => <Switch data-testid="el" />],
    ["Button", () => <Button data-testid="el">Save</Button>],
    [
      "SelectTrigger",
      () => (
        <Select>
          <SelectTrigger aria-label="Fruit" data-testid="el">
            <SelectValue />
          </SelectTrigger>
        </Select>
      ),
    ],
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
      "SidebarMenuButton",
      () => (
        <SidebarProvider>
          <Sidebar collapsible="none">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton data-testid="el">Home</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </Sidebar>
        </SidebarProvider>
      ),
    ],
    [
      "SidebarMenuSubButton",
      () => (
        <SidebarProvider>
          <Sidebar collapsible="none">
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton data-testid="el">Sub</SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </Sidebar>
        </SidebarProvider>
      ),
    ],
  ])("%s carries it", (_name, ui) => {
    render(ui());
    expect(hasEvery(screen.getByTestId("el"), pressFeedback)).toBe(true);
  });
});

describe("pressable", () => {
  it("adds the transition that animates the press to the press feedback", () => {
    expect(tokens(pressable)).toEqual(
      expect.arrayContaining([...tokens(pressFeedback), "transition-[scale,background-color,box-shadow,border-color,color]"])
    );
  });
});

describe("invalidRing", () => {
  it("colours the ring and the border danger on aria-invalid", () => {
    expect(tokens(invalidRing)).toEqual(["aria-invalid:ring-rixl-danger/20", "aria-invalid:border-rixl-danger"]);
  });

  it.each([
    ["Checkbox", () => <Checkbox data-testid="el" />],
    ["RadioGroupItem", radio],
    ["Button", () => <Button data-testid="el">Save</Button>],
    ["Input", () => <Input aria-label="Name" data-testid="el" />],
  ])("%s carries it", (_name, ui) => {
    render(ui());
    expect(hasEvery(screen.getByTestId("el"), invalidRing)).toBe(true);
  });
});

describe("toggleControl", () => {
  it("is a bordered, shadowed, focus-ringed control that dims and stops pressing when disabled", () => {
    expect(tokens(toggleControl)).toEqual(
      expect.arrayContaining([
        "border",
        "border-rixl-border",
        "shadow-xs",
        "outline-none",
        "touch-manipulation",
        "data-disabled:cursor-not-allowed",
        "data-disabled:opacity-50",
        "data-disabled:active:scale-100",
        ...tokens(pressFeedback),
        ...tokens(focusRing),
      ])
    );
  });

  it.each([
    ["Checkbox", () => <Checkbox data-testid="el" />],
    ["RadioGroupItem", radio],
    ["Switch", () => <Switch data-testid="el" />],
  ])("%s carries it", (_name, ui) => {
    render(ui());
    const element = screen.getByTestId("el");
    // Switch sets its own transparent border, which replaces the base border colour.
    const base = tokens(toggleControl).filter((token) => token !== "border-rixl-border");
    expect(hasEvery(element, base.join(" "))).toBe(true);
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
    const merged = cn(popupSurface, "rounded-lg");
    expect(tokens(merged)).toContain("rounded-lg");
    expect(tokens(merged)).not.toContain("rounded-md");
  });

  it("loses to a consumer class that sets the shadow", () => {
    const merged = cn(popupSurface, "shadow-lg");
    expect(tokens(merged)).toContain("shadow-lg");
    expect(tokens(merged)).not.toContain("shadow-md");
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

describe("indicatorPop", () => {
  it("scales and fades on mount and unmount, and holds still under reduced motion", () => {
    expect(tokens(indicatorPop)).toEqual(
      expect.arrayContaining([
        "transition-[scale,opacity]",
        "motion-reduce:transition-none",
        "data-starting-style:scale-50",
        "data-starting-style:opacity-0",
        "data-ending-style:scale-50",
        "data-ending-style:opacity-0",
      ])
    );
  });

  it("is carried by the Checkbox, RadioGroup and DropdownMenu indicators", async () => {
    render(
      <>
        <Checkbox defaultChecked />
        <RadioGroup defaultValue="a">
          <RadioGroupItem value="a" />
        </RadioGroup>
        <DropdownMenu open>
          <DropdownMenuTrigger render={<button type="button">Open</button>} />
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem data-testid="checkbox-item" checked>
              Checkbox
            </DropdownMenuCheckboxItem>
            <DropdownMenuRadioGroup value="a">
              <DropdownMenuRadioItem data-testid="radio-item" value="a">
                Radio
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
    await act(async () => {});
    const indicators = {
      checkbox: document.querySelector("[data-slot='checkbox-indicator']"),
      radio: document.querySelector("[data-slot='radio-group-indicator']"),
      "dropdown checkbox item": screen.getByTestId("checkbox-item").querySelector("svg")?.parentElement,
      "dropdown radio item": screen.getByTestId("radio-item").querySelector("svg")?.parentElement,
    };
    for (const [name, indicator] of Object.entries(indicators)) {
      expect(indicator && hasEvery(indicator, indicatorPop), name).toBe(true);
    }
  });
});

describe("rtlFlip", () => {
  it("mirrors the element on the x axis under dir=rtl", () => {
    expect(rtlFlip).toBe("rtl:-scale-x-100");
  });

  it("survives a consumer class that sets another scale", () => {
    expect(tokens(cn(rtlFlip, "scale-110"))).toContain(rtlFlip);
  });

  it("is carried by the default breadcrumb separator and not by a custom one", () => {
    render(
      <>
        <BreadcrumbSeparator data-testid="default" />
        <BreadcrumbSeparator data-testid="custom">/</BreadcrumbSeparator>
      </>
    );
    expect(screen.getByTestId("default").querySelector("svg")).toHaveClass(rtlFlip);
    expect(screen.getByTestId("custom").querySelector("svg")).toBeNull();
  });
});
