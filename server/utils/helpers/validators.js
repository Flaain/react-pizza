import { ZodError } from "zod";

export const validateData = (schema, message = undefined) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    message: message ?? "Неверно переданы данные",
                    errors: Object.fromEntries(error.errors.map(({ path, message }) => [path, message])),
                });
            }
        }
    };
};