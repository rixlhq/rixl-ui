import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage} from "../breadcrumb";

describe("Breadcrumb size", () => {
  it("defaults to base: text-sm", () => {
    render(<Breadcrumb />);
    expect(screen.getByRole("navigation").className).toContain("text-sm");
  });

  it("sm sets text-xs", () => {
    render(<Breadcrumb size="sm" />);
    expect(screen.getByRole("navigation").className).toContain("text-xs");
  });

  it("lets a consumer className win over the size", () => {
    render(<Breadcrumb size="sm" className="text-base" />);
    expect(screen.getByRole("navigation").className).not.toContain("text-xs");
  });

  it("does not leak size onto the nav element as an attribute", () => {
    render(<Breadcrumb size="sm" />);
    expect(screen.getByRole("navigation")).not.toHaveAttribute("size");
  });
});

describe("BreadcrumbLink icon", () => {
  it("renders the icon before the text, inside the link", () => {
    render(
      <BreadcrumbLink href="/" icon={<svg data-testid="icon" />}>
        Home
      </BreadcrumbLink>
    );
    const link = screen.getByRole("link", {name: "Home"});
    expect(link).toContainElement(screen.getByTestId("icon"));
    expect(link.firstElementChild).toHaveAttribute("data-slot", "breadcrumb-icon");
  });

  it("hides the icon from assistive tech", () => {
    render(
      <BreadcrumbLink href="/" icon={<svg data-testid="icon" />}>
        Home
      </BreadcrumbLink>
    );
    expect(screen.getByTestId("icon").closest("[data-slot='breadcrumb-icon']")).toHaveAttribute("aria-hidden", "true");
  });

  it("renders no icon slot without an icon", () => {
    render(<BreadcrumbLink href="/">Home</BreadcrumbLink>);
    expect(document.querySelector("[data-slot='breadcrumb-icon']")).toBeNull();
  });

  it("still renders through a render prop", () => {
    render(
      <BreadcrumbLink render={<a href="/x" data-testid="custom" />} icon={<svg data-testid="icon" />}>
        Home
      </BreadcrumbLink>
    );
    expect(screen.getByTestId("custom")).toContainElement(screen.getByTestId("icon"));
  });
});

describe("BreadcrumbPage icon and loading", () => {
  it("renders the icon before the current page text", () => {
    render(<BreadcrumbPage icon={<svg data-testid="icon" />}>Now</BreadcrumbPage>);
    expect(screen.getByText("Now")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("loading replaces the text with a placeholder and drops aria-current", () => {
    render(
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage loading data-testid="page">
            Title
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    );
    expect(screen.queryByText("Title")).toBeNull();
    expect(screen.getByTestId("page")).not.toHaveAttribute("aria-current");
    expect(document.querySelector("[data-slot='breadcrumb-skeleton']")).toBeInTheDocument();
  });

  it("keeps the icon while loading", () => {
    render(
      <BreadcrumbPage loading icon={<svg data-testid="icon" />}>
        Title
      </BreadcrumbPage>
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("marks the loading page busy", () => {
    render(<BreadcrumbPage loading data-testid="page" />);
    expect(screen.getByTestId("page")).toHaveAttribute("aria-busy", "true");
  });

  it("is aria-current=page when not loading", () => {
    render(<BreadcrumbPage data-testid="page">Title</BreadcrumbPage>);
    expect(screen.getByTestId("page")).toHaveAttribute("aria-current", "page");
  });
});
