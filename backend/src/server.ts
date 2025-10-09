
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import ordersRoutes from "./routes/order.routes";
import { errorHandler } from "./middleware/error.middleware";
import { corsMiddleware } from "./middleware/cors.middleware";
import path from "path";

dotenv.config();

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.json());
app.use(corsMiddleware);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", ordersRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
