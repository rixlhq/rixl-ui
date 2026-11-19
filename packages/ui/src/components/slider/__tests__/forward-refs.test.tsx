import {describeForwardRefs} from "../../../../test/forward-ref";
import {Slider} from "../slider";

describeForwardRefs([
  {name: "Slider", component: Slider, element: (ref) => <Slider ref={ref} label="Value" defaultValue={[50]} />, slot: "slider"},
]);
