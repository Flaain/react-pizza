import { CartItem } from "../../../app/context/interfaces";

export interface Props extends CartItem {
    pizzaId: number;
    title: string;
    imageUrl: string;
}