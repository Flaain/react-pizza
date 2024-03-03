import { PossibleParams } from "@/shared/model/interfaces";
import { api } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const possibleParams: PossibleParams = { search: "title", sort: "sortBy", category: "category" };

export const getProductPerPage = createAsyncThunk("products/getProductPerPage",
    async ({ page, params }: { page: number; params: URLSearchParams }, { rejectWithValue }) => {
        try {
            const tempParams = new URLSearchParams();

            params.forEach((value, key) => {
                possibleParams[key as keyof PossibleParams] && tempParams.set(possibleParams[key as keyof PossibleParams], value);
            });
            
            !tempParams.has('sortBy') && tempParams.set('sortBy', '-rating');
            
            const products = await api.base.getProducts({ endpoint: `/products?_select=-description,-ingredients&page=${page}&limit=6&${tempParams.toString()}` });
            return products;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error);
        }
    }
);