import {Tabs, TabsContent, TabsList, TabsTrigger} from "@rixl/ui/tabs";
import {Group, Section} from "./_layout";

export const path = "tabs";
export const title = "Tabs";
export const group = "Navigation";

export function Showcase() {
  return (
    <Section
      title="Tabs"
      description="Tabbed content built on Base UI Tabs. A selected tab is marked data-active for styling; keyboard navigation follows the active tab."
    >
      <Group label="Basic">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="text-sm text-rixl-fg">Overview panel</p>
          </TabsContent>
          <TabsContent value="activity">
            <p className="text-sm text-rixl-fg">Activity panel</p>
          </TabsContent>
          <TabsContent value="settings">
            <p className="text-sm text-rixl-fg">Settings panel</p>
          </TabsContent>
        </Tabs>
      </Group>

      <Group label="With icons">
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <p className="text-sm text-rixl-fg">Manage your profile and contact details.</p>
          </TabsContent>
          <TabsContent value="password">
            <p className="text-sm text-rixl-fg">Change your password and 2FA settings.</p>
          </TabsContent>
        </Tabs>
      </Group>
    </Section>
  );
}