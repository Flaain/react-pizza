import getDataFromLocalStorage from "@/shared/lib/helpers/getDataFromLocalStorage";
import { localStorageKeys } from "@/shared/config/constants";
import { UserSliceState } from "../../model/interfaces";
import { PaymentInfo } from "@/widgets/PaymentModal";

const revalidatePaymentInfo = () => {
    const candidateMethod = getDataFromLocalStorage(localStorageKeys.PAYMENT_INFO, null) as PaymentInfo | null; 
    const allowedMethods = ["card", "cash"];
    
    return !candidateMethod || !candidateMethod.method || !allowedMethods.includes(candidateMethod.method) ? null : candidateMethod;
}

export const userInitialState: UserSliceState = {
    _id: null,
    email: null,
    token: getDataFromLocalStorage(localStorageKeys.JWT, null),
    name: null,
    deliveryInfo: null,
    paymentInfo: revalidatePaymentInfo(),
    addresses: new Map(),
    lang: navigator.language,
    isAuthInProgress: true,
    isAuthenticated: false,
    extraInfo: null,
};
