import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {RixlLocaleProvider} from "../../locale";
import {Tabs, TabsList, TabsTrigger} from "../index";

const german = {tabs: {scrollLeft: "Tabs nach links", scrollRight: "Tabs nach rechts"}};

function tabs(labels?: {scrollLeft?: string}) {
  return (
    <Tabs defaultValue="a">
      <TabsList labels={labels}>
        <TabsTrigger value="a">Alpha</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

// The overflow buttons are aria-hidden until the row overflows, which empties their computed role name, so match the aria-label.
const overflowButton = (label: string) => screen.getByLabelText(label);

describe("TabsList overflow button labels", () => {
  it("are English by default", () => {
    render(tabs());
    expect(overflowButton("Scroll tabs left")).toBeInTheDocument();
    expect(overflowButton("Scroll tabs right")).toBeInTheDocument();
  });

  it("take the provider's strings", () => {
    render(<RixlLocaleProvider translations={german}>{tabs()}</RixlLocaleProvider>);
    expect(overflowButton("Tabs nach links")).toBeInTheDocument();
    expect(overflowButton("Tabs nach rechts")).toBeInTheDocument();
  });

  it("let labels beat the provider and keep its other string", () => {
    render(<RixlLocaleProvider translations={german}>{tabs({scrollLeft: "Zurück"})}</RixlLocaleProvider>);
    expect(overflowButton("Zurück")).toBeInTheDocument();
    expect(overflowButton("Tabs nach rechts")).toBeInTheDocument();
  });
});
