export interface Props {
    names: Array<{ name: string; sort: string }>;
    currentSort: number;
    setCurrentSort: React.Dispatch<React.SetStateAction<number>>;
}