import { IApiMethodParams, IProductDetailsParams, Meta, Product, Promocode, StaticAddresses, WithRequired } from "@/shared/model/interfaces";
import { API } from "./api";

export class BaseAPI extends API {
    constructor() {
        super({ baseUrl: import.meta.env.VITE_BASE_URL, headers: { "Content-Type": "application/json" } });
    }

    getStaticAddresses = async (params?: IApiMethodParams) => {
        const response = await fetch(this._baseUrl + "/addresses", { ...params, headers: this._headers });
        return this._checkResponse<Array<StaticAddresses>>(response);
    };

    getProductDetails = async ({ id, ...rest }: IProductDetailsParams) => {
        const response = await fetch(this._baseUrl + `/products/${id}`, { ...rest, headers: this._headers });
        return this._checkResponse<Product>(response);
    };

    getProductsPerPage = async ({ endpoint, ...rest }: WithRequired<IApiMethodParams, "endpoint">) => {
        const response = await fetch(this._baseUrl + endpoint, { ...rest, headers: this._headers });
        return this._checkResponse<{ items: Array<Product>; meta: Meta }>(response);
    };
    
    getProducts = async ({ endpoint, ...rest }: WithRequired<IApiMethodParams, "endpoint">) => {
        const response = await fetch(this._baseUrl + endpoint, { ...rest, headers: this._headers });
        return this._checkResponse<Array<Product>>(response);
    };

    getPromocodes = async (params?: IApiMethodParams) => {
        const response = await fetch(this._baseUrl + "/promocodes", { ...params, headers: this._headers });
        return this._checkResponse<Array<Promocode>>(response);
    };
}
