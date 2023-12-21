import { getCuttedString } from "../lib/helpers/getCuttedString";
import { Promocode, Base, Order, Data, StaticAddresses, ResWithMeta, Product } from "./interfaces";

export class API {
    private _baseUrl: string;
    private _headers: { "Content-Type": string } | undefined;

    constructor({ baseUrl, headers }: Base) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    private async _checkResponse<T>(response: Response, endpoint: string): Promise<Data<T>> {
        const data = await response.json();
        return response.ok
            ? { status: response.status, statusText: response.statusText, message: "Успех", data }
            : Promise.reject({ ...data, endpoint: getCuttedString(endpoint, 10) });
    }

    async getStaticAddresses(endpoint = "/addresses"): Promise<Data<Array<StaticAddresses>>> {
        const response = await fetch(this._baseUrl + endpoint);
        return this._checkResponse(response, endpoint);
    }

    async getProductDetails(endpoint: string): Promise<Data<Product>> {
        const response = await fetch(this._baseUrl + endpoint);
        return this._checkResponse(response, endpoint);
    }

    async getProducts(endpoint = "/products", controller?: AbortController) {
        const response = await fetch(this._baseUrl + endpoint, controller && { signal: controller.signal });
        return this._checkResponse<ResWithMeta>(response, endpoint);
    }

    async getPromocodes(endpoint = "/promocodes"): Promise<Data<Array<Promocode>>> {
        const response = await fetch(this._baseUrl + endpoint);
        return this._checkResponse(response, endpoint);
    }

    async postOrder(endpoint = "/orders", order: Order): Promise<Data<Order>> {
        const response = await fetch(this._baseUrl + endpoint, {
            method: "POST",
            body: JSON.stringify(order),
            headers: this._headers,
        });
        return this._checkResponse(response, endpoint);
    }
}