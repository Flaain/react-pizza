import { PizzaAction } from "../../../widgets/PriceBlock/lib/utils/interfaces";

export interface Props {
    availableTypes: Array<number>;
    activeType: number;
    handleChange: ({ type, payload }: PizzaAction) => void;
}