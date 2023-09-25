import { Cart } from "../../../app/context/interfaces";
import { DeliveryInfo } from "../../../pages/Cart/interfaces";

export interface Pizza {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
    ingredients: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
}

export interface StaticAddresses {
    address: string;
    rating: number;
}

export interface Reject {
    status: number;
    text: string;
    message: string;
}

export interface Data<T> {
    status: number;
    text: string;
    message: string;
    data: T;
}

export interface Base {
    baseUrl: string;
    secondUrl?: string;
    thirdUrl?: string;
    headers?: { "Content-Type": string };
}

export interface Order {
    order: Array<Pizza & Cart>;
    totalPrice: number | string;
    deliveryInfo: DeliveryInfo;
}