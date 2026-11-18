import {Alert, AlertDescription, AlertTitle} from "@rixl/ui/alert";
import type {Example} from "./registry";

export const path = "alert";
export const title = "Alert";
export const description = "Draw attention to a status, warning, or important message.";
export const notes =
  'Inline banner for status and instructive messages. Supports default, success, warning, and destructive variants; optional leading icon aligns via grid. An Alert has no role of its own, so a banner shown at page load is not announced; pass role="alert" for an urgent message that appears later, or role="status" for a polite one. Long titles wrap.';

export function Showcase() {
  return (
    <Alert>
      <InfoIcon />
      <AlertTitle>New release available</AlertTitle>
      <AlertDescription>v2.3.0 is ready to install.</AlertDescription>
    </Alert>
  );
}

const VARIANTS = ["default", "success", "warning", "destructive"] as const;

const ALERT_COPY: Record<(typeof VARIANTS)[number], {title: string; description: string; icon: () => React.JSX.Element}> = {
  default: {
    title: "New release available",
    description: "v2.3.0 is ready to install. It includes performance improvements and bug fixes.",
    icon: InfoIcon,
  },
  success: {
    title: "Deployment succeeded",
    description: "Production environment is live on edge nodes across 34 regions.",
    icon: CheckCircleIcon,
  },
  warning: {
    title: "Storage at 85% capacity",
    description: "Your media bucket is approaching its plan limit. Upgrade to avoid throttling.",
    icon: WarningIcon,
  },
  destructive: {
    title: "Payment failed",
    description: "Your card was declined. Update your payment method and try again.",
    icon: XCircleIcon,
  },
};

function RoleExample() {
  return (
    <div className="grid max-w-xl gap-3">
      <Alert variant="destructive" role="alert">
        <XCircleIcon />
        <AlertTitle>Upload failed</AlertTitle>
        <AlertDescription>The file is larger than 10 MB. Announced immediately.</AlertDescription>
      </Alert>
      {/* oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- Alert renders a div; the role is what this example shows */}
      <Alert variant="success" role="status">
        <CheckCircleIcon />
        <AlertTitle>Draft saved</AlertTitle>
        <AlertDescription>Announced politely, after the current speech.</AlertDescription>
      </Alert>
    </div>
  );
}

function AllVariantsExample() {
  return (
    <div className="grid max-w-xl gap-3">
      {VARIANTS.map((variant) => {
        const copy = ALERT_COPY[variant];
        const Icon = copy.icon;
        return (
          <Alert key={variant} variant={variant}>
            <Icon />
            <AlertTitle>{copy.title}</AlertTitle>
            <AlertDescription>{copy.description}</AlertDescription>
          </Alert>
        );
      })}
    </div>
  );
}

export const examples: Example[] = [
  {
    id: "variants",
    title: "Variants",
    description: "Default, success, warning, and destructive status banners.",
    render: AllVariantsExample,
    code: `<Alert variant="success">
  <CheckCircleIcon />
  <AlertTitle>Deployment succeeded</AlertTitle>
  <AlertDescription>Production environment is live.</AlertDescription>
</Alert>`,
  },
  {
    id: "role",
    title: "Announcing a message",
    description:
      'No role by default, so a banner on the page at load is not announced. Pass role="alert" for an urgent message that appears after load, role="status" for a polite one.',
    render: RoleExample,
    code: `<Alert variant="destructive" role="alert">
  <XCircleIcon />
  <AlertTitle>Upload failed</AlertTitle>
  <AlertDescription>The file is larger than 10 MB.</AlertDescription>
</Alert>

<Alert variant="success" role="status">
  <CheckCircleIcon />
  <AlertTitle>Draft saved</AlertTitle>
</Alert>`,
  },
];

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4M12 17h.01" />
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
