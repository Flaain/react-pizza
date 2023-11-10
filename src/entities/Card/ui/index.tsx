import React from "react";
import getImageUrl from "../../../shared/lib/helpers/getImageUrl";
import getIntlPrice from "../../../shared/lib/helpers/getIntlPrice";
import OptionsSelector from "../../../widgets/OptionsSelector/ui";
import AddToCartButton from "../../../features/AddToCartButton/ui";
import pizzaReducer from "../../../widgets/PriceBlock/lib/utils/pizzaReducer";
import { Link } from "react-router-dom";
import { Pizza } from "../../../shared/api/interfaces/index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/redux/store";
import { addToCart } from "../../../app/redux/slices/cartSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { PizzaState } from "../../../widgets/PriceBlock/lib/utils/interfaces";

const Card: React.FC<Omit<Pizza, "description" | "rating">> = ({ id, title, price, category, types, sizes, imageUrl }) => {
    const { pizzas } = useSelector((state: RootState) => state.pizzas);
    const { cart } = useSelector((state: RootState) => state.cart);

    const INITIAL_STATE = { type: types[0], size: sizes[0], price };

    const dispatch = useDispatch();
    
    const activeCount = React.useMemo(() => cart.find(({ id: _id }) => _id === id)?.items.reduce((acc, { count }) => (acc += count), 0), [cart, id]);
    const self = React.useMemo(() => pizzas.find(({ id: _id }) => _id === id), [id, pizzas]);

    const [state, dispatchPizza] = React.useReducer(pizzaReducer, INITIAL_STATE);
    
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [count, setCount] = React.useState(activeCount ?? 0);

    const handleAddToCart = () => {
        setCount((prevState) => prevState + 1);
        dispatch(addToCart({ id, category, imageUrl, title, ...state }))
    };

    const handleChange = ({ type, payload }: PayloadAction<PizzaState>) => {
        dispatchPizza({ type, payload });
    };

    if (!self) {
        throw new Error(`Cannot find pizza with ${id} id`);
    }

    return (
        <article className='flex flex-col justify-center items-center max-w-[400px] max-md:min-w-full max-md:max-w-none'>
            <picture>
                <Link to={`pizza/${title}`}>
                    <img
                        loading='lazy'
                        src={imageLoaded ? imageUrl : getImageUrl("thumbnail.svg")}
                        alt={title}
                        onLoad={() => setImageLoaded(true)}
                        className='max-w-[250px] h-auto cursor-pointer'
                    />
                </Link>
            </picture>
            <div className='flex flex-col justify-center items-center gap-2 w-full'>
                <h2 className='text-primary-black font-bold text-lg cursor-pointer'>
                    <Link to={`pizza/${title}`}>{title}</Link>
                </h2>
                <OptionsSelector {...{ activeItem: self, state, handleChange, }}/>
                <div className='flex items-center justify-between w-full mt-[5px]'>
                    <span className='text-xl font-bold text-primary-black'>от {getIntlPrice(state.price)}</span>
                    <AddToCartButton title='Добавить' handleClick={handleAddToCart} initialCount={count} />
                </div>
            </div>
        </article>
    );
};

export default Card;