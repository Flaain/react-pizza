import { createSlice } from "@reduxjs/toolkit";
import { userInitialState } from "./initialState";
import { localStorageKeys } from "@/shared/config/constants";

export const authSlice = createSlice({
    name: "auth",
    initialState: userInitialState,
    reducers: {
        logout: (state) => {
            state.jwt = null;
            localStorage.removeItem(localStorageKeys.JWT);
        },
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer