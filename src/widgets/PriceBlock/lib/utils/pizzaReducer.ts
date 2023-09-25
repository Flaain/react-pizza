import { FORM_TYPES } from "./formTypes";
import { PizzaAction, PizzaState } from "./interfaces";

const pizzaReducer = (state: PizzaState, { type, payload }: PizzaAction) => {
    switch (type) {
        case FORM_TYPES.SET_TYPE:
            return { ...state, type: (payload as PizzaState).type };
        case FORM_TYPES.SET_SIZE:
            return {
                ...state,
                size: (payload as Omit<PizzaState, "type">).size,
                price: (payload as Omit<PizzaState, "type">).price,
            };
        case FORM_TYPES.UPDATE:
            return { ...state, ...(payload as PizzaState) };
        default:
            return state;
    }
};

export default pizzaReducer;