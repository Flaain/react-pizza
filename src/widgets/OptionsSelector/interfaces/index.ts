import { PayloadAction } from "@reduxjs/toolkit";
import { Pizza } from "../../../shared/api/interfaces";
import { PizzaState } from "../../PriceBlock/lib/utils/interfaces";

export interface Props {
    activeItem: Pizza;
    state: PizzaState;
    handleChange: ({ type, payload }: PayloadAction<PizzaState>) => void;
}