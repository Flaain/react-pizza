import { Names } from "../../../features/SortPopup/interfaces";

export interface Props {
    names: Array<Names>;
    handleSort: (index: number) => void;
    selectedSortIndex: number;
}