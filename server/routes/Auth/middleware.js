import { rateLimit } from "express-rate-limit";

export const errorMessage = "Пожалуйста, проверьте введенные данные и повторите попытку."; 

export const limit = rateLimit({
    limit: 15,
    standardHeaders: true,
    handler: (_, res) => res.status(429).json({ status: 429, message: "Слишком много попыток, пожалуйста, попробуйте позже" }),
});