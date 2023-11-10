import { PayloadAction } from "@reduxjs/toolkit";
import { ActionTypes } from "./formTypes";
import { PizzaState } from "./interfaces";

const pizzaReducer = (state: PizzaState, { type, payload }: PayloadAction<PizzaState>) => {
    switch (type) {
        case ActionTypes.SET_TYPE:
            return { ...state, type: payload.type };
        case ActionTypes.SET_SIZE:
            return { ...state, size: payload.size, price: payload.price };
        case ActionTypes.UPDATE:
            return { ...state, ...payload };
        default:
            return state;
    }
};

export default pizzaReducer;