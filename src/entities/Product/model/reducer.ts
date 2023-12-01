import { PayloadAction } from "@reduxjs/toolkit";
import { actionTypes } from "@/shared/config/constants";
import { ProductSelectorState } from "./interfaces";

const productSelectorReducer = (state: ProductSelectorState, { type, payload }: PayloadAction<ProductSelectorState>) => {
    switch (type) {
        case actionTypes.SET_TYPE:
            return { ...state, type: payload.type };
        case actionTypes.SET_SIZE:
            return { ...state, size: payload.size, price: payload.price };
        case actionTypes.UPDATE:
            return { ...state, ...payload };
        default:
            return state;
    }
};

export default productSelectorReducer;
