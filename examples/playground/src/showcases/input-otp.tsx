import {useState} from "react";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@rixl/ui/input-otp";
import {Label} from "@rixl/ui/label";
import {Group, Section} from "./_layout";

export const path = "input-otp";
export const title = "Input OTP";
export const group = "Forms";

export function Showcase() {
  return (
    <Section title="Input OTP" description="One-time-password / verification-code input. Fixed number of slots with a blinking caret on the active slot.">
      <Group label="Basic (6 digits, split 3-3)">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="otp">Verification code</Label>
          <InputOTP id="otp" maxLength={6}>
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
        </div>
      </Group>

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

      <Group label="Disabled">
        <InputOTP maxLength={4} disabled defaultValue="12">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </Group>

      <Group label="Controlled">
        <ControlledDemo />
      </Group>
    </Section>
  );
}

function ControlledDemo() {
  const [value, setValue] = useState<string>("");
  return (
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
  );
}
