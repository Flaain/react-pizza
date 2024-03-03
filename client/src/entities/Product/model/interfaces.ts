import { CartInterface } from "@/pages/Cart";
import { Product, ProductSelectorState } from "@/shared/model/interfaces";

export interface Props extends Omit<Product, "description" | "ingredients"> {
    oldPrice?: number;
}

export enum ProductSelectorTypes {
    SET_TYPE = "SET_TYPE",
    SET_SIZE = "SET_SIZE",
    SET_COUNT = "SET_COUNT",
    UPDATE = "UPDATE",
}

export interface OrderItemProps extends Omit<CartItemProps, "productId" | "itemId" | "loading"> {}

export interface CartItemProps extends Omit<CartInterface, "category"> {
    loading: boolean;
}

export type Action =
    | { type: ProductSelectorTypes.SET_TYPE; payload: { type: number } }
    | { type: ProductSelectorTypes.SET_SIZE; payload: { size: number; price: number } }
    | { type: ProductSelectorTypes.SET_COUNT; payload: { count: number } }
    | { type: ProductSelectorTypes.UPDATE; payload: ProductSelectorState };