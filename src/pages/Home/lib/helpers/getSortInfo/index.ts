import { initialSortNames } from "@/shared/config/constants";

const getSortInfo = (index: number) => {
    const sortDirection = initialSortNames[index]?.sort.includes("-") ? -1 : 1;
    const property = initialSortNames[index]?.sort.replace("-", "");

    return { sortDirection, property }
}

export default getSortInfo;