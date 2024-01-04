import getDataFromLocalStorage from "@/shared/lib/helpers/getDataFromLocalStorage";
import { localStorageKeys } from "@/shared/config/constants";
import { UserSliceState } from "../../model/interfaces";
import { Address } from "@/shared/model/interfaces";

export const userInitialState: UserSliceState = {
    jwt: null,
    deliveryInfo: getDataFromLocalStorage(localStorageKeys.DELIVERY_INFO, null),
    paymentInfo: { method: 'card', card: { address: 123321, cvv: 365, expiry: new Date() }},
    addresses: new Map(getDataFromLocalStorage<Array<Address>>(localStorageKeys.USER_ADDRESSES, []).map((address) => [address.address, address])),
    lang: navigator.language,
};