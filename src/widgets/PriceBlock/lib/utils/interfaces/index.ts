export interface PizzaState {
    type: number;
    price: number;
    size: number;
    param?: string;
    valueParam?: string | number;
}

export interface SizeChange {
    price: number;
    size: number;
    param?: string;
    valueParam?: string | number;
}

export interface TypeChange {
    type: number;
    param?: string;
    valueParam?: string | number;
}

export interface PayloadParams {
    param: string;
    valueParam: number;
}