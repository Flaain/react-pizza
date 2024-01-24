import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/shared/api";
import { PossibleParams } from "@/shared/model/interfaces";
import { initialSortNames } from "@/shared/config/constants";

const possibleParams: PossibleParams = { search: "title", sort: "sortBy", category: "category" };

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (controller: AbortController, {  rejectWithValue }) => {
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
        
        (!tempParams.has("sortBy") || !initialSortNames.has(tempParams.get("sortBy")!)) && tempParams.set("sortBy", "-rating");
        tempParams.has("title") && tempParams.set("title", `${tempParams.get("title")}*`);

        const { data } = await api.getProducts(`/products?_select=-description,-ingredients&page=1&limit=6&${tempParams.toString()}`, controller);
        return data;
    } catch (error) {
        const isAbortError = error instanceof Error && error.name === "AbortError";
        console[isAbortError ? "log" : "error"](error);
        return rejectWithValue(isAbortError ? null : error);
    }
}); // the whole function is a bad on my opinion. But right now i don't know how to rewrite it in better way


export const getProfile = createAsyncThunk("user/getProfile", async (token: string, { rejectWithValue }) => {
    try {
        const response = await fetch(import.meta.env.VITE_SERVER_BASE_URL + "/auth/profile", { 
            method: "GET", 
            headers: { 
                Authorization: `Bearer ${token}` 
            } 
        });
        
        if (!response.ok) throw new Error(`Cannot get profile - ${response.statusText}`)

        const { data } = await response.json();
    
        return data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error);
    }
})