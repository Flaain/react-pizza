import { IApiMethodParams, Profile, WithRequired } from "@/shared/model/interfaces";
import { API } from "./api";

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

        return this._checkResponse<Omit<Profile, "token">, "user">(response);
    };

    signin = async (params?: IApiMethodParams) => {
        const response = await fetch(this._baseUrl + "/auth/signin", {
            ...params,
            method: "POST",
            headers: this._headers,
        });
        return this._checkResponse<Profile, "user">(response);
    };

    signup = async (params?: IApiMethodParams) => {
        const response = await fetch(this._baseUrl + "/auth/signup", {
            ...params,
            method: "POST",
            headers: this._headers,
        });
        return this._checkResponse<Profile, "user">(response);
    };
}