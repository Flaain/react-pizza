import { Names } from "../../SortPopup/interfaces";

export interface Props extends Omit<Names, "id"> {
    index: number;
    sortIndex: number;
    handleSort: (index: number) => void;
}