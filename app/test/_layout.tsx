/**
 * Test Navigation Layout
 * Handles navigation between test screens using Expo Router
 */

import { Stack } from "expo-router";

export default function TestLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Aptitude Test",
        }}
      />
      <Stack.Screen
        name="question"
        options={{
          title: "Test Question",
        }}
      />
      <Stack.Screen
        name="results"
        options={{
          title: "Test Results",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="career-details"
        options={{
          title: "Career Details",
        }}
      />
    </Stack>
  );
}
