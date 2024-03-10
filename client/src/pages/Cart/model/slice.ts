import getPriceView from "../lib/helpers/getPriceView";
import saveToLocalStorage from "@/shared/lib/helpers/saveToLocalStorage";

import { CartInterface, Payload } from "./interfaces";
import { localStorageKeys } from "@/shared/config/constants";
import { addToCartThunk, getCart } from "./asyncActions";
import { initialState } from "./initialState";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { changeItemCountActions } from "../lib/utils/changeItemCountActions";
import { IApiCart } from "@/shared/model/interfaces";

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, { payload }: PayloadAction<IApiCart>) => {
            state.cart = new Map(payload.items.map((item) => [`${item.productId}_${item.size}_${item.type}`, item]));
            cartSlice.caseReducers.updateViewAndStorage(state);
        },
        addToCart(state, { payload }: PayloadAction<Omit<CartInterface, "category">>) {
            const key = `${payload.productId}_${payload.size}_${payload.type}`;
            const product = state.cart.get(key);

            state.cart.set(key, { ...payload, count: product ? product.count + 1 : 1 });

            cartSlice.caseReducers.updateViewAndStorage(state);
        },
        changeItemCount: (state, { payload }: PayloadAction<Payload>) => {
            const product = state.cart.get(payload.key);

            if (!product) throw new Error(`Cannot find product with ${payload.key} key`);

            state.cart.set(payload.key, {
                ...product,
                count: payload.type === "direct" ? payload.count : changeItemCountActions[payload.type](product.count),
            });

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
            state.priceView = getPriceView([]);
            localStorage.removeItem(localStorageKeys.CART);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getCart.pending, (state) => {
                state.cartLoading = true;
            })
            .addCase(getCart.fulfilled, (state, { payload }: PayloadAction<IApiCart>) => {
                state.cart = new Map(payload.items.map((product) => [`${product.productId}_${product.size}_${product.type}`, product]));
                state.cartLoading = false;
                cartSlice.caseReducers.updateViewAndStorage(state);
            })
            .addCase(getCart.rejected, (state, { error }) => {
                state.cartLoading = false;
                console.log(error);
            })
            .addCase(addToCartThunk.fulfilled, (state, { payload }: PayloadAction<IApiCart>) => {
                payload.items.forEach((product) => state.cart.set(`${product.productId}_${product.size}_${product.type}`, product));
                cartSlice.caseReducers.updateViewAndStorage(state);
            });
    },
});

export const { addToCart, changeItemCount, removeProductFromCart, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;