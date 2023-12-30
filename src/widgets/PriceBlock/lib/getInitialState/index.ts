import { Product } from "@/shared/api/interfaces";
import { initialSizes } from "@/shared/config/constants";

const getInitialState = (item: Product, params: URLSearchParams) => {
    const paramsSize = Number(params.get("size")) || 0;
    const paramsType = Number(params.get("type")) || 0;

    const defaultSize = { size: initialSizes.findIndex((size) => size === item.sizes[0].size), price: item.price + item.sizes[0].additional };
    
    return {
        type: item.types[paramsType] ?? item.types[0],
        size: (item.sizes[paramsSize]?.size && initialSizes.findIndex((size) => size === item.sizes[paramsSize].size)) || defaultSize.size,
        price: item.sizes[paramsSize]?.additional + item.price || defaultSize.price,
        initialPrice: item.price,
    };
};

export default getInitialState;