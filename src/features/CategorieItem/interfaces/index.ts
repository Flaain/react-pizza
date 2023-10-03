export interface Props {
    name: string;
    index: number;
    selectedCategorieIndex: number | null;
    handleClick: (index: number) => void;
}