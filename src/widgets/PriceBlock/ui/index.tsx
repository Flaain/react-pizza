import React from "react";
import OptionsSelector from "../../OptionsSelector/ui";
import AddToCartButton from "../../../features/AddToCartButton/ui";
import getIntlPrice from "../../../shared/lib/helpers/getIntlPrice";
import pizzaReducer from "../lib/utils/pizzaReducer";
import getInitialState from "../../../shared/lib/helpers/getInitialState";
import { Props } from "../interfaces";
import { AppContext } from "../../../app/context";
import { useCart } from "../../../shared/hooks/useCart";
import { FORM_TYPES } from "../lib/utils/formTypes";
import { PizzaAction, PizzaState } from "../lib/utils/interfaces";

const PriceBlock: React.FC<Props> = ({ activeItem, detailsPageParams, setDetailsPageParams }) => {
    const { cart } = React.useContext(AppContext);
    const { addToCart } = useCart();

    const INITIAL_STATE = React.useMemo<PizzaState>(() => getInitialState(activeItem, detailsPageParams), [activeItem]);
    const cartItem = React.useMemo(() => cart.find(({ id }) => id === activeItem.id), [cart, activeItem]);
    const initialCount = React.useMemo(() => cartItem?.items.reduce((acc, { count }) => (acc += count), 0) ?? 0, [cartItem]);

    React.useEffect(() => dispatch({ type: FORM_TYPES.UPDATE, payload: INITIAL_STATE }), [INITIAL_STATE]);

    const [pizzaState, dispatch] = React.useReducer(pizzaReducer, INITIAL_STATE);

    const handleChange = ({ type, payload }: PizzaAction) => {
        dispatch({ type, payload });
        if ("param" in payload && "valueParam" in payload) {
            setDetailsPageParams((prevState) => {
                prevState.set(payload.param, String(payload.valueParam));
                return prevState;
            }, { replace: true });
        }
    };

    return (
        <div className='sticky top-5 gap-5 flex flex-col justify-between p-5 min-w-[300px] min-h-[200px] rounded-xl bg-white shadow-xl border border-solid border-primary-gray'>
            <strong className='text-2xl font-bold'>{getIntlPrice(pizzaState.price ?? 0)}</strong>
            <OptionsSelector
                availableSizes={activeItem.sizes}
                availableTypes={activeItem.types}
                activeSize={pizzaState.size}
                activeType={pizzaState.type}
                initialPrice={activeItem.price}
                handleChange={handleChange}
            />
            <AddToCartButton title='Добавить в корзину' initialCount={initialCount} handleClick={() => addToCart(activeItem, pizzaState)} />
        </div>
    );
};

export default PriceBlock;