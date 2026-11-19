import {describeForwardRefs} from "../../../../test/forward-ref";
import {Collapsible, CollapsibleDefaultPanel, CollapsibleDefaultTrigger, CollapsiblePanel, CollapsibleTrigger} from "../collapsible";

describeForwardRefs([
  {name: "Collapsible", component: Collapsible, element: (ref) => <Collapsible ref={ref} />, slot: "collapsible"},
  {
    name: "CollapsibleTrigger",
    component: CollapsibleTrigger,
    element: (ref) => (
      <Collapsible>
        <CollapsibleTrigger ref={ref}>Toggle</CollapsibleTrigger>
      </Collapsible>
    ),
    slot: "collapsible-trigger",
  },
  {
    name: "CollapsiblePanel",
    component: CollapsiblePanel,
    element: (ref) => (
      <Collapsible defaultOpen>
        <CollapsiblePanel ref={ref}>Body</CollapsiblePanel>
      </Collapsible>
    ),
    slot: "collapsible-content",
  },
  {
    name: "CollapsibleDefaultTrigger",
    component: CollapsibleDefaultTrigger,
    element: (ref) => (
      <Collapsible>
        <CollapsibleDefaultTrigger ref={ref}>Toggle</CollapsibleDefaultTrigger>
      </Collapsible>
    ),
    slot: "collapsible-default-trigger",
  },
  {
    name: "CollapsibleDefaultPanel",
    component: CollapsibleDefaultPanel,
    element: (ref) => (
      <Collapsible defaultOpen>
        <CollapsibleDefaultPanel ref={ref}>Body</CollapsibleDefaultPanel>
      </Collapsible>
    ),
    slot: "collapsible-default-panel",
  },
]);
