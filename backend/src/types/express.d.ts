
import { User } from "@prisma/client";

declare global {
    namespace Express {
        interface Request {
            user?: User; // тепер TS знає, що req.user існує
        }
    }
}

export { }; // щоб це вважалося модулем
