import {describeForwardRefs} from "../../../../test/forward-ref";
import {ButtonGroup} from "../button-group";

describeForwardRefs([{name: "ButtonGroup", component: ButtonGroup, element: (ref) => <ButtonGroup ref={ref} />, slot: "button-group"}]);
