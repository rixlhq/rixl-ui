import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {Badge} from "../../components/badge";
import {BreadcrumbLink} from "../../components/breadcrumb";
import {Button} from "../../components/button";
import {Checkbox} from "../../components/checkbox";
import {Collapsible, CollapsibleDefaultTrigger} from "../../components/collapsible";
import {RadioGroup, RadioGroupItem} from "../../components/radio-group";
import {Switch} from "../../components/switch";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../components/tabs";
import {cn} from "../cn";
import {focusRing, focusRingBorderless} from "../classes";

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
