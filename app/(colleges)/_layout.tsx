/**
 * College Detail Screen Layout
 * Groups all college detail routes under (colleges) group
 */

import { Stack } from "expo-router";

export default function CollegesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="compare"
        options={{
          headerShown: false,
          presentation: "card",
        }}
      />
    </Stack>
  );
}
