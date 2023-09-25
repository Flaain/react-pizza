import { CartItem } from "../../../../app/context/interfaces";

const compareItems = (first: CartItem, second: CartItem) => {
    return Object.keys(first).filter((key) => key !== "count" && key !== "id").every((key) => first[key as keyof CartItem] === second[key as keyof CartItem]);
};

export default compareItems;