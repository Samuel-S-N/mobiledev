import AsyncStorage from "@react-native-async-storage/async-storage";

export async function salvarStorage(chave: string, valor: any) {
  await AsyncStorage.setItem(chave, JSON.stringify(valor));
}

export async function buscarStorage(chave: string) {
  const valor = await AsyncStorage.getItem(chave);

  if (!valor) {
    return null;
  }

  return JSON.parse(valor);
}

export async function removerStorage(chave: string) {
  await AsyncStorage.removeItem(chave);
}
