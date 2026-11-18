import {createRef} from "react";
import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {Input} from "../input";
import {InputGroup, InputGroupInput} from "../../input-group/input-group";
import {InputArea} from "../input-area";
import {Checkbox} from "../../checkbox/checkbox";
import {RadioGroup, RadioGroupItem} from "../../radio-group/radio-group";
import {Switch} from "../../switch/switch";

describe("shared form contracts", () => {
  it("keeps a dormant conditional error from marking a valid input invalid", () => {
    render(<Input label="Name" description="Use your full name" error={{message: "Too short", match: "tooShort"}} />);
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Use your full name")).toBeInTheDocument();
  });
  it("propagates required from an adorned group to its input", () => {
    render(
      <InputGroup required>
        <InputGroupInput aria-label="Email" />
      </InputGroup>
    );
    expect(screen.getByRole("textbox")).toBeRequired();
  });
  it("propagates disabled without a built-in label", () => {
    render(
      <InputGroup disabled>
        <InputGroupInput aria-label="Email" />
      </InputGroup>
    );
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
  it("forwards multiline refs", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<InputArea aria-label="Notes" ref={ref} />);
    expect(ref.current).toBe(screen.getByRole("textbox"));
  });
  it("forwards boolean control refs", () => {
    const checkbox = createRef<HTMLButtonElement>();
    const toggle = createRef<HTMLButtonElement>();
    const radio = createRef<HTMLButtonElement>();
    render(
      <>
        <Checkbox aria-label="Agree" ref={checkbox} />
        <Switch aria-label="Enabled" ref={toggle} />
        <RadioGroup aria-label="Plan">
          <RadioGroupItem aria-label="Basic" value="basic" ref={radio} />
        </RadioGroup>
      </>
    );
    expect(checkbox.current).toBe(screen.getByRole("checkbox"));
    expect(toggle.current).toBe(screen.getByRole("switch"));
    expect(radio.current).toBe(screen.getByRole("radio"));
  });
});
