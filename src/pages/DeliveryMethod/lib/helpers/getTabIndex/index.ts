import { DeliveryMethod } from "../../../model/interfaces";

export const getTabIndex = (params: URLSearchParams, deliveryMethods: Array<DeliveryMethod>, key: string) => {
    const tab = params.get(key);

    if (tab !== null) {
        if (typeof deliveryMethods[Number(tab)] === "undefined") {
            const url = new URL(document.location.href);

            params.delete(key);
            url.search = params.toString();
            window.history.replaceState({}, "", url.toString());

            return 0;
        }
        return Number(tab);
    }
    return 0;
};