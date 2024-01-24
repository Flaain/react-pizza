import getDataFromLocalStorage from "@/shared/lib/helpers/getDataFromLocalStorage";
import { localStorageKeys } from "@/shared/config/constants";
import { UserSliceState } from "../../model/interfaces";
import { Address } from "@/shared/model/interfaces";
import { CreditCard } from "@/widgets/PaymentModal/model/interfaces";

export const userInitialState: UserSliceState = {
    __id: null,
    email: null,
    jwt: getDataFromLocalStorage(localStorageKeys.JWT, null),
    name: null,
    deliveryInfo: getDataFromLocalStorage(localStorageKeys.DELIVERY_INFO, null),
    paymentInfo: getDataFromLocalStorage(localStorageKeys.PAYMENT_INFO, null),
    addresses: new Map(getDataFromLocalStorage<Array<Address>>(localStorageKeys.USER_ADDRESSES, []).map((address) => [address.address, address])),
    cards: new Map(getDataFromLocalStorage<Array<CreditCard>>(localStorageKeys.USER_CARDS, []).map((card) => [card.address, card])),
    lang: navigator.language,
};