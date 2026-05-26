import { useAppSelector } from "@/store/hooks";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function DashboardLayout() {
  const { usuario, carregando } = useAppSelector((state) => state.auth);

  if (carregando) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!usuario) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}