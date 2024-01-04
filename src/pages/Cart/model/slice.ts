import getPriceView from "../lib/helpers/getPriceView";
import compareItems from "@/pages/Cart/lib/helpers/compareItems";
import saveToLocalStorage from "@/shared/lib/helpers/saveToLocalStorage";

import { Item } from "@/app/redux";
import { CartItem, Payload } from "./interfaces";
import { localStorageKeys } from "@/shared/config/constants";
import { handleOrder } from "./asyncActions";
import { initialState } from "./initialState";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductSelectorState } from "@/entities/Product/model/interfaces";
import { changeItemCountActions } from "../lib/utils/changeItemCountActions";

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, { payload: { id, category, imageUrl, title, ...productState } }: PayloadAction<Item & ProductSelectorState>) {
            const cartItem = state.cart.get(id);
            const existingIds = Math.max(...(cartItem?.items.map(({ id }) => id) ?? [0]));
            const newItem: CartItem = { id: existingIds + 1, count: 1, ...productState };

            if (cartItem) {
                const itemIndex = cartItem.items.findIndex((item) => compareItems(item, newItem));

                state.cart.set(id, {
                    ...cartItem,
                    items: itemIndex !== -1 ? cartItem.items.map((item, index) => {
                        if (index === itemIndex) {
                            return {
                                ...item,
                                count: item.count + 1,
                            };
                        }
                        return item;
                    }) : [...cartItem.items, newItem],
                });
            } else {
                state.cart.set(id, { id, category, title, imageUrl, items: [newItem] });
            }

            cartSlice.caseReducers.updateViewAndStorage(state);
        },
        changeItemCount: (state, { payload }: PayloadAction<Payload>) => {
            const product = state.cart.get(payload.productId);

            if (!product) throw new Error(`Cannot find product with ${payload.productId} id`);

            state.cart.set(payload.productId, {
                ...product,
                items: product.items.map((item) => {
                    if (item.id === payload.itemId) {
                        return {
                            ...item,
                            count: payload.type === 'direct' ? payload.count : changeItemCountActions[payload.type](item.count)
                        };
                    }
                    return item;
                }),
            });

            cartSlice.caseReducers.updateViewAndStorage(state);
        },

        removeProductFromCart: (state, { payload }: PayloadAction<{ productId: number; itemId: number }>) => {
            const product = state.cart.get(payload.productId);

            if (!product) throw new Error(`Cannot find product in cart with ${payload.productId} id`);

            state.cart.set(payload.productId, { ...product, items: product.items.filter(({ id }) => id !== payload.itemId) });
            cartSlice.caseReducers.checkItemsArr(state, { payload: payload.productId, type: "checkItemsArr" });
        },
        checkItemsArr: (state, { payload }: PayloadAction<number>) => {
            !state.cart.get(payload)?.items.length && state.cart.delete(payload);
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
            });
    },
});

export const { addToCart, changeItemCount, removeProductFromCart, clearCart, clearOrder } = cartSlice.actions;
export default cartSlice.reducer;