"use client";

import { Select } from "@radix-ui/themes";

export const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">Example User</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
