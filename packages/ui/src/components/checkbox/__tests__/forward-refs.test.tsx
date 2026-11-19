import {describeForwardRefs} from "../../../../test/forward-ref";
import {Checkbox} from "../checkbox";

describeForwardRefs([{name: "Checkbox", component: Checkbox, element: (ref) => <Checkbox ref={ref} />, slot: "checkbox"}]);
