import { ValidateParams } from "@/pages/Home/interfaces";

export const getValidatedParams = (params: URLSearchParams, check: Array<ValidateParams>) => {
    const result: { [key: string]: unknown } = {};

    check.forEach(({ key, defaultValue, initial }) => {
        const currentParam = params.get(key);

        if (!currentParam || typeof initial[Number(currentParam)] === "undefined") {
            result[key] = defaultValue;
        } else {
            result[key] = currentParam;
        }
    });

    return result;
};