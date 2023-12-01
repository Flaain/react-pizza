import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/shared/api";
import { PossibleParams } from "@/shared/model/interfaces";

const possibleParams: PossibleParams = { search: "title", sort: "sortBy", category: "category" };

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (controller: AbortController, { rejectWithValue }) => {
    try {
        const params = new URLSearchParams(document.location.search);

        if (!params.size) {
            const { data } = await api.getProducts("/products?_select=-description,-ingredients&page=1&limit=6&sortBy=-rating", controller);
            return data;
        }

        const tempParams = new URLSearchParams();

        params.forEach((value, key) => {
            possibleParams[key as keyof PossibleParams] && tempParams.set(possibleParams[key as keyof PossibleParams], value);
        });

        if (!tempParams.size) return [];
        
        !tempParams.has('sortBy') && tempParams.set('sortBy', '-rating');

        const { data } = await api.getProducts(`/products?_select=-description,-ingredients&page=1&limit=6&${tempParams.toString()}`, controller);
        return data;
    } catch (error) {
        const isAbortError = error instanceof Error && error.name === 'AbortError';
        console[isAbortError ? 'log' : 'error'](error); 
        return rejectWithValue(isAbortError ? null : error);
    }
});