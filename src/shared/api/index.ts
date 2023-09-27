import { Promocode } from "../../pages/Cart/interfaces";
import { Base, Order, Data, Pizza, StaticAddresses } from "./interfaces";

class API {
    private _baseUrl: string;
    private _secondUrl: string | undefined;
    private _thirdUrl: string | undefined;
    private _headers: { "Content-Type": string } | undefined;

    constructor({ baseUrl, secondUrl, thirdUrl, headers }: Base) {
        this._baseUrl = baseUrl;
        this._secondUrl = secondUrl;
        this._thirdUrl = thirdUrl;
        this._headers = headers;
    }

    private async _checkResponse<T>(response: Response): Promise<Data<T>> {
        if (!response.ok) {
            return Promise.reject({ status: response.status, text: response.statusText, message: "Failed to fetch data" });
        }

        const data = await response.json();

        return { status: response.status, text: response.statusText, message: "Fetch success", data };
    }

    async getStaticAddresses(endpoint = '/export-points'): Promise<Data<Array<StaticAddresses>>> {
        const response = await fetch(this._thirdUrl + endpoint);
        return this._checkResponse(response)
    }

    async getPizzas(endpoint = "/pizzas"): Promise<Data<Array<Pizza>>> {
        const response = await fetch(this._baseUrl + endpoint);
        return this._checkResponse(response);
    }

    async getPromocodes(endpoint = "/promocodes"): Promise<Data<Array<Promocode>>> {
        const response = await fetch(this._secondUrl + endpoint);
        return this._checkResponse(response);
    }

    async postOrder(endpoint = "/orders", order: Order): Promise<Data<Order>> {
        const response = await fetch(this._baseUrl + endpoint, { method: "POST", body: JSON.stringify(order), headers: this._headers });
        return this._checkResponse(response);
    }
}

export const api = new API({
    baseUrl: import.meta.env.VITE_BASE_URL,
    secondUrl: import.meta.env.VITE_SECOND_URL,
    thirdUrl: import.meta.env.VITE_THIRD_URL,
    headers: { "Content-Type": "application/json" },
});