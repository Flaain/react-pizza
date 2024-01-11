export interface Props {
    name: string;
    categorie: number | null;
    activeCategory: number | null;
    handleClick: (categorie: number | null) => void;
}