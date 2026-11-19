import {Button} from "@rixl/ui/button";
import {ButtonGroup} from "@rixl/ui/button-group";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@rixl/ui/dropdown-menu";
import type {ControlValue, Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "button-group";
export const title = "Button Group";
export const description = "Join a primary action and a dropdown trigger into a single split button.";
export const notes =
  "Layout wrapper only: children keep their own variant and size while the group flattens the inner corners and overlaps borders into one seam. Pressing one segment never moves the seam — children hold full scale and the press reads as a colour change on that segment alone. Give the group an aria-label and the caret trigger its own. Grouping independent buttons needs roaming-focus semantics this group does not provide.";

export function Showcase() {
  return (
    <ButtonGroup aria-label="Deploy">
      <Button>Deploy</Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button shape="square" aria-label="More deploy options">
              <CaretDownIcon />
            </Button>
          }
        />
        <DropdownMenuContent>
          <DropdownMenuItem>Deploy to staging</DropdownMenuItem>
          <DropdownMenuItem>Deploy and tail logs</DropdownMenuItem>
          <DropdownMenuItem>Schedule deploy…</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}

function SplitExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Split button — primary action plus related secondary actions">
      <Showcase />
    </Group>
  );
}

function SecondaryExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Secondary — split buttons work with any variant">
      <ButtonGroup aria-label="Save">
        <Button variant="secondary">Save</Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="secondary" shape="square" aria-label="More save options">
                <CaretDownIcon />
              </Button>
            }
          />
          <DropdownMenuContent>
            <DropdownMenuItem>Save as draft</DropdownMenuItem>
            <DropdownMenuItem>Save and publish</DropdownMenuItem>
            <DropdownMenuItem>Save a copy…</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </Group>
  );
}

function SizesExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Sizes — match the caret size to the action so the row stays level">
      <ButtonGroup aria-label="Deploy small">
        <Button size="sm">Deploy</Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button shape="square" size="sm" aria-label="More deploy options">
                <CaretDownIcon />
              </Button>
            }
          />
          <DropdownMenuContent>
            <DropdownMenuItem>Deploy to staging</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
      <ButtonGroup aria-label="Deploy">
        <Button>Deploy</Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button shape="square" aria-label="More deploy options">
                <CaretDownIcon />
              </Button>
            }
          />
          <DropdownMenuContent>
            <DropdownMenuItem>Deploy to staging</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
      <ButtonGroup aria-label="Deploy large">
        <Button size="lg">Deploy</Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button shape="square" size="lg" aria-label="More deploy options">
                <CaretDownIcon />
              </Button>
            }
          />
          <DropdownMenuContent>
            <DropdownMenuItem>Deploy to staging</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "split",
    title: "Split button",
    description: "A primary action joined with a dropdown trigger for secondary actions.",
    render: SplitExample,
    code: `<ButtonGroup aria-label="Deploy">
  <Button>Deploy</Button>
  <DropdownMenu>
    <DropdownMenuTrigger
      render={
        <Button shape="square" aria-label="More deploy options">
          <CaretDownIcon />
        </Button>
      }
    />
    <DropdownMenuContent>
      <DropdownMenuItem>Deploy to staging</DropdownMenuItem>
      <DropdownMenuItem>Deploy and tail logs</DropdownMenuItem>
      <DropdownMenuItem>Schedule deploy…</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</ButtonGroup>`,
  },
  {
    id: "secondary",
    title: "Secondary",
    description: "Split buttons work with any button variant.",
    render: SecondaryExample,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Match the caret trigger size to the action button.",
    render: SizesExample,
  },
];

function CaretDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
