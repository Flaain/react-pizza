import { Schema } from "mongoose";

export const PaymentInfoSchema = new Schema({
    method: {
        type: String,
        enum: ["cash", "card"],
        required: true,
    }
});