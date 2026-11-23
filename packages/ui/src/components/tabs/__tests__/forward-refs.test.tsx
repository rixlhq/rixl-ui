import {describeForwardRefs} from "../../../../test/forward-ref";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../index";

describeForwardRefs([
  {name: "Tabs", component: Tabs, element: (ref) => <Tabs ref={ref} />, slot: "tabs"},
  {
    name: "TabsList",
    component: TabsList,
    element: (ref) => (
      <Tabs>
        <TabsList ref={ref} />
      </Tabs>
    ),
    slot: "tabs-list",
  },
  {
    name: "TabsTrigger",
    component: TabsTrigger,
    element: (ref) => (
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger ref={ref} value="a">
            A
          </TabsTrigger>
        </TabsList>
      </Tabs>
    ),
    slot: "tabs-trigger",
  },
  {
    name: "TabsContent",
    component: TabsContent,
    element: (ref) => (
      <Tabs defaultValue="a">
        <TabsContent ref={ref} value="a">
          Body
        </TabsContent>
      </Tabs>
    ),
    slot: "tabs-content",
  },
]);
