import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {RixlLocaleProvider} from "../locale-provider";
import {useTranslations} from "../use-translations";
import type {RixlTranslations} from "../translations";

function Probe({labels}: {labels?: Partial<RixlTranslations["copyBlock"]>}) {
  const t = useTranslations("copyBlock", labels);
  return (
    <p>
      {t.copy("Token")}|{t.copying}|{t.copied}|{t.error}
    </p>
  );
}

const text = () => screen.getByText(/\|/).textContent;

describe("RixlLocaleProvider", () => {
  it("shows English without a provider", () => {
    render(<Probe />);
    expect(text()).toBe("Copy Token|Copying|Copied!|Unable to copy. Try again.");
  });

  it("overrides one key and keeps the other defaults", () => {
    render(
      <RixlLocaleProvider translations={{copyBlock: {copied: "Kopiert!"}}}>
        <Probe />
      </RixlLocaleProvider>
    );
    expect(text()).toBe("Copy Token|Copying|Kopiert!|Unable to copy. Try again.");
  });

  it("passes interpolated values to a function string", () => {
    render(
      <RixlLocaleProvider translations={{copyBlock: {copy: (title) => `Copiar ${title}`}}}>
        <Probe />
      </RixlLocaleProvider>
    );
    expect(text()).toContain("Copiar Token|");
  });

  it("lets the instance labels beat the provider", () => {
    render(
      <RixlLocaleProvider translations={{copyBlock: {copied: "Kopiert!", copying: "Kopiere"}}}>
        <Probe labels={{copied: "Fertig"}} />
      </RixlLocaleProvider>
    );
    expect(text()).toBe("Copy Token|Kopiere|Fertig|Unable to copy. Try again.");
  });

  it("shows new translations when the provider re-renders", () => {
    const {rerender} = render(
      <RixlLocaleProvider translations={{copyBlock: {copied: "Kopiert!"}}}>
        <Probe />
      </RixlLocaleProvider>
    );
    rerender(
      <RixlLocaleProvider translations={{copyBlock: {copied: "Copié !"}}}>
        <Probe />
      </RixlLocaleProvider>
    );
    expect(text()).toContain("|Copié !|");
  });

  it("merges a nested provider over its parent", () => {
    render(
      <RixlLocaleProvider translations={{copyBlock: {copying: "Kopiere"}}}>
        <RixlLocaleProvider translations={{copyBlock: {copied: "Kopiert!"}}}>
          <Probe />
        </RixlLocaleProvider>
      </RixlLocaleProvider>
    );
    expect(text()).toBe("Copy Token|Kopiere|Kopiert!|Unable to copy. Try again.");
  });

  it("treats an undefined provider value as not overriding", () => {
    render(
      <RixlLocaleProvider translations={{copyBlock: {copied: undefined}}}>
        <Probe />
      </RixlLocaleProvider>
    );
    expect(text()).toContain("|Copied!|");
  });
});
