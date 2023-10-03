import { Names } from "../../../../features/SortPopup/interfaces";

const getSortInfo = (initial: Array<Names>, index: number) => {
    const sortDirection = initial[index]?.sort.includes("-") ? -1 : 1;
    const property = initial[index]?.sort.replace("-", "");

    return { sortDirection, property }
}

export default getSortInfo;