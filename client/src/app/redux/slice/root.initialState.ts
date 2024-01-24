import { RootSliceState } from "@/app/model/interfaces";

export const rootInitialState: RootSliceState = {
    _meta: null,
    products: [],
    error: null,
    loading: true,
    perPageLoading: false,
}