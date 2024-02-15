import getPriceView from "../lib/helpers/getPriceView";
import saveToLocalStorage from "@/shared/lib/helpers/saveToLocalStorage";

import { Payload } from "./interfaces";
import { localStorageKeys } from "@/shared/config/constants";
import { getCart, handleOrder } from "./asyncActions";
import { initialState } from "./initialState";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { changeItemCountActions } from "../lib/utils/changeItemCountActions";
import { CartItemLocal } from "@/shared/model/interfaces";

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, { payload }: PayloadAction<CartItemLocal>) {
            const key = `${payload.id}_${payload.size}_${payload.type}`;
            const product = state.cart.get(key);

            state.cart.set(key, { ...payload, count: product ? product.count + 1 : 1 });
            
            cartSlice.caseReducers.updateViewAndStorage(state);
        },
        changeItemCount: (state, { payload }: PayloadAction<Payload>) => {
            const product = state.cart.get(payload.key);

            if (!product) throw new Error(`Cannot find product with ${payload.key} key`);

            state.cart.set(payload.key, { ...product, count: payload.type === "direct" ? payload.count : changeItemCountActions[payload.type](product.count) });

            cartSlice.caseReducers.updateViewAndStorage(state);
        },
        
        removeProductFromCart: (state, { payload }: PayloadAction<{ key: string }>) => {
            const product = state.cart.get(payload.key);
            
            if (!product) throw new Error(`Cannot find product with ${payload.key} key`);
            
            state.cart.delete(payload.key);
            
            cartSlice.caseReducers.updateViewAndStorage(state);
        },
        updateViewAndStorage: (state) => {
            const cartArr = [...state.cart.values()];
            state.priceView = getPriceView(cartArr);
            saveToLocalStorage({ key: localStorageKeys.CART, data: cartArr });
        },
        clearCart(state) {
            state.cart.clear();
            state.priceView = getPriceView([...state.cart.values()]);
            localStorage.removeItem(localStorageKeys.CART);
        },
        clearOrder(state) {
            state.ordered = false;
            state.order = null;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(handleOrder.pending, (state) => {
                state.orderLoading = true;
            })
            .addCase(handleOrder.fulfilled, (state, action) => {
                state.orderLoading = false;
                state.ordered = true;
                state.cart = new Map();
                state.priceView = getPriceView([...state.cart.values()]);
                state.order = action.payload;
            })
            .addCase(handleOrder.rejected, (state, action) => {
                state.orderLoading = false;
                state.ordered = false;
                state.error = action.error;
            })
            .addCase(getCart.fulfilled, (state, { payload }) => {
                state.cart = new Map(payload.map((product) => [`${product.id}_${product.size}_${product.type}`, product]));
                cartSlice.caseReducers.updateViewAndStorage(state);
            })
            .addCase(getCart.rejected, (state, { error }) => {
                console.log(error)
            })
    },
});

export const { addToCart, changeItemCount, removeProductFromCart, clearCart, clearOrder } = cartSlice.actions;
export default cartSlice.reducer;