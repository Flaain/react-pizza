import React from "react";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import getInitialState from "../lib/getInitialState";
import productSelectorReducer from "@/entities/Product/model/reducer";
import { OptionsSelector } from "@/shared/ui/OptionsSelector";
import { AddToCartButton } from "@/features/AddToCartButton";
import { Props } from "../model/interfaces";
import { useAppSelector, useAsyncThunkDispatch } from "@/shared/model/store";
import { userSelector } from "@/shared/model/selectors";
import { Action, ProductSelectorTypes } from "@/entities/Product/model/interfaces";
import { useSearchParams } from "react-router-dom";
import { addToCart } from "@/pages/Cart";
import { ProductSelectorState } from "@/shared/model/interfaces";
import { addToCartThunk } from "@/pages/Cart/model/asyncActions";
import { useCart } from "@/pages/Cart/lib/hooks/useCart";

const PriceBlock = ({ activeItem }: Props) => {
    const { cartArr } = useCart();
    const { token, isAuthenticated } = useAppSelector(userSelector);

    const { id, title, imageUrl } = activeItem;

    const [searchParams, setSearchParams] = useSearchParams();

    const count = React.useMemo(() => cartArr.reduce((acc, { productId, count }) => acc + (productId === id ? count : 0), 0), [cartArr]);
    const INITIAL_STATE = React.useMemo<ProductSelectorState>(() => ({ ...getInitialState(activeItem, searchParams), count }), []);

    const [productState, productDispatch] = React.useReducer(productSelectorReducer, INITIAL_STATE);

    const dispatch = useAsyncThunkDispatch();

    const onProductOptionChange = (action: Action) => {
        const params = { [ProductSelectorTypes.SET_SIZE]: "size", [ProductSelectorTypes.SET_TYPE]: "type" };

        setSearchParams(
            (prevState) => {
                prevState.set(
                    params[action.type as keyof typeof params],
                    String(action.payload[params[action.type as keyof typeof params] as keyof typeof action.payload])
                );
                return prevState;
            },
            { replace: true }
        );
        productDispatch(action);
    };

    const handleAddToCart = async () => {
        try {
            productDispatch({ type: ProductSelectorTypes.SET_ADD_TO_CART, payload: { count: 1, loading: true } });
            await dispatch(
                isAuthenticated ? addToCartThunk({ product: { productId: activeItem.id, size: productState.size, type: productState.type }, token: token as string })
                    : addToCart({ ...productState, productId: activeItem.id, title, imageUrl })
            );
        } catch (error) {
            console.error(error);
        } finally {
            productDispatch({ type: ProductSelectorTypes.SET_ADD_TO_CART_LOADING, payload: false });
        }
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
            <AddToCartButton
                title='Добавить в корзину'
                quantity={count}
                onClick={handleAddToCart}
                disabled={productState.loading}
                loading={productState.loading}
            />
        </div>
    );
};

export default PriceBlock;