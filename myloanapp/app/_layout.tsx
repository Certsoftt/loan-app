import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="404" options={{ title: 'Not Found' }} />
    </Stack>
  );
}
