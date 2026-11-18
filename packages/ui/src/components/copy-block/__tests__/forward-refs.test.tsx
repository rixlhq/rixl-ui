import {describeForwardRefs} from "../../../../test/forward-ref";
import {CopyBlock} from "../copy-block";

describeForwardRefs([
  {name: "CopyBlock", component: CopyBlock, element: (ref) => <CopyBlock ref={ref} title="Token" value="abc" />, slot: "copy-block"},
]);
