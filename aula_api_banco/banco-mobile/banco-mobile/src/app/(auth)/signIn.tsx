import { cadastrarUsuario } from "@/services/api";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Signin() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleCadastro() {
    const data = await cadastrarUsuario(nome, email, senha);

    if (data.error) {
      Alert.alert("Erro", data.error);
      return;
    }

    Alert.alert("Sucesso", "Usuário cadastrado com sucesso");
    router.replace("/login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />

      <Button title="Cadastrar" onPress={handleCadastro} />
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
});
