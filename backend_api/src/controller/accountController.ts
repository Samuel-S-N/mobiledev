import type { Request, Response } from "express";
import { loadAccounts, saveAccount } from "../database.js";
import { generateID } from "../utils/generateID.js";

export function ping (req: Request, res: Response) {
  return res.json({pong: true});
}

export function createAccount(req: Request, res: Response) {
    const account = loadAccounts()
    const { name } = req.body
    
    if (!name){
        return res.status(400).json(
            {error: "Nome é obrigatório"});

    }

    const newAccount = {
        id: generateID(),
        name,        
        balance: 0,
        transactions: []
    }

    account.push(newAccount);
    saveAccount(account);

    return res.status(201).json(newAccount);

}
