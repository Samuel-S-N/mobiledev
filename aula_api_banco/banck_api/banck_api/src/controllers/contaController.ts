import type { Request, Response } from "express";
import { gerarId } from "../utils/gerarId.js";
import { criarTransacao } from "../utils/criarTransacao.js";
import type { Conta } from "../types/Conta.js";
import { carregarContas, salvarContas } from "../database.js";

export function ping(req: Request, res: Response) {
  return res.json({ pong: true });
}

// export function criarConta(req: Request, res: Response) {
//   const contas = carregarDados();
//   const { nome } = req.body;

//   if (!nome) {
//     return res.status(400).json({
//       error: "O nome é obrigatório",
//     });
//   }

//   const novaConta: Conta = {
//     id: gerarId(),
//     nome,
//     saldo: 0,
//     transacoes: [],
//   };

//   contas.push(novaConta);
//   salvarDados(contas);

//   return res.status(201).json(novaConta);
// }

export function buscarConta(req: Request, res: Response) {
  const contas = carregarContas();
  const { id } = req.params;

  const conta = contas.find((conta: Conta) => conta.id === id);

  if (!conta) {
    return res.status(404).json({ error: "Conta não encontrada" });
  }

  return res.json(conta);
}

export function depositar(req: Request, res: Response) {
  const contas = carregarContas();
  const { id } = req.params;
  const { valor } = req.body;

  const conta = contas.find((conta: Conta) => conta.id === id);

  if (!conta) {
    return res.status(404).json({ error: "Conta não encontrada" });
  }

  if (!valor || valor <= 0) {
    return res.status(400).json({
      error: "O valor do depósito deve ser maior que zero.",
    });
  }

  conta.saldo += valor;

  const transacao = criarTransacao(
    "deposito",
    valor,
    `Depósito de R$ ${valor} realizado com sucesso.`,
  );

  conta.transacoes.push(transacao);
  salvarContas(contas);

  return res.json(conta);
}

export function sacar(req: Request, res: Response) {
  const contas = carregarContas();
  const { id } = req.params;
  const { valor } = req.body;

  const conta = contas.find((conta: Conta) => conta.id === id);

  if (!conta) {
    return res.status(404).json({ error: "Conta não encontrada" });
  }

  if (!valor || valor <= 0) {
    return res.status(400).json({
      error: "O valor do saque deve ser maior que zero.",
    });
  }

  if (conta.saldo < valor) {
    return res.status(400).json({ error: "Saldo insuficiente" });
  }

  conta.saldo -= valor;

  const transacao = criarTransacao(
    "saque",
    valor,
    `Saque de R$ ${valor} realizado com sucesso.`,
  );

  conta.transacoes.push(transacao);
  salvarContas(contas);

  return res.json(conta);
}

export function listarTransacoes(req: Request, res: Response) {
  const contas = carregarContas();
  const { id } = req.params;

  const conta = contas.find((conta: Conta) => conta.id === id);

  if (!conta) {
    return res.status(404).json({ error: "Conta não encontrada" });
  }

  return res.json(conta.transacoes);
}

export function transferir(req: Request, res: Response) {
  const contas = carregarContas();
  const { id } = req.params;
  const { valor, contaDestinoId } = req.body;

  const contaOrigem = contas.find((conta: Conta) => conta.id === id);
  const contaDestino = contas.find(
    (conta: Conta) => conta.id === contaDestinoId,
  );

  if (!contaOrigem || !contaDestino) {
    return res
      .status(404)
      .json({ error: "Conta de origem ou destino não encontrada" });
  }

  if (!valor || valor <= 0) {
    return res
      .status(400)
      .json({ error: "O valor da transferência deve ser maior que zero." });
  }

  if (contaOrigem.id === contaDestino.id) {
    return res
      .status(400)
      .json({ error: "A conta de origem e destino não podem ser a mesma." });
  }

  if (contaOrigem.saldo < valor) {
    return res
      .status(400)
      .json({ error: "Saldo insuficiente para transferência." });
  }

  contaOrigem.saldo -= valor;
  contaDestino.saldo += valor;

  const transacaoOrigem = criarTransacao(
    "transferencia_enviada",
    valor,
    `Transferência enviada para ${contaDestino.nome}`,
  );

  const transacaoDestino = criarTransacao(
    "transferencia_recebida",
    valor,
    `Transferência recebida de ${contaOrigem.nome}`,
  );

  contaOrigem.transacoes.push(transacaoOrigem);
  contaDestino.transacoes.push(transacaoDestino);
  salvarContas(contas);

  return res.json({
    message: "Transferência realizada com sucesso",
    origem: contaOrigem,
    destino: contaDestino,
  });
}

export function todasContas(req: Request, res: Response) {
  const contas = carregarContas();
  return res.json(contas);
}
