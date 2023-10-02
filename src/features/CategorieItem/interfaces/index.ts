export interface Props {
    name: string;
    index: number;
    selectedCategorie: number | null;
    handleClick: (index: number) => void;
}