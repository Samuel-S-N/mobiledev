import { Stack } from "expo-router";

export default function MoviesLayout() {
  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="movie/[id]" />
    </Stack>
  );
}
