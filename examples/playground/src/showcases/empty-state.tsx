import {EmptyState} from "@rixl/ui/empty-state";
import {Group, Section} from "./_layout";

export const path = "empty-state";
export const title = "EmptyState";
export const group = "Content";

export function Showcase() {
  return (
    <Section
      title="EmptyState"
      description="Placeholder for empty content, with an optional primary action and custom icon."
    >
      <Group label="Without action">
        <EmptyState title="No media" description="Upload your first asset to see it here." />
      </Group>

      <Group label="With action">
        <EmptyState
          title="No projects"
          description="Create a project to organize your work."
          action={{label: "New project", onClick: () => {}}}
        />
      </Group>
    </Section>
  );
}