import { Names } from "../../../../features/SortPopup/interfaces";

const getSortParamIndex = (initial: Array<Names>, searchParams: URLSearchParams, key: string) => {
    if (typeof initial[Number(searchParams.get(key))]?.sort === "undefined") {
        return 0;
    }
    return Number(searchParams.get(key));
};

export default getSortParamIndex;