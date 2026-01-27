import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="age-group" />
      <Stack.Screen name="goals" />
      <Stack.Screen name="complete" />
    </Stack>
  );
}
