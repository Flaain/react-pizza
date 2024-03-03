import { CartInterface } from "@/pages/Cart";
import { DeliveryInfo } from "@/pages/DeliveryMethod/model/interfaces";
import { Field } from "../hooks/useForm/types";
import { PaymentInfo } from "@/widgets/PaymentModal";

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

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
    count: number;
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
    price: number;
}

export interface Product {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
    ingredients: string;
    types: Array<number>;
    sizes: Array<Size>;
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

export interface Order {
    order: Array<Product & CartInterface>;
    totalPrice: number | string;
    deliveryInfo: DeliveryInfo;
} // <-- this is bad. Im talking about dependence from "@/pages/Cart" and "@/pages/DeliveryMethod/model/interfaces" cuz of this interface

export interface Form extends Omit<Field, "value" | "isDirty" | "validateOnChange" | "onChange"> {
    value?: string;
    label?: string;
}

export interface CartItemLocal extends ProductSelectorState {
    id: number;
    title: string;
    imageUrl: string;
}


export type OnlySignal = Pick<IApiMethodParams, "signal">;
export type SignalWithBody = WithRequired<Pick<IApiMethodParams, "body" | "signal">, "body">;

export interface IBase {
    baseUrl: string;
    headers: {
        "Content-Type"?: "application/json" | (string & object);
        Authorization?: "Bearer" | (string & object);
    };
}

export type IApiData<T, K extends string> = {
    [key in K]: T;
} & {
    message: string;
};

export interface IProductDetailsParams extends OnlySignal {
    id: number;
}

export interface IRemoveFromCartParams extends WithRequired<IApiMethodParams, "token"> {
    _id: string;
}

export interface IApiMethodParams extends Partial<Omit<IBase, "baseUrl">>, Omit<RequestInit, "headers"> {
    endpoint?: string;
    token?: string;
}

export interface IApiCart {
    items: Array<CartInterface>;
    total_price: number;
}

export interface IApiCartChangeQuantity extends WithRequired<Pick<IApiMethodParams, "body" | "signal" | "token">, "body" | "token"> {
    _id: string;
}

export interface Profile {
    _id: string;
    name: string;
    email: string;
    addresses: Array<Address>;
    cart: IApiCart;
    deliveryInfo?: Pick<DeliveryInfo, "address" | "method">;
    paymentInfo?: PaymentInfo;
    createdAt: string;
    updatedAt: string;
    orders: Array<Order>
    token: string;
}