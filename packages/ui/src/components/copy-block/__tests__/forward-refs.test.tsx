import {describeForwardRefs} from "../../../../test/forward-ref";
import {CopyBlock} from "../copy-block";

describeForwardRefs([
  {name: "CopyBlock", component: CopyBlock, element: (ref) => <CopyBlock ref={ref} title="Token" text="abc" />, slot: "copy-block"},
]);
