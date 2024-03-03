import { IApiMethodParams, IProductDetailsParams, Product, Promocode, StaticAddresses } from "@/shared/model/interfaces";
import { API } from "./api";

export class BaseAPI extends API {
    constructor() {
        super({ baseUrl: import.meta.env.VITE_BASE_URL, headers: { "Content-Type": "application/json" } });
    }

    getStaticAddresses = async (params?: IApiMethodParams): Promise<Array<StaticAddresses>> => {
        const response = await fetch(this._baseUrl + "/addresses", { ...params, headers: this._headers });
        return this._checkResponse(response);
    }

    getProductDetails = async ({ id, ...rest }: IProductDetailsParams): Promise<Product> => {
        const response = await fetch(this._baseUrl + `/products/${id}`, { ...rest, headers: this._headers });
        return this._checkResponse(response);
    };

    getProducts = async ({ endpoint, ...rest }: IApiMethodParams): Promise<Array<Product>> => {
        const response = await fetch(this._baseUrl + endpoint, { ...rest, headers: this._headers });
        return this._checkResponse(response);
    };

    getPromocodes = async (params?: IApiMethodParams): Promise<Array<Promocode>> => {
        const response = await fetch(this._baseUrl + "/promocodes", { ...params, headers: this._headers });
        return this._checkResponse(response);
    };
}
