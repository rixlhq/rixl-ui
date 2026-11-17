import {Avatar, AvatarFallback, AvatarImage} from "@rixl/ui/avatar";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "avatar";
export const title = "Avatar";
export const description = "Represent a person with an image or their initials.";

export function Showcase() {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-8">
        <AvatarFallback>JL</AvatarFallback>
      </Avatar>
      <Avatar className="size-11">
        <AvatarFallback>SK</AvatarFallback>
      </Avatar>
      <Avatar className="size-14">
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>
    </div>
  );
}

function SizesExample() {
  return (
    <Group label="Sizes">
      {["size-6", "size-8", "size-12", "size-16"].map((size) => (
        <Avatar key={size} className={size}>
          <AvatarImage src="https://i.pravatar.cc/64?img=2" alt="Ben" />
          <AvatarFallback>BN</AvatarFallback>
        </Avatar>
      ))}
    </Group>
  );
}

function WithImageExample() {
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

function FallbackOnlyExample() {
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

function StackedGroupExample() {
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
    id: "sizes",
    title: "Sizes",
    description: "Avatar scales with consumer size classes.",
    render: SizesExample,
    code: `<Avatar className="size-12">
  <AvatarImage src="https://i.pravatar.cc/64?img=2" alt="Ben" />
  <AvatarFallback>BN</AvatarFallback>
</Avatar>`,
  },
  {id: "image", title: "With image", render: WithImageExample},
  {id: "fallback", title: "Fallback", render: FallbackOnlyExample},
  {id: "stacked", title: "Stacked group", render: StackedGroupExample},
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
