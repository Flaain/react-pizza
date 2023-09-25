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