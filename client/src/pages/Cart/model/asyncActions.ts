import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/shared/api";
import { OrderHandler } from "@/app/model/interfaces";
import { Order } from "@/shared/model/interfaces";
import { RootState } from "@/app/redux";

export const handleOrder = createAsyncThunk(
    "cart/handleOrder",
    async ({ cart, pizzas, deliveryInfo, total }: OrderHandler) => {
        const order = cart.map((cartItem) => ({
            ...cartItem,
            ...pizzas.find((pizzaItem) => pizzaItem.id === cartItem.id),
        }));
        const { data } = await api.postOrder("/orders", { deliveryInfo, order, totalPrice: total } as Order);

        return data;
    }
);

export const getDetailedInfo = createAsyncThunk("cart/getDetailedInfo", async (_, { getState }) => {
    const response = await fetch(`https://53e11b480c15b9f5.mokky.dev/products?id=${[...new Set([...(getState() as RootState).cart.cart.values()].map(({ id }) => id))].join("&id[]=")}`);
    const data = await response.json();

    return data;
});
