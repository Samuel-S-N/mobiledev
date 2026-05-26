import { Router } from "express";
import { createAccount, ping } from "./controller/accountController.js";

const router = Router();

router.get("/ping", ping);
router.post("/account", createAccount);

export default router;