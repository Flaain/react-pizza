import React from "react";
import productSelectorReducer from "../model/reducer";
import AddToCartButton from "@/features/AddToCartButton/ui";
import ImageSkeleton from "../../../shared/ui/ImageSkeleton";
import Image from "@/shared/ui/Image/ui";
import OptionsSelector from "@/shared/ui/OptionsSelector/ui/ui";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/pages/Cart";
import { Props } from "../model/interfaces";
import { useAppSelector } from "@/shared/model/store";
import { cartSelector } from "@/shared/model/selectors";
import { initialSizes } from "@/shared/config/constants";
import { useAnimatedPrice } from "../lib/useAnimatedPrice";

const Card: React.FC<Props> = ({ id, title, price, category, types, sizes, imageUrl }) => {
    const { cart } = useAppSelector(cartSelector);

    const dispatch = useDispatch();

    const activeCount = React.useMemo(() => cart.get(id)?.items.reduce((acc, { count }) => acc + count, 0), [cart, id]);
    const activeSizeIndex = React.useMemo(() => initialSizes.findIndex((size) => size === sizes[0].size), []);
    
    const initialPrice = price + sizes[0].additional;
    const initialState = { type: types[0], size: activeSizeIndex, price: initialPrice, initialPrice };

    const [productState, productDispatch] = React.useReducer(productSelectorReducer, initialState);
    const [count, setCount] = React.useState(activeCount ?? 0);

    const { priceRef } = useAnimatedPrice(initialPrice, productState.price);

    const handleAddToCart = () => {
        setCount((prevState) => prevState + 1);
        dispatch(addToCart({ id, category, imageUrl, title, ...productState }));
    };

    return (
        <article className='flex flex-col justify-center items-center max-w-[400px] max-md:min-w-full max-md:max-w-none'>
            <picture>
                <Link to={`pizza/${id}`}>
                    <Image
                        skeleton={<ImageSkeleton width={250} height={250}/>}
                        loading='lazy'
                        src={imageUrl}
                        alt={title}
                        className='max-w-[250px] h-auto cursor-pointer'
                    />
                </Link>
            </picture>
            <div className='flex flex-col justify-center items-center gap-2 w-full'>
                <h2 className='text-primary-black font-bold text-lg cursor-pointer'>
                    <Link to={`pizza/${title}`}>{title}</Link>
                </h2>
                <OptionsSelector {...{ types, sizes, state: productState, handleChange: productDispatch, price }} />
                <div className='flex items-center justify-between w-full mt-[5px]'>
                    <span className='text-xl font-bold text-primary-black flex items-center gap-2' ref={priceRef}></span>
                    <AddToCartButton title='Добавить' handleClick={handleAddToCart} initialCount={count} />
                </div>
            </div>
        </article>
    );
};

export default Card;