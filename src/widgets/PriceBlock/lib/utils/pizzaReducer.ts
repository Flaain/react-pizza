import { FORM_TYPES } from "./formTypes";

const pizzaReducer = (state, { type, payload }) => {
    switch (type) {
        case FORM_TYPES.SET_TYPE:
            return { ...state, type: payload.type };
        case FORM_TYPES.SET_SIZE:
            return { ...state, size: payload.size, price: payload.price };
        case FORM_TYPES.UPDATE: 
            return { ...payload };
        default:
            return state;
    }
};

export default pizzaReducer;