import { buscarConta, depositar, sacar } from "@/services/api";
import { Conta } from "@/types";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { logoutUsuario } from "../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountScreen() {
  const dispatch = useAppDispatch();

  const { usuario } = useAppSelector((state) => state.auth);

  const [conta, setConta] = useState<Conta | null>(null);
  const [valor, setValor] = useState("");

  async function carregarConta() {
    if (!usuario) return;

    const data = await buscarConta(usuario.contaId);

    if (data.error) {
      Alert.alert("Erro", data.error);
      return;
    }

    setConta(data);
  }

  async function handleDepositar() {
    if (!conta) return;

    const valorNumber = Number(valor);

    const data = await depositar(conta.id, valorNumber);

    if (data.error) {
      Alert.alert("Erro", data.error);
      return;
    }

    setConta(data);
    setValor("");
  }

  async function handleSacar() {
    if (!conta) return;

    const valorNumber = Number(valor);

    const data = await sacar(conta.id, valorNumber);

    if (data.error) {
      Alert.alert("Erro", data.error);
      return;
    }

    setConta(data);
    setValor("");
  }

  async function handleLogout() {
    await dispatch(logoutUsuario()).unwrap();

    router.replace("/(auth)/login");
  }

  useEffect(() => {
    carregarConta();
  }, [usuario]);

  if (!usuario) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Olá, {usuario.nome}</Text>

      <Text style={styles.saldo}>Saldo: R$ {conta?.saldo ?? 0}</Text>

      <TextInput
        placeholder="Valor"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Depositar" onPress={handleDepositar} />

      <View style={styles.space} />

      <Button title="Sacar" onPress={handleSacar} />

      <Text style={styles.subtitle}>Transações</Text>

      <FlatList
        data={conta?.transacoes || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transacao}>
            <Text>{item.descricao}</Text>
            <Text>R$ {item.valor}</Text>
            <Text>{new Date(item.data).toLocaleString("pt-BR")}</Text>
          </View>
        )}
      />

      <Button title="Sair" onPress={handleLogout} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
  },
  saldo: {
    fontSize: 22,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  space: {
    height: 12,
  },
  transacao: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 8,
  },
});
