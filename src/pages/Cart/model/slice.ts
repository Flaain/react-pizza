import getPriceView from "../lib/helpers/getPriceView";
import compareItems from "@/pages/Cart/lib/helpers/compareItems";
import saveToLocalStorage from "@/shared/lib/helpers/saveToLocalStorage";

import { Item } from "@/app/redux";
import { CartItem } from "./interfaces";
import { localStorageKeys } from "@/shared/config/constants";
import { handleOrder } from "./asyncActions";
import { initialState } from "./initialState";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductSelectorState } from "@/entities/Product/model/interfaces";

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, { payload: { id, category, imageUrl, title, ...pizzaState } }: PayloadAction<Item & ProductSelectorState>) {
            const cartItem = state.cart.get(id);
            const existingIds = Math.max(...cartItem?.items.map(({ id }) => id) ?? [0]);
            const newItem: CartItem = { id: existingIds + 1, count: 1, ...pizzaState };

            if (state.cart.has(id)) {
                const itemIndex = cartItem?.items.findIndex((item) => compareItems(item, newItem));
                
                state.cart.set(id, {
                    ...cartItem!,
                    items: itemIndex !== -1 ? cartItem!.items.map((item, index) => { 
                        if (index === itemIndex) {
                            return {
                                ...item,
                                count: item.count + 1,
                            };
                        }
                        return item;
                    }) : [...cartItem!.items, newItem],
                });
            } else {
                state.cart.set(id, { id, category, title, imageUrl, items: [newItem] });
            }

            state.priceView = getPriceView([...state.cart.values()]);

            saveToLocalStorage({ key: localStorageKeys.CART_KEY, data: [...state.cart.values()] });
        },
        clearCart(state) {
            state.cart = new Map();
            state.priceView = getPriceView([...state.cart.values()]);
            localStorage.removeItem(localStorageKeys.CART_KEY);
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
            });
    },
});

export const { addToCart, clearCart, clearOrder } = cartSlice.actions;
export default cartSlice.reducer;