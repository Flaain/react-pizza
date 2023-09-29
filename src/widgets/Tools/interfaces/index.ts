import { Names } from "../../../features/SortPopup/interfaces";

export interface Categories {
    name: string;
    categorie?: number;
}

export interface Props {
    categories: Array<Categories>;
    sortNames: Array<Names>;
}