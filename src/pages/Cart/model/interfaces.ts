import { Order } from "@/shared/model/interfaces";

export interface CartInterface {
    id: number;
    category: number;
    title: string;
    imageUrl: string;
    items: CartItem[];
}

export interface CartItem {
    id: number;
    size: number;
    type: number;
    price: number;
    count: number;
}

export interface CartSlice {
    cart: Map<number, CartInterface>;
    orderLoading: boolean;
    order: Order | null;
    ordered: boolean;
    priceView: {
        total: number;
        intl: string;
        totalItems: number;
    };
    error: unknown;
}

export interface CartListProps {
    cart: Array<CartInterface>;
}

type DirectPayload = {
    type: "direct";
    productId: number;
    itemId: number;
    count: number;
};

type IncreaseDecreasePayload = {
    type: "increase" | "decrease";
    productId: number;
    itemId: number;
};

export type Payload = DirectPayload | IncreaseDecreasePayload;
