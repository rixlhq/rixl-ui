import { Alert, AlertDescription, AlertTitle, type AlertProps } from "@rixl/ui/alert";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "alert";
export const title = "Alert";
export const group = "Feedback";
export const description =
  "Inline banner for status / instructive messages. Two variants; optional leading icon aligns via grid.";

export function Showcase() {
  return (
    <Alert>
      <AlertTitle>Your changes have been saved.</AlertTitle>
    </Alert>
  );
}

function LiveExample({ state }: { state: Record<string, ControlValue> }) {
  const variant = state.variant as AlertProps["variant"];

  return variant === "destructive" ? (
    <Alert variant="destructive">
      <XCircleIcon />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        Your card was declined. Update your payment method and try again.
      </AlertDescription>
    </Alert>
  ) : (
    <Alert>
      <InfoIcon />
      <AlertTitle>New release available</AlertTitle>
      <AlertDescription>
        v2.3.0 is ready to install. It includes performance improvements and bug fixes.
      </AlertDescription>
    </Alert>
  );
}

function TitleOnlyExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Title only">
      <Alert>
        <AlertTitle>Your changes have been saved.</AlertTitle>
      </Alert>
    </Group>
  );
}

function DescriptionExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="With description">
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
      </Alert>
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "live",
    title: "Interactive",
    description: "Switch between default and destructive variants.",
    render: LiveExample,
    controls: [
      {
        name: "variant",
        label: "Variant",
        type: "select",
        options: [
          { value: "default", label: "Default" },
          { value: "destructive", label: "Destructive" },
        ],
        defaultValue: "default",
      },
    ],
    code: `<Alert>
  <AlertTitle>Your changes have been saved.</AlertTitle>
</Alert>

<Alert variant="destructive">
  <XCircleIcon />
  <AlertTitle>Payment failed</AlertTitle>
</Alert>`,
  },
  { id: "title", title: "Title only", render: TitleOnlyExample },
  { id: "description", title: "With description", render: DescriptionExample },
];

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

function XCircleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6M9 9l6 6" />
    </svg>
  );
}
