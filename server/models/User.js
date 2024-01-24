import { z } from "zod";
import { Schema, model } from "mongoose";

export const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        deliveryInfo: {
            address: String,
            method: String,
        },
        paymentInfo: {
            method: String,
            card: {
                address: {
                    type: String,
                    // partialFilterExpression: { address: { $type: "string" } },
                    sparse: true,
                    unique: true,
                },
                expired: Date,
                ccv: Number,
            },
        },
        "user-addresses": {
            type: Map,
            of: {
                city: String,
                address: {
                    type: String,
                    unique: true,
                },
                postcode: Number,
                deliveryPrice: Number,
            },
        },
    },
    { timestamps: true }
);

export const User = model("user", UserSchema);

export const userSignupSchema = z.object({
    name: z
        .string({ invalid_type_error: "Неверно переданы данные, имя должно быть строкой" })
        .min(1, { message: "Пожалуйста, введите имя" }),
    email: z
        .string({ invalid_type_error: "Неверно переданы данные, электронная почта должна быть строкой" })
        .email({ message: "Пожалуйста, введите корректный адрес электронной почты" })
        .min(4, { message: "Минимальная длина электронной почты - 5 символов" }),
    password: z.string().min(4, { message: "Минимальная длина пароля - 5 символов" }),
});

export const userSigninSchema = z.object({
    email: z
        .string({ invalid_type_error: "Неверно переданы данные, электронная почта должна быть строкой" })
        .email({ message: "Пожалуйста, введите корректный адрес электронной почты" }),
    password: z
        .string({ invalid_type_error: "Неверно переданы данные, имя должно быть строкой" })
        .min(4, { message: "Минимальная длина пароля - 5 символов" }),
});