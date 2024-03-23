import { createSlice } from "@reduxjs/toolkit";
import { rootInitialState } from "./root.initialState";
import { fetchProducts } from "./asyncActions";
import { getProductPerPage } from "@/pages/Home/model/asyncActions";

export const rootSlice = createSlice({
    name: "root",
    initialState: rootInitialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, { payload }) => {
                state._meta = payload.meta;
                state.products = payload.items;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(getProductPerPage.fulfilled, (state, action) => {
                state._meta = action.payload.meta;
                state.products = [...state.products, ...action.payload.items];
            });
    },
});

export default rootSlice.reducer;