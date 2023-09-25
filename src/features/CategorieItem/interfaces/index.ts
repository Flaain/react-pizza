export interface Props {
    name: string;
    categorie: number | undefined;
    selectedCategorie: number | null;
    handleClick: (categorie: number | undefined) => void;
}