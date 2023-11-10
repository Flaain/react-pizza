import { DeliveryInfo } from "../../../pages/Cart/interfaces";
import { CartInterface } from "@/pages/Cart";

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

export interface Data<T> {
    status: number;
    statusText: string;
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
    order: Array<Pizza & CartInterface>;
    totalPrice: number | string;
    deliveryInfo: DeliveryInfo;
}