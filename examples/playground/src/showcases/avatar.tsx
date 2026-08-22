import { Avatar, AvatarFallback, AvatarImage } from "@rixl/ui/avatar";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "avatar";
export const title = "Avatar";
export const group = "Feedback";
export const description =
  "Image with graceful fallback. Composed of Avatar (root), AvatarImage, and AvatarFallback.";

export function Showcase() {
  return (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/64?img=1" alt="Ava" />
      <AvatarFallback>AV</AvatarFallback>
    </Avatar>
  );
}

function LiveExample({ state }: { state: Record<string, ControlValue> }) {
  const size = state.size as string;
  return (
    <Group label="Live preview">
      <Avatar className={size}>
        <AvatarImage src="https://i.pravatar.cc/64?img=2" alt="Ben" />
        <AvatarFallback>BN</AvatarFallback>
      </Avatar>
    </Group>
  );
}

function WithImageExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="With image">
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/64?img=3" alt="Cai" />
        <AvatarFallback>CI</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/64?img=4" alt="D" />
        <AvatarFallback>DA</AvatarFallback>
      </Avatar>
    </Group>
  );
}

function FallbackOnlyExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Fallback only (missing / broken image)">
      <Avatar>
        <AvatarImage src="/does-not-exist.png" alt="Alex" />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>
          <UserIcon />
        </AvatarFallback>
      </Avatar>
    </Group>
  );
}

function StackedGroupExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Stacked group">
      <div className="flex -space-x-2">
        <Avatar className="ring-2 ring-rixl-surface">
          <AvatarImage src="https://i.pravatar.cc/64?img=5" alt="E" />
          <AvatarFallback>EL</AvatarFallback>
        </Avatar>
        <Avatar className="ring-2 ring-rixl-surface">
          <AvatarImage src="https://i.pravatar.cc/64?img=6" alt="F" />
          <AvatarFallback>FR</AvatarFallback>
        </Avatar>
        <Avatar className="ring-2 ring-rixl-surface">
          <AvatarFallback>+4</AvatarFallback>
        </Avatar>
      </div>
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "live",
    title: "Interactive",
    description: "Resize the avatar with a live className control.",
    render: LiveExample,
    controls: [
      {
        name: "size",
        label: "Size class",
        type: "select",
        options: [
          { value: "size-6", label: "Small" },
          { value: "size-8", label: "Default" },
          { value: "size-12", label: "Large" },
          { value: "size-16", label: "Extra large" },
        ],
        defaultValue: "size-8",
      },
    ],
    code: `<Avatar>
  <AvatarImage src="https://i.pravatar.cc/64?img=1" alt="Ava" />
  <AvatarFallback>AV</AvatarFallback>
</Avatar>`,
  },
  { id: "image", title: "With image", render: WithImageExample },
  { id: "fallback", title: "Fallback", render: FallbackOnlyExample },
  { id: "stacked", title: "Stacked group", render: StackedGroupExample },
];

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
