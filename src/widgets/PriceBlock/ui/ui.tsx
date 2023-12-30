import React from "react";
import AddToCartButton from "@/features/AddToCartButton/ui";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import getInitialState from "../lib/getInitialState";
import OptionsSelector from "@/shared/ui/OptionsSelector/ui/ui";
import productSelectorReducer from "@/entities/Product/model/reducer";
import { Props } from "../model/interfaces";
import { useAppSelector } from "@/shared/model/store";
import { cartSelector } from "@/shared/model/selectors";
import { Action, ProductSelectorState, ProductSelectorTypes } from "@/entities/Product/model/interfaces";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/pages/Cart";

const PriceBlock: React.FC<Props> = ({ activeItem }) => {
    const { cart } = useAppSelector(cartSelector);
    const { id, category, imageUrl, title } = activeItem;

    const [searchParams, setSearchParams] = useSearchParams();

    const INITIAL_STATE = React.useMemo<ProductSelectorState>(() => getInitialState(activeItem, searchParams), [searchParams, activeItem]);
    const cartItem = React.useMemo(() => cart.get(activeItem.id), [cart, activeItem]);
    const initialCount = React.useMemo(() => cartItem?.items.reduce((acc, { count }) => (acc += count), 0) ?? 0, [cartItem]);

    const [productState, productDispatch] = React.useReducer(productSelectorReducer, INITIAL_STATE);

    const dispatch = useDispatch();

    const onProductOptionChange = (action: Action, availableValueIndex: number) => {
        const params = { [ProductSelectorTypes.SET_SIZE]: "size", [ProductSelectorTypes.SET_TYPE]: "type" };

        setSearchParams((prevState) => {
            prevState.set(params[action.type as keyof typeof params], String(availableValueIndex));
            return prevState;
        }, { replace: true });
        productDispatch(action);
    };

    const handleAddToCart = () => {
        dispatch(addToCart({ id, category, imageUrl, title, ...productState }));
    };

    return (
        <div className='sticky top-5 gap-5 flex flex-col justify-between p-5 min-w-[300px] min-h-[200px] rounded-xl bg-white shadow-xl border border-solid border-primary-gray'>
            <strong className='text-2xl font-bold'>{getIntlPrice(productState.price)}</strong>
            <OptionsSelector
                {...activeItem}
                {...productState}
                handleChange={onProductOptionChange}
                state={productState}
            />
            <AddToCartButton title='Добавить в корзину' initialCount={initialCount} handleClick={handleAddToCart} />
        </div>
    );
};

export default PriceBlock;