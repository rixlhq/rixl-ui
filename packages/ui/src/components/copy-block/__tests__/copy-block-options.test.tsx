import {act, fireEvent, render, screen} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";
import {RixlLocaleProvider} from "../../locale";
import {CopyBlock} from "../copy-block";

afterEach(() => vi.unstubAllGlobals());

function stubClipboard() {
  const writeText = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal("navigator", {...navigator, clipboard: {writeText}});
  return writeText;
}

describe("CopyBlock textToCopy", () => {
  it("copies text by default", async () => {
    const writeText = stubClipboard();
    render(<CopyBlock text="abc" />);
    await act(async () => screen.getByRole("button", {name: "Copy to clipboard"}).click());
    expect(writeText).toHaveBeenCalledWith("abc");
  });

  it("copies textToCopy instead of text and keeps text shown", async () => {
    const writeText = stubClipboard();
    render(<CopyBlock text="sk_live_***" textToCopy="sk_live_123" />);
    await act(async () => screen.getByRole("button", {name: "Copy to clipboard"}).click());
    expect(writeText).toHaveBeenCalledWith("sk_live_123");
    expect(screen.getByText("sk_live_***")).toBeInTheDocument();
  });

  it("copies textToCopy for custom children with no text", async () => {
    const writeText = stubClipboard();
    render(
      <CopyBlock textToCopy="npm i @rixl/ui">
        <code>npm i</code>
      </CopyBlock>
    );
    await act(async () => screen.getByRole("button", {name: "Copy to clipboard"}).click());
    expect(writeText).toHaveBeenCalledWith("npm i @rixl/ui");
  });
});

describe("CopyBlock size", () => {
  it("defaults to lg: sm text-sm and an sm button", () => {
    render(<CopyBlock text="abc" />);
    expect(screen.getByText("abc").className).toContain("text-sm");
    expect(screen.getByRole("button").className).toContain("size-8");
  });

  it("sm sets text-xs and an xs button", () => {
    render(<CopyBlock text="abc" size="sm" />);
    expect(screen.getByText("abc").className).toContain("text-xs");
    expect(screen.getByRole("button").className).toContain("size-7");
  });

  it("base sets text-sm and an xs button", () => {
    render(<CopyBlock text="abc" size="base" />);
    expect(screen.getByText("abc").className).toContain("text-sm");
    expect(screen.getByRole("button").className).toContain("size-7");
  });

  it("lets a consumer className win over the size padding", () => {
    const {container} = render(<CopyBlock text="abc" size="sm" className="p-6" />);
    expect(container.firstElementChild?.className).toContain("p-6");
    expect(container.firstElementChild?.className).not.toContain("p-1 ");
  });
});

describe("CopyBlock masked", () => {
  it("hides the text and offers a reveal button", () => {
    render(<CopyBlock text="secret" masked />);
    expect(screen.queryByText("secret")).toBeNull();
    expect(screen.getByRole("button", {name: "Reveal value"})).toBeInTheDocument();
  });

  it("reveals and hides on press, renaming the button", () => {
    render(<CopyBlock text="secret" masked />);
    fireEvent.click(screen.getByRole("button", {name: "Reveal value"}));
    expect(screen.getByText("secret")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", {name: "Hide value"}));
    expect(screen.queryByText("secret")).toBeNull();
  });

  it("copies while still masked", async () => {
    const writeText = stubClipboard();
    render(<CopyBlock text="secret" masked />);
    await act(async () => screen.getByRole("button", {name: "Copy to clipboard"}).click());
    expect(writeText).toHaveBeenCalledWith("secret");
    expect(screen.queryByText("secret")).toBeNull();
  });

  it("keeps custom children hidden until revealed", () => {
    render(
      <CopyBlock text="secret" masked>
        <b>child secret</b>
      </CopyBlock>
    );
    expect(screen.queryByText("child secret")).toBeNull();
    fireEvent.click(screen.getByRole("button", {name: "Reveal value"}));
    expect(screen.getByText("child secret")).toBeInTheDocument();
  });

  it("has no reveal button when not masked", () => {
    render(<CopyBlock text="secret" />);
    expect(screen.queryByRole("button", {name: "Reveal value"})).toBeNull();
  });

  it("takes the provider's reveal and hide labels", () => {
    render(
      <RixlLocaleProvider translations={{copyBlock: {revealAction: "Anzeigen", hideAction: "Verbergen"}}}>
        <CopyBlock text="secret" masked />
      </RixlLocaleProvider>
    );
    fireEvent.click(screen.getByRole("button", {name: "Anzeigen"}));
    expect(screen.getByRole("button", {name: "Verbergen"})).toBeInTheDocument();
  });

  it("lets labels beat the provider", () => {
    render(
      <RixlLocaleProvider translations={{copyBlock: {revealAction: "Anzeigen"}}}>
        <CopyBlock text="secret" masked labels={{revealAction: "Reveal it"}} />
      </RixlLocaleProvider>
    );
    expect(screen.getByRole("button", {name: "Reveal it"})).toBeInTheDocument();
  });
});
