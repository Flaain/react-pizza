import getDataFromLocalStorage from "@/shared/lib/helpers/getDataFromLocalStorage";
import { localStorageKeys } from "@/shared/config/constants";
import { UserSliceState } from "../../model/interfaces";
import { Address } from "@/shared/model/interfaces";

export const userInitialState: UserSliceState = {
    jwt: null,
    deliveryInfo: getDataFromLocalStorage(localStorageKeys.DELIVERY_INFO, null),
    paymentInfo: getDataFromLocalStorage(localStorageKeys.PAYMENT_INFO, null),
    addresses: new Map(getDataFromLocalStorage<Array<Address>>(localStorageKeys.USER_ADDRESSES, []).map((address) => [address.address, address])),
    lang: navigator.language,
};