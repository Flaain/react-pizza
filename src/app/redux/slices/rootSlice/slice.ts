import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { fetchPizzas } from "./asyncActions";

export const rootSlice = createSlice({
    name: "pizzas",
    initialState,
    reducers: {
        changeSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.pizzas = action.payload;
                state.loading = false;
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default rootSlice.reducer;