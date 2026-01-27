import { Stack } from 'expo-router';
import { Colors } from '../../src/constants/colors';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: Colors.background.primary,
        },
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="assessment" />
      <Stack.Screen name="age-group" />
      <Stack.Screen name="goals" />
      <Stack.Screen name="skill-level" />
      <Stack.Screen name="complete" />
    </Stack>
  );
}
