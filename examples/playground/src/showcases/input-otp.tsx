import { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@rixl/ui/input-otp";
import { Label } from "@rixl/ui/label";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "input-otp";
export const title = "Input OTP";
export const group = "Forms";
export const description =
  "One-time-password / verification-code input. Fixed number of slots with a blinking caret on the active slot.";

export function Showcase() {
  return (
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
  );
}

function LiveExample({ state }: { state: Record<string, ControlValue> }) {
  const maxLength = Number(state.maxLength);
  const disabled = state.disabled as boolean;

  const firstHalf = Math.ceil(maxLength / 2);
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="live-otp">Verification code</Label>
      <InputOTP id="live-otp" maxLength={maxLength} disabled={disabled}>
        <InputOTPGroup>
          {Array.from({ length: firstHalf }).map((_, i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          {Array.from({ length: maxLength - firstHalf }).map((_, i) => (
            <InputOTPSlot key={i} index={firstHalf + i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}

function ContiguousExample(props: { state: Record<string, ControlValue> }) {
  void props;
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

function PrefilledExample(props: { state: Record<string, ControlValue> }) {
  void props;
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

function ControlledExample(props: { state: Record<string, ControlValue> }) {
  void props;
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
    id: "live",
    title: "Interactive",
    description: "Tweak max length and disabled live.",
    render: LiveExample,
    controls: [
      {
        name: "maxLength",
        label: "Length",
        type: "select",
        options: [
          { value: "4", label: "4" },
          { value: "6", label: "6" },
          { value: "8", label: "8" },
        ],
        defaultValue: "6",
      },
      { name: "disabled", label: "Disabled", type: "boolean", defaultValue: false },
    ],
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
  { id: "contiguous", title: "Contiguous", render: ContiguousExample },
  { id: "prefilled", title: "Prefilled", render: PrefilledExample },
  { id: "controlled", title: "Controlled", render: ControlledExample },
];
