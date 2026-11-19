import {describeForwardRefs} from "../../../../test/forward-ref";
import {Empty} from "../empty";

describeForwardRefs([{name: "Empty", component: Empty, element: (ref) => <Empty ref={ref} title="No results" />, slot: "empty"}]);
