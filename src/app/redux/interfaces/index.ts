import { DeliveryInfo} from "../../../pages/Cart/interfaces";
import { Pizza } from "../../../shared/api/interfaces";
import { CartInterface } from "@/pages/Cart";

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

export interface PizzasSliceState {
    pizzas: Array<Pizza>;
    loading: boolean;
    searchQuery: string;
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
    pizzas: Array<Pizza>;
    deliveryInfo: DeliveryInfo;
    total: number;
}