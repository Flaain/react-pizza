import { CartInterface } from "@/pages/Cart";
import { Address, Meta, Product } from "@/shared/model/interfaces";
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
    jwt: string | null;
    deliveryInfo: DeliveryInfo | null;
    paymentInfo: PaymentInfo | null;
    lang: string,
    addresses: Map<string, Address>
}