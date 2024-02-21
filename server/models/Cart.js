import { Schema } from "mongoose";
import { z } from "zod";

export const CartSchema = new Schema({
    id: {
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
});

export const zodCartSchema = z.strictObject({
    _id: z.string().optional(),
    id: z.number(),
    size: z.number(),
    title: z.string(),
    imageUrl: z.string(),
    type: z.number(),
    price: z.number(),
    count: z.number(),
});

export const zodCartSchemaAsArray = z.array(zodCartSchema);

export const zodQuantitySchema = z
    .strictObject({
        action: z.string(),
        value: z.number().min(1).max(10).optional(),
    })
    .refine(({ action, value }) => action === "direct" ? !!value : true, { message: "Value is required for 'direct' action" });