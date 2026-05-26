import express from "express";
import router from "./route.js";
import cors from "cors";

const app = express();

// permite enviar JSON
app.use(express.json());
app.use(cors());

// usa rotas
app.use(router);

// inicia servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
