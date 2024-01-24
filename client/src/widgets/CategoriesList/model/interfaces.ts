import { SetURLSearchParams } from "react-router-dom";

export interface CategorieListProps {
    setSearchParams: SetURLSearchParams;
    activeCategory: number | null;
}

export interface CategorieItemProps {
    name: string;
    categorie: number | null;
    activeCategory: number | null;
    handleClick: (categorie: number | null) => void;
}