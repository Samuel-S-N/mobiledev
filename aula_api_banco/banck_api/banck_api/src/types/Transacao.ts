export type TipoTransacao =
  | "deposito"
  | "saque"
  | "transferencia_enviada"
  | "transferencia_recebida";

export interface Transacao {
  id: string;
  tipo: TipoTransacao;
  valor: number;
  data: string;
  descricao: string;
}
