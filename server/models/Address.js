import { Schema } from "mongoose";

export const AddressSchema = new Schema({
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    postcode: {
        type: String,
        required: true,
    },
    deliveryPrice: {
        type: Number,
        required: true,
    },
});