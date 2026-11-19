import {act, render, screen} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";
import {RixlLocaleProvider} from "../../locale";
import {CopyBlock} from "../copy-block";

afterEach(() => vi.unstubAllGlobals());

function stubClipboard(writeText: () => Promise<void>) {
  vi.stubGlobal("navigator", {...navigator, clipboard: {writeText}});
}

describe("CopyBlock labels", () => {
  it("names the button Copy to clipboard by default, without the title", () => {
    render(<CopyBlock title="Token" text="abc" />);
    expect(screen.getByRole("button", {name: "Copy to clipboard"})).toBeInTheDocument();
  });

  it("describes the button with the visible title", () => {
    render(<CopyBlock title="Token" text="abc" />);
    expect(screen.getByRole("button")).toHaveAccessibleDescription("Token:");
  });

  it("renders no title and no description when title is omitted", () => {
    render(<CopyBlock text="abc" />);
    expect(screen.getByRole("button", {name: "Copy to clipboard"})).not.toHaveAttribute("aria-describedby");
    expect(screen.queryByText(/:$/)).toBeNull();
  });

  it("takes the provider's copyAction", () => {
    render(
      <RixlLocaleProvider translations={{copyBlock: {copyAction: "Copiar"}}}>
        <CopyBlock title="Token" text="abc" />
      </RixlLocaleProvider>
    );
    expect(screen.getByRole("button", {name: "Copiar"})).toBeInTheDocument();
  });

  it("lets the labels prop beat the provider", () => {
    render(
      <RixlLocaleProvider translations={{copyBlock: {copyAction: "Copiar"}}}>
        <CopyBlock title="Token" text="abc" labels={{copyAction: "Kopieren"}} />
      </RixlLocaleProvider>
    );
    expect(screen.getByRole("button", {name: "Kopieren"})).toBeInTheDocument();
  });

  it("announces Copied after a copy by default", async () => {
    stubClipboard(() => Promise.resolve());
    render(<CopyBlock title="Token" text="abc" />);
    await act(async () => screen.getByRole("button").click());
    expect(screen.getByRole("status")).toHaveTextContent("Copied");
  });

  it("announces a translated success and keeps the other default", async () => {
    stubClipboard(() => Promise.resolve());
    render(<CopyBlock title="Token" text="abc" labels={{copied: "Kopiert!"}} />);
    await act(async () => screen.getByRole("button").click());
    expect(screen.getByRole("status")).toHaveTextContent("Kopiert!");
    expect(screen.getByRole("button", {name: "Copy to clipboard"})).toBeInTheDocument();
  });

  it("rejects the removed labels keys", () => {
    // @ts-expect-error -- copy, copying and error were removed with the title-based name
    render(<CopyBlock title="Token" text="abc" labels={{copy: () => "Copy", copying: "…", error: "No"}} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
