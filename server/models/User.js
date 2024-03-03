import { z } from "zod";
import mongoose, { Schema, model } from "mongoose";
import { CartSchema } from "./Cart.js";
import { DeliveryInfoSchema } from "./DeliveryInfo.js";
import { PaymentInfoSchema } from "./PaymentInfo.js";
import { AddressSchema } from "./Address.js";

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
        deliveryInfo: DeliveryInfoSchema,
        paymentInfo: PaymentInfoSchema,
        addresses: [AddressSchema],
        cart: [CartSchema],
    },
    { timestamps: true }
);

export const User = model("user", UserSchema);

export const userSignupSchema = z.strictObject({
    name: z
        .string({ invalid_type_error: "Неверно переданы данные, имя должно быть строкой" })
        .min(1, { message: "Пожалуйста, введите имя" }),
    email: z
        .string({ invalid_type_error: "Неверно переданы данные, электронная почта должна быть строкой" })
        .email({ message: "Пожалуйста, введите корректный адрес электронной почты" })
        .min(4, { message: "Минимальная длина электронной почты - 5 символов" }),
    password: z.string().min(4, { message: "Минимальная длина пароля - 5 символов" }),
});

export const userSigninSchema = z.strictObject({
    email: z
        .string({ invalid_type_error: "Неверно переданы данные, электронная почта должна быть строкой" })
        .email({ message: "Пожалуйста, введите корректный адрес электронной почты" }),
    password: z
        .string({ invalid_type_error: "Неверно переданы данные, имя должно быть строкой" })
        .min(4, { message: "Минимальная длина пароля - 5 символов" }),
});