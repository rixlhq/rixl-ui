import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@rixl/ui/breadcrumb";
import type {ControlValue, Example} from "./registry";
import {Group} from "../components/showcase-layout";

function HouseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5V21H3z" />
    </svg>
  );
}

export const path = "breadcrumb";
export const title = "Breadcrumb";
export const description = "Show the path to the current page.";
export const notes =
  "The landmark is named breadcrumb by default (as in Kumo). Name one trail with the aria-label prop, or every trail with RixlLocaleProvider (@rixl/ui/locale) and breadcrumb.label; the prop wins. There is no labels prop. size is sm or base (default base) and sets the text size of the whole trail. icon on BreadcrumbLink and BreadcrumbPage is decorative and renders before the text. loading on BreadcrumbPage replaces the title with a placeholder while it loads and leaves out aria-current. BreadcrumbEllipsis is decorative: it is aria-hidden and carries no text.";

export function Showcase() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function BasicExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Basic">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </Group>
  );
}

function EllipsisExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="With ellipsis">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </Group>
  );
}

function SizeExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <div className="flex flex-col gap-4">
      {(["sm", "base"] as const).map((size) => (
        <Breadcrumb key={size} size={size}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{size}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ))}
    </div>
  );
}

function IconExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" icon={<HouseIcon />}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Current Project</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function LoadingExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" icon={<HouseIcon />}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage loading />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export const examples: Example[] = [
  {id: "basic", title: "Basic", render: BasicExample},
  {id: "ellipsis", title: "With ellipsis", render: EllipsisExample},
  {
    id: "size",
    title: "Size",
    description: "sm and base (default).",
    render: SizeExample,
    code: `<Breadcrumb size="sm">…</Breadcrumb>`,
  },
  {
    id: "icon",
    title: "Icon",
    description: "icon on BreadcrumbLink and BreadcrumbPage.",
    render: IconExample,
    code: `<BreadcrumbLink href="#" icon={<HouseIcon />}>Home</BreadcrumbLink>`,
  },
  {
    id: "loading",
    title: "Loading",
    description: "The current page shows a placeholder until its title is known.",
    render: LoadingExample,
    code: `<BreadcrumbPage loading />`,
  },
];
