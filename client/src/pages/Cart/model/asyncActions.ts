import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/shared/api";
import { CartInterface, IAddToCartThunk } from "./interfaces";

export const getCart = createAsyncThunk("cart/getCart", async (cart: Array<Omit<CartInterface, "category">>, { rejectWithValue }) => {
    try {
        const { data: { cart: updatedCart } } = await api.cart.getCart({ body: JSON.stringify(cart) });

        if (!updatedCart) return rejectWithValue("Cannot revalidate cart");

        return updatedCart;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const addToCartThunk = createAsyncThunk("cart/addToCart", async ({ product, token }: IAddToCartThunk) => {
    const { data: { cart } } = await api.cart.addToCart({ body: JSON.stringify(product), token });
    return cart;
});