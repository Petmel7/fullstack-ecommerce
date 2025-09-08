import cors, { CorsOptions } from "cors";

const allowedOrigins = [
    process.env.CLIENT_DEV_URL,
    process.env.SERVER_DEV_URL,
    process.env.SERVER_PROD_URL
];

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("❌ Not allowed by CORS"));
        }
    },
    credentials: true,
};

export const corsMiddleware = cors(corsOptions);
