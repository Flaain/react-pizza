import saveToLocalStorage from "@/shared/lib/helpers/saveToLocalStorage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { localStorageKeys } from "@/shared/config/constants";
import { userInitialState } from "./user.initialState";
import { Address } from "@/shared/model/interfaces";
import { DeliveryInfo } from "@/pages/DeliveryMethod/model/interfaces";
import { PaymentInfo } from "@/widgets/PaymentModal";

export const userSlice = createSlice({
    name: "user",
    initialState: userInitialState,
    reducers: {
        logout: (state) => {
            state.jwt = null;
            localStorage.removeItem(localStorageKeys.JWT);
        },
        setDeliveryInfo: (state, { payload }: PayloadAction<DeliveryInfo>) => {
            state.deliveryInfo = payload;
            saveToLocalStorage({ key: localStorageKeys.DELIVERY_INFO, data: payload });
        },
        setNewAddress: (state, { payload }: PayloadAction<Address>) => {
            state.addresses.set(payload.address, payload);
            saveToLocalStorage({ key: localStorageKeys.USER_ADDRESSES, data: [...state.addresses.values()] });
        },
        setPaymentInfo: (state, { payload }: PayloadAction<PaymentInfo>) => {
            state.paymentInfo = payload;
            saveToLocalStorage({ key: localStorageKeys.PAYMENT_INFO, data: payload });
        }
    },
});

export const { logout, setDeliveryInfo, setPaymentInfo, setNewAddress } = userSlice.actions;
export default userSlice.reducer;