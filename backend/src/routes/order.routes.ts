import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { validateOrderInput } from "../middleware/validation.middleware";
import {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
} from "../controllers/order.controller";

const router = Router();

router.post("/checkout", protect, validateOrderInput, createOrder);
router.get("/", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

// ⚠️ оновлення статусу варто дозволяти лише адмінам/продавцям
router.put("/:id/status", protect, updateOrderStatus);

export default router;
