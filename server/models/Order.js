import mongoose, { Schema, model } from "mongoose";
import { PaymentInfoSchema } from "./PaymentInfo.js";

export const OrderSchema = new Schema(
    {
        checkoutSessionId: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        deliveryInfo: {
            type: {
                address: {
                    type: {
                        state: {
                            type: String,
                            required: true,
                        },
                        city: {
                            type: String,
                            required: true,
                        },
                        line: {
                            type: String,
                            required: true,
                        },
                        postal_code: {
                            type: String,
                            required: true,
                        },
                    },
                    required: true,
                },
                deliveryPrice: Number,
            },
            required: true,
        },
        paymentInfo: {
            type: PaymentInfoSchema,
            required: true,
        },
        cart: {
            items: [
                {
                    productId: {
                        type: Number,
                        required: true,
                    },
                    title: {
                        type: String,
                        required: true,
                    },
                    imageUrl: {
                        type: String,
                        required: true,
                    },
                    size: {
                        type: Number,
                        required: true,
                    },
                    type: {
                        type: Number,
                        required: true,
                    },
                    count: {
                        type: Number,
                        required: true,
                    },
                    price: {
                        type: Number,
                        required: true,
                    },
                },
            ],
            total_price: {
                type: Number,
                required: true,
            },
        },
        total_amount: Number,
        status: {
            type: String,
            enum: ["WAITING_PAYMENT", "PAID", "CANCELED"],
            default: "WAITING_PAYMENT",
        },
    },
    { timestamps: true }
);

export const Order = model("order", OrderSchema);