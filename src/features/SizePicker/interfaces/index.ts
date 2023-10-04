import { PizzaAction } from "../../../widgets/PriceBlock/lib/utils/interfaces";

export interface Props {
    availableSizes: Array<number>;
    activeSize: number;
    initialPrice: number;
    handleChange: ({ type, payload }: PizzaAction) => void;
}