import { Product } from "@/shared/api/interfaces";

export interface Props {
    activeItem: Product;
    title: string;
}

export interface RelatedItemProps extends Omit<Product, "category" | "ingredients" | "sizes" | "types" | "description">{
    itemWidth: number;
}