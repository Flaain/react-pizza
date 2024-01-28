import React from "react";
import productSelectorReducer from "../model/reducer";
import ImageSkeleton from "@/shared/ui/Image/ui/Skeleton";
import Image from "@/shared/ui/Image/ui/ui";
import { OptionsSelector } from "@/shared/ui/OptionsSelector";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/pages/Cart";
import { ProductSelectorTypes, Props } from "../model/interfaces";
import { useAppSelector } from "@/shared/model/store";
import { cartSelector } from "@/shared/model/selectors";
import { initialSizes } from "@/shared/config/constants";
import { useAnimatedPrice } from "../lib/useAnimatedPrice";
import { AddToCartButton } from "@/features/AddToCartButton";

const Card = ({ id, title, category, types, sizes, imageUrl }: Props) => {
    const { cart } = useAppSelector(cartSelector);
    
    const count = React.useMemo(() => [...cart.values()].reduce((acc, { id: _id, count }) => acc + (_id === id ? count : 0), 0), [cart]);
    const sizeIndex = React.useMemo(() => initialSizes.findIndex((size) => size === sizes[0].size), []);
    const initialState = React.useMemo(() => ({ type: types[0], size: sizeIndex, price: sizes[0].price, count }), []);
    
    const [productState, productDispatch] = React.useReducer(productSelectorReducer, initialState);
    
    const { priceRef } = useAnimatedPrice(initialState.price, productState.price);

    const dispatch = useDispatch();    

    const handleAddToCart = () => {
        productDispatch({ type: ProductSelectorTypes.SET_COUNT, payload: { count: 1 } }); // maybe payload is unnecessary
        dispatch(addToCart({ id, category, imageUrl, title, ...productState }));
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
                <OptionsSelector
                    state={productState}
                    handleChange={productDispatch}
                    sizes={sizes}
                    types={types}
                />
                <div className='flex items-center justify-between w-full mt-[5px]'>
                    <span
                        className='text-xl font-bold text-primary-black flex items-center gap-2'
                        ref={priceRef}
                    ></span>
                    <AddToCartButton title='Добавить' handleClick={handleAddToCart} initialCount={productState.count} />
                </div>
            </div>
        </article>
    );
};

export default Card;