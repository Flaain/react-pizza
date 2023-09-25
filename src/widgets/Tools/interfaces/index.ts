export interface Categories {
    name: string;
    categorie?: number;
}

export interface Props {
    categories: Array<Categories>;
    sortNames: Array<{ name: string; sort: string }>;
}