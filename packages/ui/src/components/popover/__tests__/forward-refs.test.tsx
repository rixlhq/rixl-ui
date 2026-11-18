import {describeForwardRefs} from "../../../../test/forward-ref";
import {Popover, PopoverContent, PopoverTrigger} from "../popover";

describeForwardRefs([
  {
    name: "PopoverTrigger",
    component: PopoverTrigger,
    element: (ref) => (
      <Popover>
        <PopoverTrigger ref={ref}>Open</PopoverTrigger>
      </Popover>
    ),
    slot: "popover-trigger",
  },
  {
    name: "PopoverContent",
    component: PopoverContent,
    element: (ref) => (
      <Popover open>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent ref={ref}>Panel</PopoverContent>
      </Popover>
    ),
    slot: "popover-content",
  },
]);
