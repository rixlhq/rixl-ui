import {describeForwardRefs} from "../../../../test/forward-ref";
import {RadioGroup, RadioGroupItem} from "../radio-group";

describeForwardRefs([
  {name: "RadioGroup", component: RadioGroup, element: (ref) => <RadioGroup ref={ref} />, slot: "radio-group"},
  {
    name: "RadioGroupItem",
    component: RadioGroupItem,
    element: (ref) => (
      <RadioGroup>
        <RadioGroupItem ref={ref} value="a" />
      </RadioGroup>
    ),
    slot: "radio-group-item",
  },
]);
