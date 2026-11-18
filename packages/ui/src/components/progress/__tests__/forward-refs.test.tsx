import {describeForwardRefs} from "../../../../test/forward-ref";
import {Progress} from "../progress";

describeForwardRefs([{name: "Progress", component: Progress, element: (ref) => <Progress ref={ref} value={40} />, slot: "progress"}]);
