import { createSlice } from "@reduxjs/toolkit";
import { rootInitialState } from "./initialState";
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
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state._meta = action.payload.meta ?? null;
                state.products = action.payload.items ?? action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(getProductPerPage.pending, (state) => {
                state.perPageLoading = true;
            })
            .addCase(getProductPerPage.fulfilled, (state, action) => {
                state._meta = action.payload.meta;
                state.products = [...new Map([...state.products, ...action.payload.items].map((product) => [product.id, product])).values()];
                state.perPageLoading = false;
            })
            .addCase(getProductPerPage.rejected, (state) => {
                state.perPageLoading = false;
            });
    },
});

export default rootSlice.reducer;