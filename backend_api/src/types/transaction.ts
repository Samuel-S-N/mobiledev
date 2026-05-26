export type TypeTransaction = 
    | "deposito"
    | "saque"
    | "transferencia_enviada"
    | "transferencia_recebida"

export type Transaction = {
    id: string;
    type: TypeTransaction;
    amount: number;
    date: string;
    description: string;
}