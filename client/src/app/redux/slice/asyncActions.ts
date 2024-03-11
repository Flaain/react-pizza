import getDataFromLocalStorage from "@/shared/lib/helpers/getDataFromLocalStorage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/shared/api";
import { PossibleParams } from "@/shared/model/interfaces";
import { initialSortNames, localStorageKeys } from "@/shared/config/constants";
import { setCart } from "@/pages/Cart/model/slice";
import { getCart } from "@/pages/Cart/model/asyncActions";
import { CartInterface } from "@/pages/Cart/model/interfaces";

const possibleParams: PossibleParams = { search: "title", sort: "sortBy", category: "category" };

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (controller: AbortController, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams(document.location.search);

            if (!params.size) {
                const { data } = await api.base.getProductsPerPage({
                    endpoint: "/products?_select=-description,-ingredients&page=1&limit=6&sortBy=-rating",
                    signal: controller.signal,
                });
                return data;
            }

            const tempParams = new URLSearchParams();

            params.forEach((value, key) => {
                possibleParams[key as keyof PossibleParams] && tempParams.set(possibleParams[key as keyof PossibleParams], value);
            });

            (!tempParams.has("sortBy") || !initialSortNames.has(tempParams.get("sortBy")!)) && tempParams.set("sortBy", "-rating");
            tempParams.has("title") && tempParams.set("title", `${tempParams.get("title")}*`);

            const { data } = await api.base.getProductsPerPage({
                endpoint: `/products?_select=-description,-ingredients&page=1&limit=6&${tempParams.toString()}`,
                signal: controller.signal,
            });
            return data;
        } catch (error) {
            const isAbortError = error instanceof Error && error.name === "AbortError";
            console[isAbortError ? "log" : "error"](error);
            return rejectWithValue(isAbortError ? null : error);
        }
    }
); // the whole function is a bad on my opinion. But right now i don't know how to rewrite it in better way

export const getProfile = createAsyncThunk("user/getProfile", async (token: string, { rejectWithValue, dispatch }) => {
    try {
        const { data: { user } } = await api.user.getProfile({ token });

        dispatch(setCart(user.cart));
        return user;
    } catch (error) {
        console.error(error);

        dispatch(getCart(getDataFromLocalStorage<Array<Omit<CartInterface, "category">>>(localStorageKeys.CART, [])));

        return rejectWithValue(error);
    }
});