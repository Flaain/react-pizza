import { IApiMethodParams, IUserAddress, Profile, WithRequired } from "@/shared/model/interfaces";
import { API } from "./api";
import { DeliveryInfo } from "@/pages/DeliveryMethod/model/interfaces";

export class UserAPI extends API {
    constructor() {
        super({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL, headers: { "Content-Type": "application/json" } });
    }

    getProfile = async ({ token, ...rest }: WithRequired<IApiMethodParams, "token">) => {
        const response = await fetch(import.meta.env.VITE_SERVER_BASE_URL + "/auth/profile", {
            ...rest,
            method: "GET",
            headers: { ...rest.headers, ...this._headers, Authorization: `Bearer ${token}` },
        });

        return this._checkResponse<{ user: Omit<Profile, "token"> }>(response);
    };

    signin = async (params?: IApiMethodParams) => {
        const response = await fetch(this._baseUrl + "/auth/signin", {
            ...params,
            method: "POST",
            headers: this._headers,
        });
        return this._checkResponse<{ user: Profile }>(response);
    };

    signup = async (params?: IApiMethodParams) => {
        const response = await fetch(this._baseUrl + "/auth/signup", {
            ...params,
            method: "POST",
            headers: this._headers,
        });
        return this._checkResponse<{ user: Profile }>(response);
    };

    addAddress = async ({ token, body, ...rest }: WithRequired<IApiMethodParams, "token" | "body">) => {
        const response = await fetch(this._baseUrl + "/profile/add/address", {
            ...rest,
            method: "POST",
            headers: { ...rest.headers, ...this._headers, Authorization: `Bearer ${token}` },
            body,
        });

        return this._checkResponse<{ addresses: Array<IUserAddress>, newAddress: IUserAddress }>(response);
    };

    updateDeliveryInfo = async ({ token, body, ...rest }: WithRequired<IApiMethodParams, "token" | "body">) => {
        const response = await fetch(this._baseUrl + "/profile/update/delivery-info", {
            ...rest,
            method: "PUT",
            headers: { ...rest.headers, ...this._headers, Authorization: `Bearer ${token}` },
            body,
        })

        return this._checkResponse<{ deliveryInfo: Omit<DeliveryInfo, "method"> }>(response);
    }

    updatePaymentInfo = async ({ token, body, ...rest }: WithRequired<IApiMethodParams, "token" | "body">) => {
        const response = await fetch(this._baseUrl + "/profile/update/payment-info", {
            ...rest,
            method: "PUT",
            headers: { ...rest.headers, ...this._headers, Authorization: `Bearer ${token}` },
            body,
        })

        return this._checkResponse(response);
    }
}