import { cartSlice } from "@/pages/Cart";
import { rootSlice } from "../slice/root.slice";
import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "../slice/user.slice";

export const rootReducer = combineReducers({
    [rootSlice.name]: rootSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
});