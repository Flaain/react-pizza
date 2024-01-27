import { ApiError } from "@/shared/api/error";
import { getCuttedString } from "@/shared/lib/helpers/getCuttedString";
import { Data } from "@/shared/model/interfaces";

export class API {
    private _baseurl: string;
    private _headers: { [key: string]: string } | undefined;

    constructor({ baseUrl, headers }: { baseUrl: string; headers: { [key: string]: string } | undefined }) {
        this._baseurl = baseUrl;
        this._headers = headers;
    }

    private async _checkResponse<T>(response: Response, endpoint: string): Promise<Data<T>> {
        const data = await response.json();

        if (!response.ok) throw new ApiError({ ...data, endpoint: getCuttedString(endpoint, 10)})

        return { status: response.status, statusText: response.statusText, message: "Успех", data }
    }

    async signin(body: Record<string, string>, controller?: AbortController, endpoint = "/auth/signin") {
        const response = await fetch(this._baseurl + endpoint, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(body),
            ...(controller && { signal: controller.signal }),
        });
        return this._checkResponse(response, endpoint);
    }

    async signup(body: Record<string, string>, controller?: AbortController, endpoint = "/auth/signup") {
        const response = await fetch(this._baseurl + endpoint, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(body),
            ...(controller && { signal: controller.signal }),
        });
        return this._checkResponse(response, endpoint);
    }
}