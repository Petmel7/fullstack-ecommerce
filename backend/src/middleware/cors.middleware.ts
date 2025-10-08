import cors, { CorsOptions } from "cors";

console.log("🤝process.env.CLIENT_DEV_URL", process.env.CLIENT_DEV_URL);

const allowedOrigins = [
    process.env.CLIENT_DEV_URL || "http://localhost:3000",
    process.env.SERVER_DEV_URL,
    process.env.SERVER_PROD_URL
].filter(Boolean);

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        console.log("🌐 Incoming origin:", origin);
        console.log("✅ Allowed origins:", allowedOrigins);

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("❌ Not allowed by CORS"));
        }
    },
    credentials: true,
};

export const corsMiddleware = cors(corsOptions);
