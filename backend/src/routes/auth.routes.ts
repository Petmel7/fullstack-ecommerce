// Auth routes
import { Router } from "express";
import { createUser } from "../controllers/auth.controller";

const router = Router();

router.post("/", createUser);

export default router;