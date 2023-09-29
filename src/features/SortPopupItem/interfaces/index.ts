import { Names } from "../../SortPopup/interfaces";

export interface Props extends Omit<Names, "id"> {
    index: number;
    currentSort: number;
    handleSort: (sortType: string, index: number) => void;
}