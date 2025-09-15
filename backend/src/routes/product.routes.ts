import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { createProduct, updateProduct, deleteProduct, getMyProducts, getAllProducts } from "../controllers/product.controller";
import upload from "../config/multer";

const router = Router();

router.post("/", protect, upload.single("photo"), createProduct);
router.put("/:id", protect, upload.single("photo"), updateProduct);
router.delete("/:id", protect, deleteProduct);
router.get("/my", protect, getMyProducts);
router.get("/", getAllProducts);

export default router;



