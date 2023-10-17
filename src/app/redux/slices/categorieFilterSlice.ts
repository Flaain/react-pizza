import getCategorieParamIndex from "../../../shared/lib/helpers/getCategorieParamIndex";
import { createSlice } from "@reduxjs/toolkit";
import { initialCategories } from "../../../shared/initialValues";

export const categorieFilterSlice = createSlice({
    name: "categorieFilter",
    initialState: getCategorieParamIndex(initialCategories, new URLSearchParams(new URL(document.location.href).searchParams), "categorie"),
    reducers: {
        changeCategorieFilter: (state, action) => {
            state = action.payload;
        }
    },
});

export const { changeCategorieFilter } = categorieFilterSlice.actions;
export default categorieFilterSlice.reducer;