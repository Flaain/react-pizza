import saveToLocalStorage from "@/shared/lib/helpers/saveToLocalStorage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { localStorageKeys } from "@/shared/config/constants";
import { userInitialState } from "./user.initialState";
import { IUserAddress, Profile } from "@/shared/model/interfaces";
import { DeliveryInfo } from "@/pages/DeliveryMethod/model/interfaces";
import { PaymentInfo } from "@/widgets/PaymentModal";
import { getProfile } from "./asyncActions";

export const userSlice = createSlice({
    name: "user",
    initialState: userInitialState,
    reducers: {
        signin: (state, { payload }: PayloadAction<Profile>) => {
            Object.assign(state, { ...payload, isAuthenticated: true });

            saveToLocalStorage({ key: localStorageKeys.JWT, data: payload.token });
        },
        logout: (state) => {
            Object.assign(state, { ...userSlice.getInitialState(), token: null });

            localStorage.removeItem(localStorageKeys.JWT);
        },
        setDeliveryInfo: (state, { payload }: PayloadAction<DeliveryInfo>) => {
            state.deliveryInfo = payload;
            saveToLocalStorage({ key: localStorageKeys.DELIVERY_INFO, data: payload });
        },
        setNewAddress: (state, { payload }: PayloadAction<IUserAddress>) => {
            state.addresses.set(payload._id, payload);
        },
        setAddresses: (state, { payload }: PayloadAction<IUserAddress[]>) => {
            payload.forEach((address) => state.addresses.set(address._id, address));
        },
        setPaymentInfo: (state, { payload }: PayloadAction<PaymentInfo>) => {
            state.paymentInfo = payload;
            saveToLocalStorage({ key: localStorageKeys.PAYMENT_INFO, data: payload });
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getProfile.pending, (state) => {
                state.isAuthInProgress = true;
            })
            .addCase(getProfile.fulfilled, (state, { payload }: PayloadAction<Omit<Profile, "token">>) => {
                Object.assign(state, { 
                    ...payload, 
                    isAuthInProgress: false, 
                    isAuthenticated: true, 
                    addresses: new Map(payload.addresses.map((address) => [address, address])) 
                });
            })
            .addCase(getProfile.rejected, (state) => {
                state.isAuthInProgress = false;
                state.token = null;
                
                localStorage.removeItem(localStorageKeys.JWT);
            });
    },
});

export const { logout, signin, setDeliveryInfo, setPaymentInfo, setAddresses, setNewAddress } = userSlice.actions;
export default userSlice.reducer;