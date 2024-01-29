import getDataFromLocalStorage from "@/shared/lib/helpers/getDataFromLocalStorage";
import getPriceView from "../lib/helpers/getPriceView";
import { localStorageKeys } from "@/shared/config/constants";
import { CartSlice } from "./interfaces";
import { CartItemLocal } from "@/shared/model/interfaces";

const cart = getDataFromLocalStorage<Array<CartItemLocal>>(localStorageKeys.CART, []);

export const initialState: CartSlice = {
    cart: new Map(cart.map((product) => [`${product.id}_${product.size}_${product.type}`, product])),
    priceView: getPriceView(cart),
    order: null,
    ordered: false,
    orderLoading: false,
    error: null,
};