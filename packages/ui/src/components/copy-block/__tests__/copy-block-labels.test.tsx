import {act, render, screen} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";
import {RixlLocaleProvider} from "../../locale";
import {CopyBlock} from "../copy-block";

afterEach(() => vi.unstubAllGlobals());

function stubClipboard(writeText: () => Promise<void>) {
  vi.stubGlobal("navigator", {...navigator, clipboard: {writeText}});
}

describe("CopyBlock labels", () => {
  it("names the button in English by default", () => {
    render(<CopyBlock title="Token" value="abc" />);
    expect(screen.getByRole("button", {name: "Copy Token"})).toBeInTheDocument();
  });

  it("uses the provider's copy function for the button name", () => {
    render(
      <RixlLocaleProvider translations={{copyBlock: {copy: (title) => `Copiar ${title}`}}}>
        <CopyBlock title="Token" value="abc" />
      </RixlLocaleProvider>
    );
    expect(screen.getByRole("button", {name: "Copiar Token"})).toBeInTheDocument();
  });

  it("lets the labels prop beat the provider", () => {
    render(
      <RixlLocaleProvider translations={{copyBlock: {copy: (title) => `Copiar ${title}`}}}>
        <CopyBlock title="Token" value="abc" labels={{copy: (title) => `Kopieren ${title}`}} />
      </RixlLocaleProvider>
    );
    expect(screen.getByRole("button", {name: "Kopieren Token"})).toBeInTheDocument();
  });

  it("announces a translated success and keeps the other defaults", async () => {
    stubClipboard(() => Promise.resolve());
    render(<CopyBlock title="Token" value="abc" labels={{copied: "Kopiert!"}} />);
    await act(async () => screen.getByRole("button").click());
    expect(screen.getByRole("status")).toHaveTextContent("Kopiert!");
    expect(screen.getByRole("button", {name: "Copy Token"})).toBeInTheDocument();
  });

  it("announces a translated failure", async () => {
    stubClipboard(() => Promise.reject(new Error("Denied")));
    render(
      <RixlLocaleProvider translations={{copyBlock: {error: "Konnte nicht kopieren"}}}>
        <CopyBlock title="Token" value="abc" />
      </RixlLocaleProvider>
    );
    await act(async () => screen.getByRole("button").click());
    expect(screen.getByRole("status")).toHaveTextContent("Konnte nicht kopieren");
  });

  it("announces a translated pending state", async () => {
    stubClipboard(() => new Promise<void>(() => {}));
    render(<CopyBlock title="Token" value="abc" labels={{copying: "Kopiere"}} />);
    act(() => screen.getByRole("button").click());
    expect(screen.getByRole("status")).toHaveTextContent("Kopiere");
  });

  it("rejects the removed tooltipText prop", () => {
    // @ts-expect-error -- tooltipText was replaced by labels.copy
    render(<CopyBlock title="Token" value="abc" tooltipText="Copy token" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
