import { SetURLSearchParams } from "react-router-dom";

export interface Categories {
    name: string;
    categorie: number | null;
}

export interface Props {
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
}