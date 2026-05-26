import fs from "fs";
import type { Conta } from "./types/Conta.js";
import type { Usuario } from "./types/Usuario.js";

const caminho = "./src/contas.json";
const caminhoUsuarios = "./usuarios.json";

// função para ler dados
export function carregarContas() {
  try {
    const data = fs.readFileSync(caminho, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// função para salvar dados
export function salvarContas(contas: Conta[]) {
  fs.writeFileSync(caminho, JSON.stringify(contas, null, 2));
}

export function carregarUsuarios(): Usuario[] {
  try {
    const dados = fs.readFileSync(caminhoUsuarios, "utf-8");
    return JSON.parse(dados);
  } catch {
    return [];
  }
}

export function salvarUsuarios(usuarios: Usuario[]) {
  fs.writeFileSync(caminhoUsuarios, JSON.stringify(usuarios, null, 2));
}
