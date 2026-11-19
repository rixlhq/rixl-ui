import {describeForwardRefs} from "../../../../test/forward-ref";
import {Switch} from "../switch";

describeForwardRefs([{name: "Switch", component: Switch, element: (ref) => <Switch ref={ref} />, slot: "switch"}]);
