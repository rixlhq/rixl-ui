import {Button} from "@rixl/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@rixl/ui/dropdown-menu";
import {Group, Section} from "./_layout";

export const path = "dropdown-menu";
export const title = "DropdownMenu";
export const group = "Overlays";

export function Showcase() {
  return (
    <Section
      title="DropdownMenu"
      description="Popup menu of actions anchored to a trigger. Base UI Menu; keyboard navigable, submenus, checkbox/radio items, shortcuts."
    >
      <Group label="Basic">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline">Open</Button>} />
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem disabled>Settings (disabled)</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete account</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Group>

      <Group label="Shortcuts & inset">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline">Actions</Button>} />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                New project
                <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Save
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Publish
                <DropdownMenuShortcut>⌘⇧P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem inset>Move to…</DropdownMenuItem>
              <DropdownMenuItem inset>Duplicate</DropdownMenuItem>
              <DropdownMenuItem inset variant="destructive">
                Archive
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Group>

      <Group label="Checkbox items">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline">Bars</Button>} />
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem>Show grid lines</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem defaultChecked>Show x-axis labels</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem defaultChecked>Show legend</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Group>

      <Group label="Radio group">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline">Sort</Button>} />
          <DropdownMenuContent>
            <DropdownMenuRadioGroup>
              <DropdownMenuRadioItem value="recent">Most recent</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="name">Name (A–Z)</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="size">Largest first</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Group>

      <Group label="Submenu">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline">More</Button>} />
          <DropdownMenuContent>
            <DropdownMenuItem>Export</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Copy invite link</DropdownMenuItem>
                <DropdownMenuItem>Invite by email</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Revoke access</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Group>
    </Section>
  );
}