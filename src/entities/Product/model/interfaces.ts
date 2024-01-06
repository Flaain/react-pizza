import { Product } from "@/shared/api/interfaces";

export interface Props extends Omit<Product, "description" | "ingredients"> {
    oldPrice?: number;
}

export enum ProductSelectorTypes {
    SET_TYPE = "SET_TYPE",
    SET_SIZE = "SET_SIZE",
    UPDATE = "UPDATE",
}

export interface ProductSelectorState {
    type: number;
    price: number;
    size: number;
    initialPrice: number;
}

export interface OrderItemProps extends Omit<CartItemProps, "productId" | "itemId" | "loading"> {}

export interface CartItemProps {
    productId: number;
    itemId: number;
    count: number;
    type: number;
    size: number;
    price: number;
    img: string;
    title: string;
    loading: boolean;
}

export type Action =
    | { type: ProductSelectorTypes.SET_TYPE; payload: { type: number } }
    | { type: ProductSelectorTypes.SET_SIZE; payload: { size: number; price: number } }
    | { type: ProductSelectorTypes.UPDATE; payload: ProductSelectorState };