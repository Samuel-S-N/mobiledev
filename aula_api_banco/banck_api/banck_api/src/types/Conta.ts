import type { Transacao } from "./index.js";

export interface Conta {
  id: string;
  usuarioId: string;
  saldo: number;
  transacoes: Transacao[];
}
