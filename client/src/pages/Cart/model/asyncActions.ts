import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/shared/api";
import { OrderHandler } from "@/app/model/interfaces";
import { Order } from "@/shared/model/interfaces";

export const handleOrder = createAsyncThunk("cart/handleOrder",async ({ cart, pizzas, deliveryInfo, total }: OrderHandler) => {
    const order = cart.map((cartItem) => ({
        ...cartItem,
        ...pizzas.find((pizzaItem) => pizzaItem.id === cartItem.id),
    }));
    const { data } = await api.postOrder("/orders", { deliveryInfo, order, totalPrice: total } as Order);

    return data;
});
