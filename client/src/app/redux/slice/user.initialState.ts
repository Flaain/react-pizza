import getDataFromLocalStorage from "@/shared/lib/helpers/getDataFromLocalStorage";
import { localStorageKeys } from "@/shared/config/constants";
import { UserSliceState } from "../../model/interfaces";

export const userInitialState: UserSliceState = {
    _id: null,
    email: null,
    token: getDataFromLocalStorage(localStorageKeys.JWT, null),
    name: null,
    deliveryInfo: null,
    paymentInfo: null,
    addresses: new Map(),
    lang: navigator.language,
    isAuthInProgress: true,
    isAuthenticated: false,
    extraInfo: null,
};
