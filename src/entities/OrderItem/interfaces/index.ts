import { CartItem } from "../../../app/context/interfaces";

export interface Props extends CartItem {
    title: string;
    imageUrl: string;
}