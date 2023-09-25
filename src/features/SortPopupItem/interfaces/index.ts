export interface Props {
    name: string;
    sort: string;
    index: number;
    currentSort: number;
    handleSort: (sortType: string, index: number) => void;
}