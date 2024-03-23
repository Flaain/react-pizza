import React from "react";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import getInitialState from "../lib/getInitialState";
import productSelectorReducer from "@/entities/Product/model/reducer";
import OptionsSelector from "@/shared/ui/OptionsSelector/ui/ui";
import AnimatedNumber from "@/shared/ui/AnimatedNumber/ui/ui";
import { AddToCartButton } from "@/features/AddToCartButton";
import { Props } from "../model/interfaces";
import { useAppSelector, useAsyncThunkDispatch } from "@/shared/model/store";
import { userSelector } from "@/shared/model/selectors";
import { ProductSelectorTypes } from "@/entities/Product/model/interfaces";
import { useSearchParams } from "react-router-dom";
import { addToCart } from "@/pages/Cart";
import { ProductSelectorState } from "@/shared/model/interfaces";
import { addToCartThunk } from "@/pages/Cart/model/asyncActions";
import { useCart } from "@/pages/Cart/lib/hooks/useCart";
import { initialSizes, initialTypes } from "@/shared/config/constants";
import { getRelativeSizeString } from "@/entities/Product/lib/helpers/getRelativeSizeString";

const PriceBlock = ({ activeItem }: Props) => {
    const { cartArr } = useCart();
    const { token, isAuthenticated } = useAppSelector(userSelector);

    const { id, title, imageUrl } = activeItem;

    const [searchParams, setSearchParams] = useSearchParams();

    const count = React.useMemo(() => cartArr.reduce((acc, { productId, count }) => acc + (productId === id ? count : 0), 0), [cartArr]);
    const INITIAL_STATE = React.useMemo<ProductSelectorState>(() => ({ ...getInitialState(activeItem, searchParams), count }), []);

    const [productState, productDispatch] = React.useReducer(productSelectorReducer, INITIAL_STATE);

    const dispatch = useAsyncThunkDispatch();

    const handleTypeChange = React.useCallback((index: number) => {
        productDispatch({ type: ProductSelectorTypes.SET_TYPE, payload: { type: index } });
        setSearchParams((prevState) => {
            prevState.set("type", index.toString());
            return prevState;
        }, { replace: true });
    }, []);

    const handleSizeChange = React.useCallback((index: number) => {
        const price = activeItem.sizes.find(({ size }) => size === initialSizes[index])!.price;

        productDispatch({ type: ProductSelectorTypes.SET_SIZE, payload: { size: index, price } });
        setSearchParams((prevState) => {
            prevState.set("size", index.toString());
            return prevState;
        }, { replace: true });
    }, []);

    const handleAddToCart = async () => {
        try {
            productDispatch({ type: ProductSelectorTypes.SET_ADD_TO_CART, payload: { count: 1, loading: true } });
            await dispatch(
                isAuthenticated
                    ? addToCartThunk({
                          product: { productId: activeItem.id, size: productState.size, type: productState.type },
                          token: token as string,
                      })
                    : addToCart({ ...productState, productId: activeItem.id, title, imageUrl })
            );
        } catch (error) {
            console.error(error);
        } finally {
            productDispatch({ type: ProductSelectorTypes.SET_ADD_TO_CART_LOADING, payload: false });
        }
    };

    return (
        <div className='sticky top-28 gap-5 flex flex-col justify-between p-5 min-w-[300px] min-h-[200px] rounded-xl bg-white shadow-xl border border-solid border-primary-gray'>
            <AnimatedNumber value={productState.price} cb={(price) => getIntlPrice(price)} size="2xl" weight="bold"/>
            <div className='flex p-1 gap-1 flex-col bg-primary-gray rounded-lg max-md:w-full'>
                <OptionsSelector
                    options={initialTypes.map((type, index) => ({
                        id: index,
                        label: type,
                        isAvailable: activeItem.types.some((type) => type === index),
                        isActive: index === productState.type,
                    }))}
                    layoutId={`${id}-types-details-page`}
                    onOptionChange={handleTypeChange}
                />
                <OptionsSelector
                    options={initialSizes.map((size, index) => ({
                        id: index,
                        label: getRelativeSizeString(size),
                        isAvailable: activeItem.sizes.some(({ size: _size }) => _size === size),
                        isActive: index === productState.size,
                    }))}
                    layoutId={`${id}-sizes-details-page`}
                    onOptionChange={handleSizeChange}
                />
            </div>
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