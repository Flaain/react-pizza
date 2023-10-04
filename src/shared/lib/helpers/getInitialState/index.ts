import { Pizza } from "../../../api/interfaces";
import { initialSizes } from "../../../initialValues";

const getInitialState = (item: Pizza, params: URLSearchParams) => {
    const type = item.types[Number(params.get("type"))] ?? item.types[0];
    const size = item.sizes[Number(params.get('size'))] ?? item.sizes[0];
    const price = (initialSizes.find((obj) => obj.size === size)?.additional ?? 0) + item.price;

    return { type, size, price };
};

export default getInitialState;