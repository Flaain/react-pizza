import { getCuttedString } from "../lib/helpers/getCuttedString";
import { Base, Data, Order, Product, Promocode, ResWithMeta, StaticAddresses } from "../model/interfaces";
import { ApiError } from "./error";

export class API {
    private _baseUrl: string;
    private _headers: { "Content-Type": string } | undefined;

    constructor({ baseUrl, headers }: Base) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    private async _checkResponse<T>(response: Response, endpoint: string): Promise<Data<T>> {
        const data = await response.json();

        if (!response.ok) throw new ApiError({ ...data, endpoint: getCuttedString(endpoint, 10)})

        return { status: response.status, statusText: response.statusText, message: "Успех", data }
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