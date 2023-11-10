import getDataFromLocalStorage from "../../../shared/lib/helpers/getDataFromLocalStorage";
import { localStorageKeys } from "../../../shared/config/constants";
import { Address, initialState as IS } from "../interfaces";
import { getTabIndex } from "../lib/helpers/getTabIndex";

const params = new URLSearchParams(new URL(document.location.href).searchParams);
const deliveryMethods = [
    {
        name: "Самовывозом",
        addresses: [],
    },
    {
        name: "Курьером",
        addresses: getDataFromLocalStorage<Array<Address>>(localStorageKeys.USER_ADDRESSES_KEY, []),
        isEditable: true,
        isAddable: true,
    },
];

export const initialState: IS = {
    loading: true,
    deliveryMethods,
    tabIndex: getTabIndex(params, deliveryMethods, "tab"),
    error: null,
};