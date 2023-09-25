import React from "react";
import CartItem from "../../entities/CartItem/ui";
import { Props } from "./interfaces";
import { CartContext } from "../../app/context";

const CartItemsList: React.FC<Props> = ({ cart }) => {
    const { orderLoading } = React.useContext(CartContext);

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