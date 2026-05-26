import { Router } from "express";
import {
  depositar,
  sacar,
  buscarConta,
  ping,
  todasContas,
} from "./controllers/contaController.js";
import { criarUsuario, login } from "./controllers/usuarioController.js";

const router = Router();
router.post("/usuarios", criarUsuario);
router.post("/login", login);

router.post("/contas/:id/depositar", depositar);
router.post("/contas/:id/sacar", sacar);
router.get("/contas/:id", buscarConta);
router.get("/contas", todasContas);

router.get("/ping", ping);

export default router;
