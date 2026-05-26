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

import {
  adicionarProduto,
  initDatabase,
  limparProdutosSincronizados,
  listarProdutos,
  removerProduto,
} from "../database/database";

import { sincronizarProdutos } from "../services/syncService";
import { Produto } from "../types/Produto";

export function HomeScreen() {
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos Offline</Text>

      <TextInput
        placeholder="Nome do produto"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Adicionar offline" onPress={handleAdicionarProduto} />

      <View style={styles.space} />

      <Button
        title={sincronizando ? "Sincronizando..." : "Sincronizar com API"}
        onPress={handleSincronizar}
        disabled={sincronizando}
      />

      <View style={styles.space} />

      <Button
        title="Limpar sincronizados"
        onPress={handleLimparSincronizados}
      />

      <FlatList
        data={produtos}
        keyExtractor={(item) => String(item.id)}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.productName}>{item.nome}</Text>

              <Text>Quantidade: {item.quantidade}</Text>

              <Text>Preço: R$ {item.preco.toFixed(2)}</Text>

              <Text>
                Status:{" "}
                {item.sincronizado === 1
                  ? "Sincronizado"
                  : "Pendente"}
              </Text>
            </View>

            <Button
              title="Excluir"
              onPress={() => handleRemoverProduto(item.id)}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum produto cadastrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  space: {
    height: 10,
  },
  list: {
    marginTop: 20,
  },
  card: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
    gap: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  empty: {
    textAlign: "center",
    marginTop: 24,
    color: "#777",
  },
});