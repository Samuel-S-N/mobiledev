import type { Request, Response } from "express";
import bcrypt from "bcrypt";

import {
  carregarUsuarios,
  salvarUsuarios,
  carregarContas,
  salvarContas,
} from "../database.js";
import type { Conta } from "../types/Conta.js";
import type { Usuario } from "../types/Usuario.js";
import { gerarId } from "../utils/gerarId.js";

export async function criarUsuario(req: Request, res: Response) {
  const usuarios = carregarUsuarios();
  const contas = carregarContas();

  const { nome, email, senha } = req.body;
  console.log(nome, email, senha);
  if (!nome || !email || !senha) {
    return res.status(400).json({
      error: "Nome, email e senha são obrigatórios",
    });
  }

  const usuarioExistente = usuarios.find((usuario) => usuario.email === email);

  if (usuarioExistente) {
    return res.status(400).json({
      error: "Já existe um usuário com esse email",
    });
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const usuarioId = gerarId();
  const contaId = gerarId();

  const novaConta: Conta = {
    id: contaId,
    usuarioId,
    saldo: 0,
    transacoes: [],
  };

  const novoUsuario: Usuario = {
    id: usuarioId,
    nome,
    email,
    senha: senhaCriptografada,
    contaId,
  };

  usuarios.push(novoUsuario);
  contas.push(novaConta);

  salvarUsuarios(usuarios);
  salvarContas(contas);

  return res.status(201).json({
    id: novoUsuario.id,
    nome: novoUsuario.nome,
    email: novoUsuario.email,
    contaId: novoUsuario.contaId,
  });
}

export async function login(req: Request, res: Response) {
  const usuarios = carregarUsuarios();

  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      error: "Email e senha são obrigatórios",
    });
  }

  const usuario = usuarios.find((usuario) => usuario.email === email);

  if (!usuario) {
    return res.status(401).json({
      error: "Email ou senha inválidos",
    });
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    return res.status(401).json({
      error: "Email ou senha inválidos",
    });
  }

  return res.json({
    message: "Login realizado com sucesso",
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      contaId: usuario.contaId,
    },
  });
}
