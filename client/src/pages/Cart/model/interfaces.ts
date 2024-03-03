export interface CartInterface {
    productId: number;
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
    _id?: string;
    productId: number;
    size: number;
    type: number;
    price: number;
    count: number;
}

export interface CartSlice {
    cart: Map<string, Omit<CartInterface, "category">>;
    cartLoading: boolean;
    priceView: {
        totalPrice: number;
        totalItems: number;
        intl: string;
    };
    error: unknown;
}

export interface CartListProps {
    cart: Array<Omit<CartInterface, "category">>;
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

export interface IAddToCartThunk {
    product: Omit<CartItem, "price" | "count">;
    token: string;
}