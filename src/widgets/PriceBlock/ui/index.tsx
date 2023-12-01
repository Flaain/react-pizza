import React from "react";
import OptionsSelector from "../../OptionsSelector/ui/ui";
import AddToCartButton from "../../../features/AddToCartButton/ui";
import getIntlPrice from "../../../shared/lib/helpers/getIntlPrice";
import pizzaReducer from "../lib/utils/pizzaReducer";
import getInitialState from "../../../shared/lib/helpers/getInitialState";
import { Props } from "../interfaces";
import { ActionTypes } from "../lib/utils/formTypes";
import { PizzaState } from "../lib/utils/interfaces";
import { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/redux/store";

const PriceBlock: React.FC<Props> = ({ activeItem }) => {
    const { cart } = useSelector(({ cart }: RootState) => cart);

    const INITIAL_STATE = React.useMemo<PizzaState>(() => getInitialState(activeItem, ), [activeItem]);
    const cartItem = React.useMemo(() => cart.find(({ id }) => id === activeItem.id), [cart, activeItem]);
    const initialCount = React.useMemo(() => cartItem?.items.reduce((acc, { count }) => (acc += count), 0) ?? 0, [cartItem]);

    React.useEffect(() => dispatch({ type: ActionTypes.UPDATE, payload: INITIAL_STATE }), [INITIAL_STATE]);

    const [pizzaState, dispatch] = React.useReducer(pizzaReducer, INITIAL_STATE);

    const handleChange = ({ type, payload }: PayloadAction<PizzaState>) => {
        dispatch({ type, payload });
        if ("param" in payload && "valueParam" in payload) {

        }
    };

    const handleAddToCart = () => {
        addToCart(activeItem, pizzaState);
    }

    return (
        <div className='sticky top-5 gap-5 flex flex-col justify-between p-5 min-w-[300px] min-h-[200px] rounded-xl bg-white shadow-xl border border-solid border-primary-gray'>
            <strong className='text-2xl font-bold'>{getIntlPrice(pizzaState.price ?? 0)}</strong>
            <OptionsSelector {...{ activeItem, handleChange, pizzaState }} />
            <AddToCartButton title='Добавить в корзину' initialCount={initialCount} handleClick={handleAddToCart} />
        </div>
    );
};

export default PriceBlock;