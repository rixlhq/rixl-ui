import {render, screen} from "@testing-library/react";
import {fr} from "react-day-picker/locale";
import {describe, expect, it} from "vitest";
import {DatePicker} from "../date-picker";

const JUNE_2026 = new Date(2026, 5, 1);

describe("DatePicker labels", () => {
  it("are English by default", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} />);
    expect(screen.getByRole("button", {name: "Go to the Previous Month"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Go to the Next Month"})).toBeInTheDocument();
  });

  // Calendar strings belong to react-day-picker's locale, as in Kumo; a Rixl default must never mask them.
  it("take month navigation from the react-day-picker locale", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} locale={fr} />);
    expect(screen.getByRole("button", {name: "Aller au mois précédent"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Aller au mois suivant"})).toBeInTheDocument();
  });

  it("take day names from the locale while leading with the visible day number", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} locale={fr} selected={new Date(2026, 5, 15)} />);
    expect(screen.getByRole("button", {name: "15, lundi 15 juin 2026, sélectionné"})).toBeInTheDocument();
  });

  it("let the labels prop beat the locale and keep the other strings", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} locale={fr} labels={{labelNext: () => "Weiter"}} />);
    expect(screen.getByRole("button", {name: "Weiter"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Aller au mois précédent"})).toBeInTheDocument();
  });
});
