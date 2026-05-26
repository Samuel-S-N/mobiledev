export interface Usuario {
  id: string;
  nome: string;
  email: string;
  contaId: string;
}

export interface Transacao {
  id: string;
  tipo: string;
  valor: number;
  data: string;
  descricao: string;
}

export interface Conta {
  id: string;
  usuarioId: string;
  saldo: number;
  transacoes: Transacao[];
}
