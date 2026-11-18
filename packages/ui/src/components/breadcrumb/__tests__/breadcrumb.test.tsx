import {createRef} from "react";
import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "../breadcrumb";

function Basic() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" data-testid="link">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage data-testid="page">Current</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

describe("Breadcrumb", () => {
  it("sets the aria-label and data-slot on the nav", () => {
    render(<Basic />);
    const nav = document.querySelector("[data-slot='breadcrumb']");
    expect(nav).toHaveAttribute("aria-label", "breadcrumb");
  });

  it("applies base classes to the list", () => {
    render(<Basic />);
    const cls = document.querySelector("[data-slot='breadcrumb-list']")!.className;
    expect(cls).toContain("text-rixl-fg-muted");
    expect(cls).toContain("flex-wrap");
  });

  it("renders BreadcrumbLink as an anchor with data-slot", () => {
    render(<Basic />);
    const link = screen.getByTestId("link");
    expect(link).toHaveAttribute("data-slot", "breadcrumb-link");
    expect(link.tagName).toBe("A");
  });

  it("marks BreadcrumbPage as current with aria-current", () => {
    render(<Basic />);
    const page = screen.getByTestId("page");
    expect(page).toHaveAttribute("data-slot", "breadcrumb-page");
    expect(page).toHaveAttribute("aria-current", "page");
    expect(page).toHaveAttribute("aria-disabled", "true");
  });

  it("renders a default ChevronRight separator", () => {
    render(<Basic />);
    const sep = document.querySelector("[data-slot='breadcrumb-separator']")!;
    expect(sep).toHaveAttribute("data-slot", "breadcrumb-separator");
    expect(sep).toHaveAttribute("aria-hidden", "true");
    expect(sep.querySelector("svg")).not.toBeNull();
  });

  it("supports a custom separator", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Docs</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    const sep = document.querySelector("[data-slot='breadcrumb-separator']")!;
    expect(sep.textContent).toBe("/");
  });

  it("renders BreadcrumbEllipsis", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbEllipsis data-testid="ellipsis" />
        </BreadcrumbList>
      </Breadcrumb>
    );
    const el = screen.getByTestId("ellipsis");
    expect(el).toHaveAttribute("data-slot", "breadcrumb-ellipsis");
    expect(el.querySelector("svg")).not.toBeNull();
  });

  it("forwards a className on BreadcrumbLink", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="max-w-md" data-testid="link">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    const cls = screen.getByTestId("link").className;
    expect(cls).toContain("max-w-md");
    expect(cls).toContain("hover:text-rixl-fg");
  });

  it("forwards a ref from each part to its element", () => {
    const refs = {
      nav: createRef<HTMLElement>(),
      list: createRef<HTMLOListElement>(),
      item: createRef<HTMLLIElement>(),
      link: createRef<HTMLAnchorElement>(),
      page: createRef<HTMLSpanElement>(),
      separator: createRef<HTMLLIElement>(),
      ellipsis: createRef<HTMLSpanElement>(),
    };
    render(
      <Breadcrumb ref={refs.nav}>
        <BreadcrumbList ref={refs.list}>
          <BreadcrumbItem ref={refs.item}>
            <BreadcrumbLink ref={refs.link} href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator ref={refs.separator} />
          <BreadcrumbEllipsis ref={refs.ellipsis} />
          <BreadcrumbItem>
            <BreadcrumbPage ref={refs.page}>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    const tags = Object.fromEntries(Object.entries(refs).map(([name, ref]) => [name, ref.current?.tagName]));
    expect(tags).toEqual({nav: "NAV", list: "OL", item: "LI", link: "A", page: "SPAN", separator: "LI", ellipsis: "SPAN"});
  });

  it("names every part for devtools", () => {
    const parts = [Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis];
    expect(parts.map((part) => part.displayName)).toEqual([
      "Breadcrumb",
      "BreadcrumbList",
      "BreadcrumbItem",
      "BreadcrumbLink",
      "BreadcrumbPage",
      "BreadcrumbSeparator",
      "BreadcrumbEllipsis",
    ]);
  });
});
