import axios from "axios";

const API_URL = "http://localhost:3000";

// Android Emulator:
// http://10.0.2.2:3000

// iOS Simulator:
// http://localhost:3000

// Celular físico:
// http://SEU_IP_LOCAL:3000

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function cadastrarUsuario(
  nome: string,
  email: string,
  senha: string,
) {
  const response = await api.post("/usuarios", {
    nome,
    email,
    senha,
  });

  return response.data;
}

export async function login(email: string, senha: string) {
  const response = await api.post("/login", {
    email,
    senha,
  });

  return response.data;
}

export async function buscarConta(contaId: string) {
  const response = await api.get(`/contas/${contaId}`);

  return response.data;
}

export async function depositar(contaId: string, valor: number) {
  const response = await api.post(
    `/contas/${contaId}/depositar`,
    {
      valor,
    },
  );

  return response.data;
}

export async function sacar(contaId: string, valor: number) {
  const response = await api.post(
    `/contas/${contaId}/sacar`,
    {
      valor,
    },
  );

  return response.data;
}