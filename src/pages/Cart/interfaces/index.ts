import { Order } from "@/shared/api/interfaces";

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
    type: string;
}

export interface CreditCard {
    address: number;
    cvv: number;
    expiry: Date;
}

export interface Promocode {
    promocode: string;
    sale: number;
}

export interface PaymentInfo {
    method: string;
    title: string;
    card?: CreditCard;
}

export interface CartSlice {
    cart: Array<CartInterface>;
    promocodes: Array<Promocode>;
    orderLoading: boolean;
    deliveryInfo: DeliveryInfo | null;
    paymentInfo: PaymentInfo | null;
    order: Order | null;
    ordered: boolean;
    priceView: {
        total: number;
        intl: string;
        totalItems: number;
    };
    error: unknown;
}