import {useState} from "react";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@rixl/ui/input-otp";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "input-otp";
export const title = "Input OTP";
export const description = "Enter a verification code one digit at a time.";
export const notes =
  "Slots share Input's control surface (border, hover, invalid) and join into one bar; the active slot takes the focus ring. Set aria-invalid on the slots to show the invalid state.";

export function Showcase() {
  return (
    <InputOTP maxLength={6} aria-label="Verification code">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

function LengthsExample() {
  return (
    <div className="flex flex-col gap-4">
      <Group label="4 digits">
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </Group>
      <Group label="6 digits, split">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Group>
      <Group label="8 digits, split">
        <InputOTP maxLength={8}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
            <InputOTPSlot index={6} />
            <InputOTPSlot index={7} />
          </InputOTPGroup>
        </InputOTP>
      </Group>
    </div>
  );
}

function DisabledExample() {
  return (
    <Group label="Disabled">
      <InputOTP maxLength={6} disabled>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </Group>
  );
}

function InvalidExample() {
  return (
    <Group label="Invalid">
      <InputOTP maxLength={6} defaultValue="123456" aria-label="Verification code">
        <InputOTPGroup>
          <InputOTPSlot index={0} aria-invalid />
          <InputOTPSlot index={1} aria-invalid />
          <InputOTPSlot index={2} aria-invalid />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} aria-invalid />
          <InputOTPSlot index={4} aria-invalid />
          <InputOTPSlot index={5} aria-invalid />
        </InputOTPGroup>
      </InputOTP>
    </Group>
  );
}

function ContiguousExample() {
  return (
    <Group label="Contiguous (4 digits, single group)">
      <InputOTP maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    </Group>
  );
}

function PrefilledExample() {
  return (
    <Group label="Prefilled (defaultValue)">
      <InputOTP maxLength={6} defaultValue="123456">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </Group>
  );
}

function ControlledExample() {
  const [value, setValue] = useState<string>("");
  return (
    <Group label="Controlled">
      <div className="flex flex-col gap-2">
        <InputOTP maxLength={6} value={value} onChange={setValue}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-xs text-rixl-fg-muted">
          {value ? `Value: ${value}` : "Type a 6-digit code…"}
          {value.length === 6 ? " ✓ Complete!" : ""}
        </p>
      </div>
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "lengths",
    title: "Lengths",
    description: "4, 6 and 8 digit codes; longer codes split into groups.",
    render: LengthsExample,
    code: `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
  },
  {
    id: "disabled",
    title: "Disabled",
    render: DisabledExample,
    code: `<InputOTP maxLength={6} disabled>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
  </InputOTPGroup>
</InputOTP>`,
  },
  {
    id: "invalid",
    title: "Invalid",
    description: "aria-invalid on each slot shows the same danger state as Input.",
    render: InvalidExample,
    code: `<InputOTP maxLength={3}>
  <InputOTPGroup>
    <InputOTPSlot index={0} aria-invalid />
    <InputOTPSlot index={1} aria-invalid />
    <InputOTPSlot index={2} aria-invalid />
  </InputOTPGroup>
</InputOTP>`,
  },
  {id: "contiguous", title: "Contiguous", render: ContiguousExample},
  {id: "prefilled", title: "Prefilled", render: PrefilledExample},
  {id: "controlled", title: "Controlled", render: ControlledExample},
];
