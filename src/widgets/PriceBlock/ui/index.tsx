import React from "react";
import OptionsSelector from "../../OptionsSelector/ui";
import AddToCartButton from "../../../features/AddToCartButton/ui";
import getIntlPrice from "../../../shared/lib/helpers/getIntlPrice";
import pizzaReducer from "../lib/utils/pizzaReducer";
import { Props } from "../interfaces";
import { AppContext } from "../../../app/context";
import { useCart } from "../../../shared/hooks/useCart";
import { FORM_TYPES } from "../lib/utils/formTypes";
import { PizzaAction, PizzaState } from "../lib/utils/interfaces";

const PriceBlock: React.FC<Props> = ({ activeItem }) => {
    const { cart } = React.useContext(AppContext);
    const { addToCart } = useCart();

    const INITIAL_STATE = React.useMemo<PizzaState>(() => ({ type: activeItem.types[0], size: activeItem.sizes[0], price: activeItem.price }), [activeItem]);
    const cartItem = React.useMemo(() => cart.find(({ id }) => id === activeItem.id), [cart, activeItem]);
    const initialCount = React.useMemo(() => cartItem?.items.reduce((acc, { count }) => (acc += count), 0) ?? 0, [cartItem]);

    React.useEffect(() => dispatch({ type: FORM_TYPES.UPDATE, payload: INITIAL_STATE }), [INITIAL_STATE]);

    const [pizzaState, dispatch] = React.useReducer(pizzaReducer, INITIAL_STATE);

    const handleAddToCart = () => {
        addToCart(activeItem, pizzaState);
    };

    const handleChange = ({ type, payload }: PizzaAction) => dispatch({ type, payload });

    return (
        <div className='sticky top-5 gap-5 flex flex-col justify-between p-5 min-w-[300px] min-h-[200px] rounded-xl bg-white shadow-xl border border-solid border-primary-gray'>
            <strong className='text-2xl font-bold'>{getIntlPrice(pizzaState.price ?? 0)}</strong>
            <OptionsSelector
                availableSizes={activeItem.sizes}
                availableTypes={activeItem.types}
                size={pizzaState.size}
                type={pizzaState.type}
                initialPrice={activeItem.price}
                handleChange={handleChange}
            />
            <AddToCartButton title='Добавить в корзину' initialCount={initialCount} handleClick={handleAddToCart} />
        </div>
    );
};

export default PriceBlock;
