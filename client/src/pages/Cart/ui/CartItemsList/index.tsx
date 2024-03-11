import CartItem from "@/entities/Product/ui/CartItem";
import { CartListProps } from "../../model/interfaces";
import { useCart } from "../../lib/hooks/useCart";

const CartItemsList = ({ cart }: CartListProps) => {
    const { orderLoading } = useCart();

    return (
        <ul className='flex flex-col gap-5'>
            {cart.map((product) => (
                <CartItem
                    {...product}
                    key={`${product.productId}_${product.size}_${product.type}`}
                    loading={orderLoading}
                />
            ))}
        </ul>
    );
};

export default CartItemsList;