import React from "react";
import productSelectorReducer from "../model/reducer";
import ImageSkeleton from "@/shared/ui/Image/ui/Skeleton";
import Image from "@/shared/ui/Image/ui/ui";
import { OptionsSelector } from "@/shared/ui/OptionsSelector";
import { Link } from "react-router-dom";
import { addToCart } from "@/pages/Cart";
import { ProductSelectorTypes, Props } from "../model/interfaces";
import { useAppSelector, useAsyncThunkDispatch } from "@/shared/model/store";
import { cartSelector, userSelector } from "@/shared/model/selectors";
import { initialSizes } from "@/shared/config/constants";
import { useAnimatedPrice } from "../lib/useAnimatedPrice";
import { AddToCartButton } from "@/features/AddToCartButton";
import { addToCartThunk } from "@/pages/Cart/model/asyncActions";

const Card = ({ id, title, types, sizes, imageUrl }: Props) => {
    const { cart } = useAppSelector(cartSelector);
    const { jwt } = useAppSelector(userSelector);

    const count = React.useMemo(() => [...cart.values()].reduce((acc, { productId, count }) => acc + (productId === id ? count : 0), 0), [cart]);
    const sizeIndex = React.useMemo(() => initialSizes.findIndex((size) => size === sizes[0].size), []);

    const initialState = { type: types[0], size: sizeIndex, price: sizes[0].price, count };

    const [productState, productDispatch] = React.useReducer(productSelectorReducer, initialState);

    const { priceRef } = useAnimatedPrice(initialState.price, productState.price);

    const dispatch = useAsyncThunkDispatch();

    const handleAddToCart = async () => {
        try {
            productDispatch({ type: ProductSelectorTypes.SET_COUNT, payload: { count: 1 } });
            dispatch(
                jwt
                    ? addToCartThunk({ product: { productId: id, size: productState.size, type: productState.type }, token: jwt })
                    : addToCart({ ...productState, productId:id, title, imageUrl })
            );
        } catch (error) {
            console.error(error);
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
                <h2 className='text-primary-black font-bold text-lg cursor-pointer'>
                    <Link to={`product/${id}`}>{title}</Link>
                </h2>
                <OptionsSelector state={productState} handleChange={productDispatch} sizes={sizes} types={types} />
                <div className='flex items-center justify-between w-full mt-[5px]'>
                    <span
                        className='text-xl font-bold text-primary-black flex items-center gap-2'
                        ref={priceRef}
                    ></span>
                    <AddToCartButton title='Добавить' handleClick={handleAddToCart} quantity={count} />
                </div>
            </div>
        </article>
    );
};

export default Card;