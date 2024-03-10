import { CartInterface } from "@/pages/Cart";
import { IUserAddress, Meta, Product } from "@/shared/model/interfaces";
import { DeliveryInfo } from "@/pages/DeliveryMethod/model/interfaces";
import { PaymentInfo } from "@/widgets/PaymentModal/model/interfaces";

export interface ViewportState {
    width: number;
    breakpoints: Breakpoints;
}

export interface Breakpoints {
    sm: number;
    md: number;
    lg: number;
    xl: number;
}

export interface RootSliceState {
    _meta: Meta | null;
    products: Array<Product>;
    loading: boolean;
    perPageLoading: boolean;
    error: unknown;
}

export interface Item {
    id: number;
    category: number;
    imageUrl: string;
    title: string;
}

export interface OrderHandler {
    cart: Array<CartInterface>;
    pizzas: Array<Product>;
    deliveryInfo: DeliveryInfo;
    total: number;
}

export interface UserSliceState {
    _id: string | null;
    jwt: string | null;
    email: string | null;
    name: string | null;
    deliveryInfo: DeliveryInfo | null;
    paymentInfo: PaymentInfo | null;
    lang: string;
    addresses: Map<string, IUserAddress>;
    isAuthInProgress: boolean;
    extraInfo: { ordersGoods: Array<{ id: string, src: string }>, ordersCount: number, totalItemsCount: number } | null
}

export interface IAuthData {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    name: string;
    token: string;
}