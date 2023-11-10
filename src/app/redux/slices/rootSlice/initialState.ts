import { PizzasSliceState } from "../../interfaces";

const params = new URLSearchParams(document.location.search)

export const initialState: PizzasSliceState = {
    pizzas: [],
    error: null,
    loading: true,
    searchQuery: params.get('query') ?? ''
};