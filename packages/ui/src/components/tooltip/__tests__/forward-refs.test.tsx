import {describeForwardRefs} from "../../../../test/forward-ref";
import {Tooltip, TooltipContent, TooltipTrigger} from "../tooltip";

describeForwardRefs([
  {
    name: "TooltipTrigger",
    component: TooltipTrigger,
    element: (ref) => (
      <Tooltip>
        <TooltipTrigger ref={ref}>Trigger</TooltipTrigger>
      </Tooltip>
    ),
    slot: "tooltip-trigger",
  },
  {
    name: "TooltipContent",
    component: TooltipContent,
    element: (ref) => (
      <Tooltip open>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent ref={ref}>Hint</TooltipContent>
      </Tooltip>
    ),
    slot: "tooltip-content",
  },
]);
