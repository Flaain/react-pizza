import { Pizza } from "../../../../shared/api/interfaces";

export interface Props {
    title: string;
    items: Pizza[];
    slidesToShow?: number;
    slidesToScroll?: number;
    gap?: number;
}