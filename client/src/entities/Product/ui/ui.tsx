import React from "react";
import productSelectorReducer from "../model/reducer";
import ImageSkeleton from "@/shared/ui/Image/ui/Skeleton";
import Image from "@/shared/ui/Image/ui/ui";
import OptionsSelector from "@/shared/ui/OptionsSelector/ui/ui";
import AnimatedNumber from "@/shared/ui/AnimatedNumber/ui/ui";
import getIntlPrice from "@/shared/lib/helpers/getIntlPrice";
import { Link } from "react-router-dom";
import { addToCart } from "@/pages/Cart";
import { ProductSelectorTypes, Props } from "../model/interfaces";
import { useAppSelector, useAsyncThunkDispatch } from "@/shared/model/store";
import { userSelector } from "@/shared/model/selectors";
import { initialSizes, initialTypes } from "@/shared/config/constants";
import { AddToCartButton } from "@/features/AddToCartButton";
import { addToCartThunk } from "@/pages/Cart/model/asyncActions";
import { ProductSelectorState } from "@/shared/model/interfaces";
import { useCart } from "@/pages/Cart/lib/hooks/useCart";
import { getRelativeSizeString } from "../lib/helpers/getRelativeSizeString";

const Card = ({ id, title, types, sizes, imageUrl }: Props) => {
    const { isAuthenticated, token } = useAppSelector(userSelector);
    const { cartArr } = useCart();

    const count = React.useMemo(() => cartArr.reduce((acc, { productId, count }) => acc + (productId === id ? count : 0), 0), [cartArr]);
    const sizeIndex = React.useMemo(() => initialSizes.findIndex((size) => size === sizes[0].size), []);

    const initialState: ProductSelectorState = { type: types[0], size: sizeIndex, price: sizes[0].price, loading: false, count };

    const [productState, productDispatch] = React.useReducer(productSelectorReducer, initialState);

    const dispatch = useAsyncThunkDispatch();

    const handleTypeChange = React.useCallback((index: number) => {
        productDispatch({ type: ProductSelectorTypes.SET_TYPE, payload: { type: index } });
    }, []);

    const handleSizeChange = React.useCallback((index: number) => {
        const price = sizes.find(({ size }) => size === initialSizes[index])!.price;

        productDispatch({ type: ProductSelectorTypes.SET_SIZE, payload: { size: index, price } });
    }, []);

    const handleAddToCart = async () => {
        try {
            const { size, type, price } = productState;

            productDispatch({ type: ProductSelectorTypes.SET_ADD_TO_CART, payload: { count: 1, loading: true } });

            await dispatch(isAuthenticated ? addToCartThunk({ product: { productId: id, size, type }, token: token as string }) : addToCart({ productId: id, size, type, title, imageUrl, count, price }));
        } catch (error) {
            console.error(error);
        } finally {
            productDispatch({ type: ProductSelectorTypes.SET_ADD_TO_CART_LOADING, payload: false });
        }
    };

    return (
        <article className='flex flex-col justify-center items-center max-w-[400px] max-md:min-w-full max-md:max-w-none'>
            <picture>
                <Link to={`product/${id}`}>
                    <Image
                        skeleton={<ImageSkeleton width={250} height={250} />}
                        loading='lazy'
                        src={imageUrl}
                        alt={title}
                        className='max-w-[250px] h-auto cursor-pointer'
                    />
                </Link>
            </picture>
            <div className='flex flex-col justify-center items-center gap-2 w-full'>
                <Link to={`product/${id}`} className='text-primary-black font-bold text-lg cursor-pointer'>{title}</Link>
                <div className='flex flex-col gap-5 w-full mt-[5px]'>
                    <div className='flex p-1 gap-1 flex-col bg-primary-gray rounded-lg max-md:w-full'>
                        <OptionsSelector
                            options={initialTypes.map((type, index) => ({
                                id: index,
                                label: type,
                                isAvailable: types.some((type) => type === index),
                                isActive: index === productState.type,
                            }))}
                            layoutId={`${id}-types-home-page`}
                            onOptionChange={handleTypeChange}
                            />
                        <OptionsSelector
                            options={initialSizes.map((size, index) => ({
                                id: index,
                                label: getRelativeSizeString(size),
                                isAvailable: sizes.some(({ size: _size }) => _size === size),
                                isActive: index === productState.size,
                            }))}
                            layoutId={`${id}-sizes-home-page`}
                            onOptionChange={handleSizeChange}
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <AnimatedNumber value={productState.price} cb={(price) => `от ${getIntlPrice(price)}`}/>
                        <AddToCartButton
                            title='Добавить'
                            onClick={handleAddToCart}
                            quantity={count}
                            loading={productState.loading}
                            disabled={productState.loading}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Card;