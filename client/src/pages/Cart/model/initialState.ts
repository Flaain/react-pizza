import getPriceView from "../lib/helpers/getPriceView";
import { CartSlice } from "./interfaces";

export const initialState: CartSlice = {
    cart: new Map(),
    priceView: getPriceView([]),
    order: null,
    ordered: false,
    orderLoading: false,
    error: null,
};