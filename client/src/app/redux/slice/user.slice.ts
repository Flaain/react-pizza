import saveToLocalStorage from "@/shared/lib/helpers/saveToLocalStorage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { localStorageKeys } from "@/shared/config/constants";
import { userInitialState } from "./user.initialState";
import { Address } from "@/shared/model/interfaces";
import { DeliveryInfo } from "@/pages/DeliveryMethod/model/interfaces";
import { PaymentInfo } from "@/widgets/PaymentModal";
import { getProfile } from "./asyncActions";
import { IAuthData } from "@/app/model/interfaces";

export const userSlice = createSlice({
    name: "user",
    initialState: userInitialState,
    reducers: {
        signin: (state, { payload }: PayloadAction<IAuthData>) => {
            state._id = payload._id;
            state.jwt = payload.token;
            state.name = payload.name;
            state.email = payload.email;

            saveToLocalStorage({ key: localStorageKeys.JWT, data: payload.token });
        },
        logout: (state) => {
            state.jwt = null;
            state._id = null;
            state.email = null;
            state.name = null;
            
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
    extraReducers(builder) {
        builder
        .addCase(getProfile.fulfilled, (state, { payload }: PayloadAction<Omit<IAuthData, "token">>) => {
            state._id = payload._id;
            state.name = payload.name;
            state.email = payload.email;
        })
        .addCase(getProfile.rejected, (state) => {
            state._id = null;
            state.email = null;
            state.jwt = null;
            state.name = null;
        })
    },
});

export const { logout, signin, setDeliveryInfo, setPaymentInfo, setNewAddress } = userSlice.actions;
export default userSlice.reducer;