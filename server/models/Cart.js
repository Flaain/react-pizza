import { Schema } from "mongoose";
import { z } from "zod";

export const CartSchema = new Schema({
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
});

export const zodCartSchema = z.strictObject({
    _id: z.string().optional(),
    productId: z.number(),
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
        action: z.enum(["increment", "decrement", "direct"]),
        value: z.number().min(1).max(100).optional(),
    })
    .refine(({ action, value }) => action === "direct" ? !!value : true, { message: "Value is required for 'direct' action" });