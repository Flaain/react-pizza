import CartItem from "@/entities/Product/ui/CartItem";
import { CartListProps } from "../../model/interfaces";

const CartItemsList = ({ cart }: CartListProps) => {
    return (
        <ul className='flex flex-col gap-5'>
            {cart.map((product) => (
                <CartItem
                    {...product}
                    key={`${product.productId}_${product.size}_${product.type}`}
                />
            ))}
        </ul>
    );
};

export default CartItemsList;