import { CartInterface } from "@/pages/Cart";
import { DeliveryInfo } from "@/pages/DeliveryMethod/model/interfaces";
import { Field } from "../hooks/useForm/types";

export interface PossibleParams {
    search: string;
    category: string;
    sort: string;
}

export interface Sort {
    id: number;
    name: string;
    sort: string;
    img?: string;
}

export interface GuestGuardProps {
    children: React.ReactElement;
}

export interface AuthGuardProps {
    children: React.ReactElement;
}
export interface EmptyCartGuardProps {
    children: React.ReactElement;
}

export interface Address {
    address: string;
    rating?: number;
    deliveryPrice?: number;
}

export interface BrowserTitleProps {
    data: Product;
    children: React.ReactElement;
}

export interface ProductSelectorState {
    type: number;
    price: number;
    size: number;
    initialPrice: number;
}

export interface Promocode {
    promocode: string;
    sale: number;
}

export interface Meta {
    total_items: number;
    total_pages: number;
    per_page: number;
    current_page: number;
    remaining_count: number;
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
    headers?: { "Content-Type": string };
}

export interface Order {
    order: Array<Product & CartInterface>;
    totalPrice: number | string;
    deliveryInfo: DeliveryInfo;
} // <-- this is bad. Im talking about dependence from "@/pages/Cart" and "@/pages/DeliveryMethod/model/interfaces" cuz of this interface

export interface Form extends Omit<Field, "value" | "isDirty" | "validateOnChange" | "onChange"> {
    value?: string;
    label?: string;
}