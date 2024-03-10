import { Schema } from "mongoose";
import { z } from "zod";

const deliveryTypes = ["pickup", "delivery"];

export const DeliveryInfoSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        enum: deliveryTypes,
        required: true,
    },
});

export const zodDeliveryInfo = z.strictObject({
    id: z.string(),
    method: z.enum(deliveryTypes),
});