import { IApiCart, IApiCartChangeQuantity, IApiMethodParams, IRemoveFromCartParams, WithRequired } from "../model/interfaces";
import { API } from "./api";
import { CartItem } from "@/pages/Cart/model/interfaces";

export class CartAPI extends API {
    constructor() {
        super({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL, headers: { "Content-Type": "application/json" } });
    }

    createCheckoutSesstion = async ({ token, ...params }: WithRequired<IApiMethodParams, "token">) => {
        const response = await fetch(import.meta.env.VITE_SERVER_BASE_URL + "/order/checkout/create-checkout-session", {
            ...params,
            method: "POST",
            headers: { ...params.headers, ...this._headers, Authorization: `Bearer ${token}` },
        });

        return this._checkResponse<string>(response);
    };

    getCart = async (params?: IApiMethodParams) => {
        const response = await fetch(import.meta.env.VITE_SERVER_BASE_URL + "/cart", {
            ...params,
            headers: this._headers,
            method: "POST",
        });
        return this._checkResponse<{ cart: IApiCart }>(response);
    };

    updateCart = async ({ token, ...params }: WithRequired<IApiMethodParams, "token">) => {
        const response = await fetch(import.meta.env.VITE_SERVER_BASE_URL + "/cart/update", {
            ...params,
            method: "PUT",
            headers: { ...params.headers, ...this._headers, Authorization: `Bearer ${token}` },
        });

        return this._checkResponse<{ cart: IApiCart }>(response);
    };

    removeItemFromCart = async ({ _id, token, ...params }: IRemoveFromCartParams) => {
        const response = await fetch(import.meta.env.VITE_SERVER_BASE_URL + `/cart/remove/${_id}`, {
            ...params,
            method: "DELETE",
            headers: { ...params.headers, ...this._headers, Authorization: `Bearer ${token}` },
        });

        return this._checkResponse<Array<Omit<CartItem, "price">>>(response);
    };

    changeQuantity = async ({ _id, token, ...params }: IApiCartChangeQuantity) => {
        const response = await fetch(import.meta.env.VITE_SERVER_BASE_URL + `/cart/update/${_id}`, {
            ...params,
            method: "PATCH",
            headers: { ...this._headers, Authorization: `Bearer ${token}` },
        });

        return this._checkResponse<Array<Omit<CartItem, "price">>>(response);
    };

    addToCart = async ({ token, ...params }: WithRequired<IApiMethodParams, "token">) => {
        const response = await fetch(import.meta.env.VITE_SERVER_BASE_URL + "/cart/add", {
            ...params,
            method: "POST",
            headers: { ...params.headers, ...this._headers, Authorization: `Bearer ${token}` },
        });

        return this._checkResponse<{ cart: IApiCart }>(response);
    };

    clearCart = async ({ token, ...params }: WithRequired<IApiMethodParams, "token">) => {
        const response = await fetch(import.meta.env.VITE_SERVER_BASE_URL + "/cart/clear", {
            method: "PUT",
            headers: { ...params.headers, ...this._headers, Authorization: `Bearer ${token}` },
        });

        return this._checkResponse(response);
    };

    createOrder = async ({ token, ...params }: WithRequired<IApiMethodParams, "token">) => {
        const response = await fetch(import.meta.env.VITE_SERVER_BASE_URL + "/order/create", {
            method: "POST",
            headers: { ...params.headers, ...this._headers, Authorization: `Bearer ${token}` },
        });

        return this._checkResponse<{ _id: string }>(response);
    };
}