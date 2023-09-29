import { Names } from "../../../features/SortPopup/interfaces";

export interface Props {
    names: Array<Names>;
    handleSort: (sortType: string, index: number) => void;
    currentSort: number;
}