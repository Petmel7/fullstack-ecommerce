import { Router } from "express";
import { toggleFavorite, getFavorites } from "../controllers/favorite.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/toggle", protect, toggleFavorite);
router.get("/", protect, getFavorites);

export default router;
