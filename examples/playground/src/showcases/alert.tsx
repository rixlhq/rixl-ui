import {Alert, AlertDescription, AlertTitle} from "@rixl/ui/alert";
import {Group, Section} from "./_layout";

export const path = "alert";
export const title = "Alert";
export const group = "Feedback";

export function Showcase() {
  return (
    <Section title="Alert" description="Inline banner for status / instructive messages. Two variants; optional leading icon aligns via grid.">
      <Group label="Default (title only)">
        <Alert>
          <AlertTitle>Your changes have been saved.</AlertTitle>
        </Alert>
      </Group>

      <Group label="Default (title + description)">
        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
        </Alert>
      </Group>

      <Group label="Default with icon">
        <Alert>
          <InfoIcon />
          <AlertTitle>New release available</AlertTitle>
          <AlertDescription>v2.3.0 is ready to install. It includes performance improvements and bug fixes.</AlertDescription>
        </Alert>
      </Group>

      <Group label="Destructive">
        <Alert variant="destructive">
          <XCircleIcon />
          <AlertTitle>Payment failed</AlertTitle>
          <AlertDescription>Your card was declined. Update your payment method and try again.</AlertDescription>
        </Alert>
      </Group>
    </Section>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

function XCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6M9 9l6 6" />
    </svg>
  );
}
