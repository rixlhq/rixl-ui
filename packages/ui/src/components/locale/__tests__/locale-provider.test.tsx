import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {RixlLocaleProvider} from "../locale-provider";
import {useTranslations} from "../use-translations";
import type {CopyBlockLabels} from "../../copy-block/copy-block-labels";

const defaults: CopyBlockLabels = {
  copyAction: "Copy to clipboard",
  copied: "Copied",
  revealAction: "Reveal value",
  hideAction: "Hide value",
};

function Probe({labels}: {labels?: Partial<CopyBlockLabels>}) {
  const t = useTranslations("copyBlock", defaults, labels);
  return (
    <p>
      {t.copyAction}|{t.copied}
    </p>
  );
}

const text = () => screen.getByText(/\|/).textContent;

describe("RixlLocaleProvider", () => {
  it("shows the component defaults without a provider", () => {
    render(<Probe />);
    expect(text()).toBe("Copy to clipboard|Copied");
  });

  it("overrides one key and keeps the other defaults", () => {
    render(
      <RixlLocaleProvider translations={{copyBlock: {copied: "Kopiert!"}}}>
        <Probe />
      </RixlLocaleProvider>
    );
    expect(text()).toBe("Copy to clipboard|Kopiert!");
  });

  it("lets the instance labels beat the provider", () => {
    render(
      <RixlLocaleProvider translations={{copyBlock: {copied: "Kopiert!", copyAction: "Kopieren"}}}>
        <Probe labels={{copied: "Fertig"}} />
      </RixlLocaleProvider>
    );
    expect(text()).toBe("Kopieren|Fertig");
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
    expect(text()).toContain("|Copié !");
  });

  it("merges a nested provider over its parent", () => {
    render(
      <RixlLocaleProvider translations={{copyBlock: {copyAction: "Kopieren"}}}>
        <RixlLocaleProvider translations={{copyBlock: {copied: "Kopiert!"}}}>
          <Probe />
        </RixlLocaleProvider>
      </RixlLocaleProvider>
    );
    expect(text()).toBe("Kopieren|Kopiert!");
  });

  it("treats an undefined provider value as not overriding", () => {
    render(
      <RixlLocaleProvider translations={{copyBlock: {copied: undefined}}}>
        <Probe />
      </RixlLocaleProvider>
    );
    expect(text()).toContain("|Copied");
  });
});
