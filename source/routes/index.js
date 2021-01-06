import express from "express";
import { authMiddleware } from "../utils/auth";
import * as auth from "./auth";

const router = express.Router();

router.post("/auth/register", auth.register);
router.post("/auth/login", auth.login);
router.get("/auth/me", authMiddleware, auth.me);

export default router;
