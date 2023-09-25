import { PizzaAction } from "../../PriceBlock/lib/utils/interfaces";

export interface Props {
    availableTypes: Array<number>;
    availableSizes: Array<number>;
    type: number;
    size: number;
    initialPrice: number;
    handleChange: ({ type, payload }: PizzaAction) => void;
}