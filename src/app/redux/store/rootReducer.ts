import { cartSlice } from "@/pages/Cart";
import { rootSlice } from "../slice/slice";
import { authSlice } from "@/pages/Auth/model/slice";
import { deliveryModalSlice } from "@/features/DeliveryModal";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    [rootSlice.name]: rootSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [deliveryModalSlice.name]: deliveryModalSlice.reducer,
});