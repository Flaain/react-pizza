import { IApiData, IBase } from "../model/interfaces";
import { ApiError } from "./error";

export class API {
    protected _baseUrl: string;
    protected _headers: IBase["headers"];

    constructor({ baseUrl, headers }: IBase) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    protected async _checkResponse<T>(response: Response): Promise<IApiData<T>> {
        const data = await response.json();

        if (!response.ok) throw new ApiError({ ...data, message: data.message ?? "Произошла непредвиденная ошибка" });

        return {
            data,
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries([...response.headers.entries()]),
            message: data.message ?? "Успех",
        };
    }
}