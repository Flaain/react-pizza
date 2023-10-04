import { PizzaAction } from "../../PriceBlock/lib/utils/interfaces";

export interface Props {
    availableTypes: Array<number>;
    availableSizes: Array<number>;
    activeType: number;
    activeSize: number;
    initialPrice: number;
    handleChange: ({ type, payload }: PizzaAction) => void;
}