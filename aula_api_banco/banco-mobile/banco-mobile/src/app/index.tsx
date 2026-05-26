import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Banco App</Text>
      <Text style={styles.subtitle}>API Bancária com Node + React Native</Text>

      <View style={styles.space} />

      <Button title="Entrar" onPress={() => router.push("/login")} />

      <View style={styles.space} />

      <Button title="Criar conta" onPress={() => router.push("/signIn")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
  space: {
    height: 16,
  },
});
