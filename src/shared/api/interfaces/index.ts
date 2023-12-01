import { DeliveryInfo } from "@/pages/Cart/model/interfaces";
import { CartInterface } from "@/pages/Cart";

export interface Promocode {
    promocode: string;
    sale: number;
}

export interface Meta {
    total_items: number;
    total_pages: number;
    per_page: number;
    current_page: number;
    remaining_count: 4;
}

export interface ResWithMeta {
    meta: Meta;
    items: Array<Product>;
}

export interface Size {
    size: number;
    additional: number;
}

export interface Product {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
    ingredients: string;
    types: Array<number>;
    sizes: Array<Size>;
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
    order: Array<Product & CartInterface>;
    totalPrice: number | string;
    deliveryInfo: DeliveryInfo;
}