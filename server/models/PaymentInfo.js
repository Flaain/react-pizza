import { Schema } from "mongoose";

export const PaymentInfoSchema = new Schema({
    method: {
        type: String,
        enum: ["cash", "card"],
        required: true,
    },
    // card: {
    //     address: {
    //         type: String,
    //         required: true,
    //         // partialFilterExpression: { address: { $type: "string" } },
    //         // sparse: true,
    //         // unique: true,
    //     },
    //     expired: {
    //         type: Date,
    //         required: true,
    //     },
    //     ccv: {
    //         type: Number,
    //         required: true,
    //     },
    // },
});