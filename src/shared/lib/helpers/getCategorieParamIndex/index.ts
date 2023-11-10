import { Categories } from "../../../../widgets/Tools/interfaces";

const getCategorieParamIndex = (initial: Array<Categories>, searchParams: URLSearchParams, key: string) => {
    if (typeof initial[Number(searchParams.get(key))]?.categorie === "undefined" || document.location.pathname !== '/') {
        const url = new URL(document.location.href);

        searchParams.delete(key);
        url.search = searchParams.toString();
        window.history.replaceState({}, '', url.toString());
        
        return null;
    }
    return Number(searchParams.get(key));
};

export default getCategorieParamIndex;