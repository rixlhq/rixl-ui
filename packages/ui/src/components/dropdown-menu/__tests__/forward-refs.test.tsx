import type {ReactNode} from "react";
import {describeForwardRefs} from "../../../../test/forward-ref";
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
} from "../dropdown-menu";

function OpenMenu({children}: {children: ReactNode}) {
  return (
    <DropdownMenu open>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}

describeForwardRefs([
  {
    name: "DropdownMenuTrigger",
    component: DropdownMenuTrigger,
    element: (ref) => (
      <DropdownMenu>
        <DropdownMenuTrigger ref={ref}>Open</DropdownMenuTrigger>
      </DropdownMenu>
    ),
    slot: "dropdown-menu-trigger",
  },
  {
    name: "DropdownMenuContent",
    component: DropdownMenuContent,
    element: (ref) => (
      <DropdownMenu open>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent ref={ref}>Body</DropdownMenuContent>
      </DropdownMenu>
    ),
    slot: "dropdown-menu-content",
  },
  {
    name: "DropdownMenuGroup",
    component: DropdownMenuGroup,
    element: (ref) => (
      <OpenMenu>
        <DropdownMenuGroup ref={ref} />
      </OpenMenu>
    ),
    slot: "dropdown-menu-group",
  },
  {
    name: "DropdownMenuItem",
    component: DropdownMenuItem,
    element: (ref) => (
      <OpenMenu>
        <DropdownMenuItem ref={ref}>Profile</DropdownMenuItem>
      </OpenMenu>
    ),
    slot: "dropdown-menu-item",
  },
  {
    name: "DropdownMenuCheckboxItem",
    component: DropdownMenuCheckboxItem,
    element: (ref) => (
      <OpenMenu>
        <DropdownMenuCheckboxItem ref={ref}>Bookmarks</DropdownMenuCheckboxItem>
      </OpenMenu>
    ),
    slot: "dropdown-menu-checkbox-item",
  },
  {
    name: "DropdownMenuRadioGroup",
    component: DropdownMenuRadioGroup,
    element: (ref) => (
      <OpenMenu>
        <DropdownMenuRadioGroup ref={ref} />
      </OpenMenu>
    ),
    slot: "dropdown-menu-radio-group",
  },
  {
    name: "DropdownMenuRadioItem",
    component: DropdownMenuRadioItem,
    element: (ref) => (
      <OpenMenu>
        <DropdownMenuRadioGroup>
          <DropdownMenuRadioItem ref={ref} value="a">
            A
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </OpenMenu>
    ),
    slot: "dropdown-menu-radio-item",
  },
  {
    name: "DropdownMenuLabel",
    component: DropdownMenuLabel,
    element: (ref) => (
      <OpenMenu>
        <DropdownMenuLabel ref={ref}>My Account</DropdownMenuLabel>
      </OpenMenu>
    ),
    slot: "dropdown-menu-label",
  },
  {
    name: "DropdownMenuSeparator",
    component: DropdownMenuSeparator,
    element: (ref) => (
      <OpenMenu>
        <DropdownMenuSeparator ref={ref} />
      </OpenMenu>
    ),
    slot: "dropdown-menu-separator",
  },
  {
    name: "DropdownMenuShortcut",
    component: DropdownMenuShortcut,
    element: (ref) => (
      <OpenMenu>
        <DropdownMenuShortcut ref={ref}>⌘K</DropdownMenuShortcut>
      </OpenMenu>
    ),
    slot: "dropdown-menu-shortcut",
  },
  {
    name: "DropdownMenuSubTrigger",
    component: DropdownMenuSubTrigger,
    element: (ref) => (
      <OpenMenu>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger ref={ref}>More</DropdownMenuSubTrigger>
        </DropdownMenuSub>
      </OpenMenu>
    ),
    slot: "dropdown-menu-sub-trigger",
  },
  {
    name: "DropdownMenuSubContent",
    component: DropdownMenuSubContent,
    element: (ref) => (
      <OpenMenu>
        <DropdownMenuSub open>
          <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
          <DropdownMenuSubContent ref={ref}>Nested</DropdownMenuSubContent>
        </DropdownMenuSub>
      </OpenMenu>
    ),
    slot: "dropdown-menu-sub-content",
  },
]);
