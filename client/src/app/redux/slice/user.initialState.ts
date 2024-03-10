import getDataFromLocalStorage from "@/shared/lib/helpers/getDataFromLocalStorage";
import { localStorageKeys } from "@/shared/config/constants";
import { UserSliceState } from "../../model/interfaces";

export const userInitialState: UserSliceState = {
    _id: null,
    email: null,
    jwt: getDataFromLocalStorage(localStorageKeys.JWT, null),
    name: null,
    deliveryInfo: null,
    paymentInfo: null,
    addresses: new Map(),
    lang: navigator.language,
    isAuthInProgress: false,
    extraInfo: null,
};
