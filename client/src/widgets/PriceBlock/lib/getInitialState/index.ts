import { initialSizes } from "@/shared/config/constants";
import { Product } from "@/shared/model/interfaces";

const getInitialState = (item: Product, params: URLSearchParams) => {
    const paramsSize = Number(params.get("size")) || 0;
    const paramsType = Number(params.get("type")) || 0;

    const defaultProperties = {
        size: initialSizes.findIndex((size) => size === item.sizes[0].size),
        price: item.sizes[0].price,
    };

    const size = item.sizes.find(({ size }) => size === initialSizes[paramsSize]);

    return {
        type: item.types.some((type) => type === paramsType) ? paramsType : item.types[0],
        size: size ? paramsSize : defaultProperties.size,
        price: size?.price ?? defaultProperties.price,
    };
};

export default getInitialState;