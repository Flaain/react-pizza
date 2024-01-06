import { Sort } from "@/shared/model/interfaces";
import { SetURLSearchParams } from "react-router-dom";

export interface SortPopupProps {
    setSearchParams: SetURLSearchParams;
    activeSort: Sort;
}

export interface SortPopupListProps {
    activeSort: Sort;
    handleSort: (sort: string) => void;
}

export interface SortPopupItemProps extends Omit<Sort, "id"> {
    activeSort: Sort;
    handleSort: (sort: string) => void;
}