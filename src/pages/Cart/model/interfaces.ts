import { Order } from "@/shared/api/interfaces";

type PaymentMethod = "card" | "cash";
type DeliveryMethod = "pickup" | "courier";

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

export interface DeliveryInfo {
    address: string;
    rating?: number;
    deliveryPrice?: number;
    method: DeliveryMethod;
}

export interface CreditCard {
    address: number;
    cvv: number;
    expiry: Date;
}

export interface PaymentInfo {
    method: PaymentMethod;
    card?: CreditCard;
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

enum ActionTypes {
    DIRECT = "direct",
    INCREASE = "increase",
    DECREASE = "decrease",
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
