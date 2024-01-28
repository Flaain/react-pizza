import { Product } from "@/shared/model/interfaces";

export interface Props {
    activeItem: Product;
    title: string;
}

export interface RelatedItemProps extends Omit<Product, "category" | "ingredients" | "sizes" | "types" | "description">{
    itemWidth: number;
    price: number;
}