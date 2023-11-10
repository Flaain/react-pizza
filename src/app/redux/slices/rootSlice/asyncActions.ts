import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/shared/api";

export const fetchPizzas = createAsyncThunk("pizzas/fetchPizzas", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.getPizzas();
        return data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(window.navigator.onLine ? error : { [error.name]: error.message, message: "check your internet connection" });
    }
});
