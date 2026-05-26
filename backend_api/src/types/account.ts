import type { Transaction } from "./transaction.js";

export type Account = {
    id: string;
    name: string;
    balance: number;
    transactions: Transaction[];
}
