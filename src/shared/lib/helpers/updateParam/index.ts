import { Names } from "../../../../features/SortPopup/model/interfaces";
import { Categories } from "../../../../widgets/Tools/interfaces";

const updateParam = (params: URLSearchParams, property: string, initial: Array<Categories | Names>, index: number | null) => {
    if (index !== null) {
        if (typeof initial[index]?.[property] !== "undefined") { 
            params.set(property, String(index));
        } else {
            params.delete(property);
        }
    } else {
        params.delete(property);
    }

    const url = new URL(document.location.href);
    url.search = params.toString();

    window.history.replaceState({}, '', `${url.toString()}`);
};

export default updateParam;