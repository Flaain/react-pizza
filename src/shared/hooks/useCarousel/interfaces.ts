import { Product } from "@/shared/api/interfaces";

export interface Props {
    scrollRef: React.RefObject<HTMLUListElement | null>;
    items: Array<Product>;
    options?: Options;
}

export interface Options {
    slidesToShow: number;
    slidesToScroll: number;
    gap: number;
}