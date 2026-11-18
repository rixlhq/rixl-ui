import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {RixlLocaleProvider} from "../../locale";
import {DatePicker} from "../date-picker";

const JUNE_2026 = new Date(2026, 5, 1);
const german = {datePicker: {previousMonth: "Voriger Monat", nextMonth: "Nächster Monat"}};

describe("DatePicker month navigation labels", () => {
  it("are English by default", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} />);
    expect(screen.getByRole("button", {name: "Go to the Previous Month"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Go to the Next Month"})).toBeInTheDocument();
  });

  it("take the provider's strings", () => {
    render(
      <RixlLocaleProvider translations={german}>
        <DatePicker mode="single" defaultMonth={JUNE_2026} />
      </RixlLocaleProvider>
    );
    expect(screen.getByRole("button", {name: "Voriger Monat"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Nächster Monat"})).toBeInTheDocument();
  });

  it("let react-day-picker's labels prop beat the provider and keep the other string", () => {
    render(
      <RixlLocaleProvider translations={german}>
        <DatePicker mode="single" defaultMonth={JUNE_2026} labels={{labelNext: () => "Weiter"}} />
      </RixlLocaleProvider>
    );
    expect(screen.getByRole("button", {name: "Weiter"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Voriger Monat"})).toBeInTheDocument();
  });
});
