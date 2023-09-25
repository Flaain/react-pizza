import { PizzaAction } from "../../../widgets/PriceBlock/lib/utils/interfaces";

export interface Props {
    availableTypes: Array<number>;
    type: number;
    handleChange: ({ type, payload }: PizzaAction) => void;
}