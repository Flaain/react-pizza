import { Schema } from "mongoose";

export const DeliveryInfoSchema = new Schema({
    address: {
        type: String,
        required: true,
    },
    deliveryPrice: Number,
    method: {
        type: String,
        enum: ["pickup", "delivery"],
        required: true,
    },
});