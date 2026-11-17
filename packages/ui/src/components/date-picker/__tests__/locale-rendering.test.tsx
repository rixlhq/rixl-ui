import {expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {fr} from "react-day-picker/locale";
import {DatePicker} from "../date-picker";

it("uses the supplied date-fns locale for month dropdown options", () => {
  render(<DatePicker locale={fr} defaultMonth={new Date(2026, 5, 1)} captionLayout="dropdown" />);
  expect(screen.getByRole("option", {name: "juin"})).toBeInTheDocument();
});
