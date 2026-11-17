import {useEffect, useRef} from "react";
import {FieldRoot, FieldLabel, FieldDescription, FieldError, type FieldRootActions} from "@rixl/ui/field";
import {Input} from "@rixl/ui/input";
import type {ControlValue, Example} from "./registry";

export const path = "field";
export const title = "Field";
export const description =
  "Accessible form-field wrapper on Base UI Field. Label, description, and error read the field state from context, so the control is wired with aria-labelledby and aria-describedby automatically.";

export function Showcase() {
  return (
    <div className="w-full max-w-sm">
      <FieldRoot>
        <FieldLabel>Email address</FieldLabel>
        <Input type="email" placeholder="you@example.com" />
        <FieldDescription>We never share your address.</FieldDescription>
      </FieldRoot>
    </div>
  );
}

function DescriptionExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <div className="w-full max-w-sm">
      <FieldRoot>
        <FieldLabel>Username</FieldLabel>
        <Input placeholder="Ada" />
        <FieldDescription>Letters and numbers only, at least 3 characters.</FieldDescription>
      </FieldRoot>
    </div>
  );
}

function InvalidExample(props: {state: Record<string, ControlValue>}) {
  void props;
  const actionsRef = useRef<FieldRootActions>(null);
  useEffect(() => {
    actionsRef.current?.validate();
  }, []);
  return (
    <div className="w-full max-w-sm">
      <FieldRoot actionsRef={actionsRef} validate={() => "Enter an email address."}>
        <FieldLabel>Email address</FieldLabel>
        <Input type="email" placeholder="you@example.com" />
        <FieldError />
      </FieldRoot>
    </div>
  );
}

export const examples: Example[] = [
  {
    id: "description",
    title: "With description",
    render: DescriptionExample,
    code: `<FieldRoot>
  <FieldLabel>Username</FieldLabel>
  <Input placeholder="Ada" />
  <FieldDescription>Letters and numbers only.</FieldDescription>
</FieldRoot>`,
  },
  {
    id: "invalid",
    title: "Invalid with error",
    description: "The error message comes from field validation and is appended to aria-describedby.",
    render: InvalidExample,
    code: `<FieldRoot validate={() => "Enter an email address."}>
  <FieldLabel>Email address</FieldLabel>
  <Input type="email" placeholder="you@example.com" />
  <FieldError />
</FieldRoot>`,
  },
];
