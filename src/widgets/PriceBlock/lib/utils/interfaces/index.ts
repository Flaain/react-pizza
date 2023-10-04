export interface PizzaState {
    type: number;
    price: number;
    size: number;
}

export interface PayloadParams {
    param: string;
    valueParam: number;
}

export interface PizzaAction {
    type: string;
    payload: PizzaPayload;
}

type PizzaPayload = PizzaState | (Omit<PizzaState, "size" | "price"> & PayloadParams) | (Omit<PizzaState, "type"> & PayloadParams);