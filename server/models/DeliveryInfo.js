import { Schema } from "mongoose";
import { z } from "zod";

const deliveryTypes = ["pickup", "delivery"];
const paymentTypes = ["cash", "card"];

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

export const zodAddressSchema = z.strictObject({
    state: z.string(),
    city: z.string(),
    line: z.string(),
    postal_code: z.string(),
});

export const zodDeliveryInfo = z.strictObject({
    id: z.string(),
    method: z.enum(deliveryTypes),
});

export const zodPaymentInfo = z.strictObject({ method: z.enum(paymentTypes) });