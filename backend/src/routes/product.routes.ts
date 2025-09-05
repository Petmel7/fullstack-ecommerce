import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { createProduct, updateProduct, deleteProduct, getMyProducts } from "../controllers/product.controller";

const router = Router();

router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);
router.get("/my", protect, getMyProducts);

export default router;

