import React from "react";
import CartItem from "../../entities/CartItem/ui";
import { Props } from "./interfaces";

const CartItemsList: React.FC<Props> = ({ cart }) => {

    return (
        <ul className='flex flex-col gap-5'>
            {cart.flatMap((pizza) =>
                pizza.items.map((item) => (
                    <li key={`${pizza.id} - ${item.id}`}>
                        <CartItem
                            {...item}
                            pizzaId={pizza.id}
                            img={pizza.imageUrl}
                            title={pizza.title}
                            loading={orderLoading}
                        />
                    </li>
                ))
            )}
        </ul>
    );
};

export default CartItemsList;