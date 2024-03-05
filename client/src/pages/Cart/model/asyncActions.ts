import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/shared/api";
import { CartInterface, IAddToCartThunk } from "./interfaces";

export const getCart = createAsyncThunk("cart/getCart", async (cart: Array<Omit<CartInterface, "category">>) => {
    const { data } = await api.cart.getCart({ body: JSON.stringify(cart) });
    return data;
});

export const addToCartThunk = createAsyncThunk("cart/addToCart", async ({ product, token }: IAddToCartThunk) => {
    const { data } = await api.cart.addToCart({ body: JSON.stringify(product), token });
    return data;
});