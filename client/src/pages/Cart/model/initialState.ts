import getPriceView from "../lib/helpers/getPriceView";
import { CartSlice } from "./interfaces";

export const initialState: CartSlice = {
    cart: new Map(),
    priceView: getPriceView([]),
    cartLoading: false,
    order: null,
    ordered: false,
    orderLoading: false,
    error: null,
};