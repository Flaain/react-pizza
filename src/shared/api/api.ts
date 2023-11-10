import { Promocode } from "@/pages/Cart/interfaces";
import { Base, Order, Data, Pizza, StaticAddresses } from "./interfaces";

export class API {
    private _baseUrl: string;
    private _headers: { "Content-Type": string } | undefined;

    constructor({ baseUrl, headers }: Base) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    private async _checkResponse<T>(response: Response, endpoint: string): Promise<Data<T>> {
        const data = await response.json();
        return response.ok ? { status: response.status, statusText: response.statusText, message: "Успех", data } : Promise.reject({ ...data, endpoint });
    }

    async getStaticAddresses(endpoint = "/export-points"): Promise<Data<Array<StaticAddresses>>> {
        const response = await fetch(this._baseUrl + endpoint);
        return this._checkResponse(response, endpoint);
    }

    async getPizzas(endpoint = "/products"): Promise<Data<Array<Pizza>>> {
        const response = await fetch(this._baseUrl + endpoint);
        return this._checkResponse(response, endpoint);
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
