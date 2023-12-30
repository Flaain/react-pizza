import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { localStorageKeys } from "@/shared/config/constants";
import { userInitialState } from "./user.initialState";
import { DeliveryInfo } from "@/pages/Cart";
import saveToLocalStorage from "@/shared/lib/helpers/saveToLocalStorage";

export const userSlice = createSlice({
    name: "user",
    initialState: userInitialState,
    reducers: {
        logout: (state) => {
            state.jwt = null;
            localStorage.removeItem(localStorageKeys.JWT);
        },
        setDeliveryInfo: (state, action: PayloadAction<DeliveryInfo>) => {
            state.deliveryInfo = action.payload;
            saveToLocalStorage({ key: localStorageKeys.DELIVERY_INFO, data: action.payload });
        },
    },
});

export const { logout, setDeliveryInfo } = userSlice.actions;
export default userSlice.reducer;