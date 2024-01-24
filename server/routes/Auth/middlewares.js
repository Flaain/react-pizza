import { rateLimit } from "express-rate-limit";
import { ZodError } from "zod";

export const validateData = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    message: "Пожалуйста, проверьте введенные данные и повторите попытку.",
                    errors: Object.fromEntries(error.errors.map(({ path, message }) => [path, message])),
                });
            }
        }
    };
};

export const limit = rateLimit({
    limit: 15,
    standardHeaders: true,
    handler: (_, res) => res.status(429).json({ message: "Слишком много попыток, пожалуйста, попробуйте позже" }),
});