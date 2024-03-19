import saveToLocalStorage from "@/shared/lib/helpers/saveToLocalStorage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { localStorageKeys } from "@/shared/config/constants";
import { userInitialState } from "./user.initialState";
import { Address, Profile } from "@/shared/model/interfaces";
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
            Object.assign(state, { ...userSlice.getInitialState(), token: null, isAuthInProgress: false });

            localStorage.removeItem(localStorageKeys.JWT);
        },
        setDeliveryInfo: (state, { payload }: PayloadAction<DeliveryInfo>) => {
            state.deliveryInfo = payload;
            saveToLocalStorage({ key: localStorageKeys.DELIVERY_INFO, data: payload });
        },
        setNewAddress: (state, { payload }: PayloadAction<Address>) => {
            state.addresses.set(payload.id, payload);
        },
        setAddresses: (state, { payload }: PayloadAction<Array<Address>>) => {
            payload.forEach((address) => state.addresses.set(address.id, address));
        },
        setPaymentInfo: (state, { payload }: PayloadAction<PaymentInfo>) => {
            state.paymentInfo = payload;
            saveToLocalStorage({ key: localStorageKeys.PAYMENT_INFO, data: payload });
        },
        setIsAuthInProgress: (state, { payload }: PayloadAction<boolean>) => {
            state.isAuthInProgress = payload;
        },
        setExtraInfo: (state, { payload }: PayloadAction<Profile["extraInfo"]>) => {
            state.extraInfo = payload;
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
                    addresses: new Map(payload.addresses.map((address) => [address.id, address])),
                });
            })
            .addCase(getProfile.rejected, (state) => {
                state.isAuthInProgress = false;
                state.token = null;

                localStorage.removeItem(localStorageKeys.JWT);
            });
    },
});

export const {
    logout,
    signin,
    setDeliveryInfo,
    setPaymentInfo,
    setAddresses,
    setNewAddress,
    setIsAuthInProgress,
    setExtraInfo,
} = userSlice.actions;
export default userSlice.reducer;