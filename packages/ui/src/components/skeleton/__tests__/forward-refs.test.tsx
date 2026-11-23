import {describeForwardRefs} from "../../../../test/forward-ref";
import {Skeleton} from "../skeleton";

describeForwardRefs([{name: "Skeleton", component: Skeleton, element: (ref) => <Skeleton ref={ref} />, slot: "skeleton"}]);
