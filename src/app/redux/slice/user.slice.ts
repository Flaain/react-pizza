import saveToLocalStorage from "@/shared/lib/helpers/saveToLocalStorage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { localStorageKeys } from "@/shared/config/constants";
import { userInitialState } from "./user.initialState";
import { DeliveryInfo } from "@/pages/Cart";
import { Address } from "@/shared/model/interfaces";

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
    },
});

export const { logout, setDeliveryInfo, setNewAddress } = userSlice.actions;
export default userSlice.reducer;