import type { Transacao } from "../types/Transacao.js";
import { gerarId } from "./gerarId.js";

export function criarTransacao(
  tipo: Transacao["tipo"],
  valor: number,
  descricao: string,
): Transacao {
  return {
    id: gerarId(),
    tipo,
    valor,
    data: new Date().toISOString(),
    descricao,
  };
}
