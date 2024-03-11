import { Schema } from "mongoose";

export const AddressSchema = new Schema({
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
});