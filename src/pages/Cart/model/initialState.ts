import getDataFromLocalStorage from "@/shared/lib/helpers/getDataFromLocalStorage";
import getPriceView from "../lib/helpers/getPriceView";
import { localStorageKeys } from "@/shared/config/constants";
import { CartInterface, CartSlice } from "./interfaces";

const cart = getDataFromLocalStorage<Array<CartInterface>>(localStorageKeys.CART, []);

export const initialState: CartSlice = {
    cart: new Map(cart.map((product) => [product.id, product])),
    priceView: getPriceView(cart),
    order: null,
    ordered: false,
    orderLoading: false,
    error: null,
};