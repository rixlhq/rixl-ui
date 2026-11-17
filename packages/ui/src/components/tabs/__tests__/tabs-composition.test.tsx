import {createRef} from "react";
import {act, fireEvent, render, screen} from "@testing-library/react";
import {expect, it, vi} from "vitest";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "../index";

it("forwards each DOM ref while retaining the measured list", () => {
  const root = createRef<HTMLDivElement>();
  const list = createRef<HTMLDivElement>();
  const trigger = createRef<HTMLButtonElement>();
  const panel = createRef<HTMLDivElement>();
  render(
    <Tabs ref={root} defaultValue="a">
      <TabsList ref={list}>
        <TabsTrigger ref={trigger} value="a">
          Alpha
        </TabsTrigger>
      </TabsList>
      <TabsContent ref={panel} value="a">
        Content
      </TabsContent>
    </Tabs>
  );
  expect(root.current).toHaveAttribute("data-slot", "tabs");
  expect(list.current).toBe(screen.getByRole("tablist"));
  expect(trigger.current).toBe(screen.getByRole("tab"));
  expect(panel.current).toBe(screen.getByRole("tabpanel"));
});

it("detects logical RTL bounds and uses reduced-motion scroll requests", () => {
  vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({matches: true}));
  render(
    <Tabs defaultValue="a" dir="rtl">
      <TabsList style={{direction: "rtl"}}>
        <TabsTrigger value="a">Alpha</TabsTrigger>
      </TabsList>
    </Tabs>
  );
  const list = screen.getByRole("tablist");
  Object.defineProperties(list, {
    scrollWidth: {value: 400, configurable: true},
    clientWidth: {value: 100, configurable: true},
    scrollLeft: {value: -100, writable: true, configurable: true},
  });
  const scroll = vi.fn();
  list.scrollBy = scroll;
  act(() => fireEvent.scroll(list));
  expect(list).toHaveAttribute("data-overflow-start");
  expect(list).toHaveAttribute("data-overflow-end");
  screen.getByRole("button", {name: "Scroll tabs right"}).click();
  expect(scroll).toHaveBeenCalledWith({left: 80, behavior: "instant"});
});
