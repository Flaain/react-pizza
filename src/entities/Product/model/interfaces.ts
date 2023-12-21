import { Product } from "@/shared/api/interfaces";

export interface Props extends Omit<Product, 'description' | 'ingredients'> {
    oldPrice?: number;
}

export type ProductSelectorActions = TypeChangeAction | SizeChangeAction | UpdateAction;

export interface ProductSelectorState {
    type: number;
    price: number;
    size: number;
    initialPrice: number;
}

export interface SizeChangeAction {
    type: "SET_SIZE";
    payload: { size: number; price: number };
}

export interface TypeChangeAction {
    type: "SET_TYPE";
    payload: { type: number };
}

export interface UpdateAction {
    type: "UPDATE";
    payload: ProductSelectorState;
}

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

export interface ImageSkeletonProps {
    width: number;
    height: number;
}