export interface PizzaState {
    type: number;
    price: number;
    size: number;
}

export interface PizzaAction {
    type: string;
    payload: PizzaPayload;
}

type PizzaPayload = PizzaState | Omit<PizzaState, "size" | "price"> | Omit<PizzaState, "type">;
