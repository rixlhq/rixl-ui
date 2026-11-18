import {describe, it, expect, afterEach, vi} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../index";

function TestSidebar({items = 40}: {items?: number} = {}) {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        {/* flex-none keeps the fixed height so `items` controls overflow. */}
        <SidebarContent data-testid="nav" className="h-64 flex-none">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {Array.from({length: items}, (_, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuButton data-testid={`item-${i}`}>Item {i}</SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div data-testid="inset" className="text-rixl-fg">
          Content
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

async function renderDesktop(options?: {items?: number}) {
  // The browser project defaults to a mobile-width viewport, which renders
  // the sheet variant. Widen first so the desktop shell under test mounts.
  await page.viewport(1280, 800);
  return render(<TestSidebar {...options} />);
}

function setTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
}

function sidebarBorderToken() {
  return getComputedStyle(document.documentElement).getPropertyValue("--rixl-sidebar-border").trim();
}

function nav() {
  const el = document.querySelector("[data-slot='sidebar-content']");
  if (!(el instanceof HTMLElement)) throw new Error("sidebar content not found");
  return el;
}

function container() {
  const el = document.querySelector("[data-slot='sidebar-container']");
  if (!(el instanceof HTMLElement)) throw new Error("sidebar container not found");
  return el;
}

describe("Sidebar Browser Mode", () => {
  afterEach(() => {
    cleanup();
    document.documentElement.removeAttribute("data-theme");
  });

  it.each(["light", "dark"] as const)("paints the desktop edge in --rixl-sidebar-border (%s)", async (theme) => {
    await renderDesktop();
    setTheme(theme);

    const style = getComputedStyle(container());
    const edge = style.borderInlineEndColor;
    expect(edge).toBe(sidebarBorderToken());
    expect(edge).not.toBe(style.color);
  });

  it("resolves the edge token differently per theme", async () => {
    await renderDesktop();
    setTheme("light");
    const light = getComputedStyle(container()).borderInlineEndColor;
    setTheme("dark");
    const dark = getComputedStyle(container()).borderInlineEndColor;
    expect(light).not.toBe(dark);
  });

  it("styles the nav scrollbar thin with a transparent track and stable gutter", async () => {
    await renderDesktop();
    setTheme("light");
    expect(nav().scrollHeight).toBeGreaterThan(nav().clientHeight);

    const style = getComputedStyle(nav());
    expect(style.scrollbarWidth).toBe("thin");
    expect(style.scrollbarGutter).toBe("stable");
    expect(style.scrollbarColor).not.toBe("auto");
    expect(style.scrollBehavior).toBe("auto");
  });

  it("keeps menu-button width stable when overflow appears", async () => {
    const {rerender} = await renderDesktop({items: 3});
    const before = document.querySelector("[data-testid='item-0']")?.getBoundingClientRect().width;

    rerender(<TestSidebar items={40} />);
    expect(nav().scrollHeight).toBeGreaterThan(nav().clientHeight);
    const after = document.querySelector("[data-testid='item-0']")?.getBoundingClientRect().width;

    expect(before).toBeGreaterThan(0);
    expect(after).toBe(before);
  });

  it("still scrolls with the keyboard", async () => {
    const {getByTestId} = await renderDesktop();
    setTheme("light");
    const scrollable = nav();
    expect(scrollable.scrollHeight).toBeGreaterThan(scrollable.clientHeight);

    // Tab through the menu exactly as a keyboard user would; the nav must
    // follow focus instead of leaving it out of view.
    await userEvent.click(getByTestId("item-0"));
    for (let i = 0; i < 12; i++) {
      await userEvent.tab();
    }

    expect(scrollable.scrollTop).toBeGreaterThan(0);
  });

  it("has no WCAG 2.2 AA violations in light or dark", async () => {
    await renderDesktop();

    setTheme("light");
    expect(await axeViolations(document.body)).toEqual([]);

    setTheme("dark");
    expect(await axeViolations(document.body)).toEqual([]);
  });

  // 400px is below Tailwind's `sm`; 700px is above it but still a mobile viewport
  // (< 768px), where the dialog edge's `sm:max-w-sm` would otherwise cap the sheet.
  it.each([
    {width: 400, side: "left"},
    {width: 700, side: "left"},
    {width: 400, side: "right"},
    {width: 700, side: "right"},
  ] as const)("sizes the open $side mobile sheet to --sidebar-width at a $width px viewport", async ({width, side}) => {
    await page.viewport(width, 800);
    render(
      <SidebarProvider>
        <Sidebar side={side}>
          <SidebarContent>Nav</SidebarContent>
        </Sidebar>
        <SidebarTrigger />
      </SidebarProvider>
    );
    await userEvent.click(page.getByRole("button", {name: "Toggle Sidebar"}));

    const sheet = await vi.waitFor(() => {
      const el = document.querySelector("[data-slot='sidebar'][data-mobile='true']");
      if (!(el instanceof HTMLElement)) throw new Error("mobile sidebar not open");
      return el;
    });
    const eighteenRem = 18 * Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
    expect(sheet.offsetWidth).toBe(eighteenRem);
  });
  describe("mobile panel", () => {
    afterEach(async () => {
      await page.viewport(1280, 720);
    });

    async function openMobile(side: "left" | "right", items = 1) {
      await page.viewport(320, 320);
      render(
        <SidebarProvider>
          <Sidebar side={side}>
            <SidebarContent>
              {Array.from({length: items}, (_, i) => (
                <p key={i} data-testid={i === items - 1 ? "last" : undefined}>
                  Item {i}
                </p>
              ))}
            </SidebarContent>
          </Sidebar>
          <SidebarTrigger />
        </SidebarProvider>
      );
      await userEvent.click(page.getByRole("button", {name: "Toggle Sidebar"}));
      const panel = page.getByRole("dialog");
      await expect.element(panel).toBeVisible();
      return panel;
    }

    it.each(["left", "right"] as const)("keeps a long %s panel in the viewport and scrolls its content to the last item", async (side) => {
      const panel = (await openMobile(side, 60)).element();
      const rect = panel.getBoundingClientRect();
      expect(rect.top).toBeGreaterThanOrEqual(-1);
      expect(rect.bottom).toBeLessThanOrEqual(window.innerHeight + 1);
      const scroller = nav();
      expect(scroller.scrollHeight).toBeGreaterThan(scroller.clientHeight);
      scroller.scrollTop = scroller.scrollHeight;
      await expect
        .poll(() => {
          const last = page.getByTestId("last").element().getBoundingClientRect();
          const bounds = scroller.getBoundingClientRect();
          return last.top >= bounds.top && last.bottom <= bounds.bottom;
        })
        .toBe(true);
    });

    it.each(["left", "right"] as const)("anchors the %s panel to its physical edge", async (side) => {
      const panel = (await openMobile(side)).element();
      await expect
        .poll(() => {
          const rect = panel.getBoundingClientRect();
          return side === "left" ? Math.round(rect.left) : Math.round(rect.right) - window.innerWidth;
        })
        .toBe(0);
    });

    it("closes on Escape and on a backdrop click", async () => {
      const panel = await openMobile("left");
      await userEvent.keyboard("{Escape}");
      await expect.element(panel).not.toBeInTheDocument();

      await userEvent.click(page.getByRole("button", {name: "Toggle Sidebar"}));
      const reopened = page.getByRole("dialog");
      await expect.element(reopened).toBeVisible();
      const overlay = document.querySelector("[data-slot='dialog-overlay']");
      if (!overlay) throw new Error("overlay not rendered");
      await userEvent.click(page.elementLocator(overlay), {position: {x: 310, y: 160}});
      await expect.element(reopened).not.toBeInTheDocument();
    });

    it("has no WCAG 2.2 AA violations when open", async () => {
      await openMobile("left");
      expect(await axeViolations(document.body)).toEqual([]);
    });
  });
});
