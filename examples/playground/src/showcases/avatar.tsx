import {Avatar, AvatarFallback, AvatarImage} from "@rixl/ui/avatar";
import {Group, Section} from "./_layout";

export const path = "avatar";
export const title = "Avatar";
export const group = "Feedback";

export function Showcase() {
  return (
    <Section title="Avatar" description="Image with graceful fallback. Composed of Avatar (root), AvatarImage, and AvatarFallback.">
      <Group label="With image">
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/64?img=1" alt="Ava" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/64?img=2" alt="Ben" />
          <AvatarFallback>BN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/64?img=3" alt="Cai" />
          <AvatarFallback>CI</AvatarFallback>
        </Avatar>
      </Group>

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

      <Group label="Sizes (via className)">
        <Avatar className="size-6">
          <AvatarFallback className="text-[10px]">S</AvatarFallback>
        </Avatar>
        <Avatar className="size-8">
          <AvatarFallback className="text-xs">M</AvatarFallback>
        </Avatar>
        <Avatar className="size-12">
          <AvatarFallback className="text-sm">L</AvatarFallback>
        </Avatar>
        <Avatar className="size-16">
          <AvatarFallback className="text-base">XL</AvatarFallback>
        </Avatar>
      </Group>

      <Group label="Stacked group">
        <div className="flex -space-x-2">
          <Avatar className="ring-2 ring-rixl-surface">
            <AvatarImage src="https://i.pravatar.cc/64?img=4" alt="D" />
            <AvatarFallback>DA</AvatarFallback>
          </Avatar>
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
    </Section>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
