import { Categories } from "../../../../widgets/Tools/interfaces";

const getCategorieParamIndex = (initial: Array<Categories>, searchParams: URLSearchParams, key: string) => {
    if (typeof initial[Number(searchParams.get(key))]?.categorie === "undefined") {
        return null;
    }
    return Number(searchParams.get(key));
};

export default getCategorieParamIndex;