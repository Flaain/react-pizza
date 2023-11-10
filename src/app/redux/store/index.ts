import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../../../pages/Cart";
import { rootSlice } from "../slices/rootSlice/slice";
import { deliveryModalSlice } from "../../../features/DeliveryModal";

export const reducer = combineReducers({
    [cartSlice.name]: cartSlice.reducer,
    [rootSlice.name]: rootSlice.reducer,
    [deliveryModalSlice.name]: deliveryModalSlice.reducer,
});

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;