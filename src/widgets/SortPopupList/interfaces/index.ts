export interface Props {
    names: Array<{ name: string; sort: string }>;
    handleSort: (sortType: string, index: number) => void;
    currentSort: number;
}