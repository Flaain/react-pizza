import mongoose, { Schema, model } from "mongoose";
import { DeliveryInfoSchema } from "./DeliveryInfo.js";
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
            type: DeliveryInfoSchema,
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