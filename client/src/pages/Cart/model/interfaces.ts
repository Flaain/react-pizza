import { Order } from "@/shared/model/interfaces";

export interface CartInterface {
    id: number;
    category: number;
    title: string;
    imageUrl: string;
    count: number;
    type: number;
    size: number;
    price: number;
    _id?: string;
}

export interface CartItem {
    id: number;
    size: number;
    type: number;
    price: number;
    count: number;
}

export interface CartSlice {
    cart: Map<string, CartItem>;
    cartLoading: boolean;
    orderLoading: boolean;
    order: Order | null;
    ordered: boolean;
    priceView: {
        totalPrice: number;
        totalItems: number;
        intl: string;
    };
    error: unknown;
}

export interface CartListProps {
    cart: Array<CartInterface>;
}

type DirectPayload = {
    type: "direct";
    key: string;
    count: number;
};

type IncreaseDecreasePayload = {
    type: "increase" | "decrease";
    key: string;
};

export type Payload = DirectPayload | IncreaseDecreasePayload;
