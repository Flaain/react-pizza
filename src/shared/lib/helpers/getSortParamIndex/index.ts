import { Names } from "../../../../features/SortPopup/model/interfaces";

const getSortParamIndex = (initial: Array<Names>, searchParams: URLSearchParams, key: string) => {
    if (typeof initial[Number(searchParams.get(key))]?.sort === "undefined" || document.location.pathname !== '/') {
        const url = new URL(document.location.href);

        searchParams.delete(key);
        url.search = searchParams.toString();
        window.history.replaceState({}, '', url.toString());

        return 0;
    }
    return Number(searchParams.get(key));
};

export default getSortParamIndex;