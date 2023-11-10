import { PayloadAction } from "@reduxjs/toolkit";
import { Pizza } from "../../../shared/api/interfaces";
import { PizzaState } from "../../../widgets/PriceBlock/lib/utils/interfaces";

export interface Props {
    activeItem: Pizza;
    state: PizzaState;
    width: number;
    handleChange: ({ type, payload }: PayloadAction<PizzaState>) => void;
}