import getPriceView from "@/shared/lib/helpers/getPriceView";
import compareItems from "@/shared/lib/helpers/compareItems";
import saveToLocalStorage from "@/shared/lib/helpers/saveToLocalStorage";

import { Item } from "@/app/redux";
import { CartItem } from "../interfaces";
import { localStorageKeys } from "@/shared/config/constants";
import { PizzaState } from "@/widgets/PriceBlock/lib/utils/interfaces";
import { fetchPromocodes, handleOrder } from "./asyncActions";
import { initialState } from "./initialState";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, { payload: { id, category, imageUrl, title, ...pizzaState } }: PayloadAction<Item & PizzaState>) {
            const cartItem = state.cart.find(({ id: _id }) => _id === id);
            const existingIds = cartItem ? Math.max(...cartItem.items.map(({ id }) => id)) : 0;
            const newItem: CartItem = { id: existingIds + 1, count: 1, ...pizzaState };

            if (cartItem) {
                const itemIndex = cartItem.items.findIndex((item) => compareItems(item, newItem));

                if (itemIndex !== -1) {
                    state.cart = state.cart.map((obj) => {
                        if (obj.id === id) {
                            return {
                                ...obj,
                                items: obj.items.map((item, index) => {
                                    if (index === itemIndex) {
                                        return {
                                            ...item,
                                            count: item.count + 1,
                                        };
                                    }
                                    return item;
                                }),
                            };
                        }
                        return obj;
                    });
                } else {
                    state.cart = state.cart.map((obj) => {
                        if (obj.id === id) {
                            return {
                                ...obj,
                                items: [...obj.items, newItem],
                            };
                        }
                        return obj;
                    });
                }
            } else {
                state.cart = [...state.cart, { id, category, title, imageUrl, items: [newItem] }];
            }

            state.priceView = getPriceView(state.cart);

            saveToLocalStorage({ key: localStorageKeys.CART_KEY, data: JSON.stringify(state.cart) });
        },
        clearCart(state) {
            state.cart = [];
            state.priceView = getPriceView(state.cart);
            localStorage.removeItem(localStorageKeys.CART_KEY);
        },
        clearOrder(state) {
            state.ordered = false;
            state.order = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPromocodes.fulfilled, (state, action) => {
                state.promocodes = action.payload;
            })
            .addCase(fetchPromocodes.rejected, (state, action) => {
                state.error = action.error;
            })
            .addCase(handleOrder.pending, (state) => {
                state.orderLoading = true;
            })
            .addCase(handleOrder.fulfilled, (state, action) => {
                state.orderLoading = false;
                state.ordered = true;
                state.cart = [];
                state.priceView = getPriceView(state.cart);
                state.order = action.payload;
            })
            .addCase(handleOrder.rejected, (state, action) => {
                state.orderLoading = false;
                state.ordered = false;
                state.error = action.error;
            })
    },
});

export const { addToCart, clearCart, clearOrder } = cartSlice.actions;
export default cartSlice.reducer;