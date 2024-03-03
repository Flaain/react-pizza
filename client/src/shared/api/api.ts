import { IApiData, IBase } from "../model/interfaces";
import { ApiError } from "./error";

export class API {
    protected _baseUrl: string;
    protected _headers: IBase["headers"];

    constructor({ baseUrl, headers }: IBase) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    protected async _checkResponse<T, K>(response: Response): Promise<K extends string ? IApiData<T, K> : T> {
        const data = await response.json();

        if (!response.ok) throw new ApiError({ ...data, message: data.message ?? "Произошла непредвиденная ошибка" });

        return data;
    }
}
