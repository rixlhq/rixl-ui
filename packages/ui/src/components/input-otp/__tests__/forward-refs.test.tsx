import {describeForwardRefs} from "../../../../test/forward-ref";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "../input-otp";

describeForwardRefs([
  {name: "InputOTP", component: InputOTP, element: (ref) => <InputOTP ref={ref} maxLength={4} />, slot: "input-otp"},
  {
    name: "InputOTPGroup",
    component: InputOTPGroup,
    element: (ref) => (
      <InputOTP maxLength={4}>
        <InputOTPGroup ref={ref} />
      </InputOTP>
    ),
    slot: "input-otp-group",
  },
  {
    name: "InputOTPSlot",
    component: InputOTPSlot,
    element: (ref) => (
      <InputOTP maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot ref={ref} index={0} />
        </InputOTPGroup>
      </InputOTP>
    ),
    slot: "input-otp-slot",
  },
  {
    name: "InputOTPSeparator",
    component: InputOTPSeparator,
    element: (ref) => (
      <InputOTP maxLength={4}>
        <InputOTPSeparator ref={ref} />
      </InputOTP>
    ),
    slot: "input-otp-separator",
  },
]);
