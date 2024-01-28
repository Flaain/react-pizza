import CartItem from "@/entities/Product/ui/CartItem";
import { cartSelector } from "@/shared/model/selectors";
import { useAppSelector } from "@/shared/model/store";
import { CartListProps } from "../../model/interfaces";

const CartItemsList = ({ cart }: CartListProps) => {
    const { orderLoading } = useAppSelector(cartSelector);

    return (
        <ul className='flex flex-col gap-5'>
            {cart.map((product) => (
                <CartItem
                    {...product}
                    key={`${product.id}_${product.size}_${product.type}`}
                    productId={product.id}
                    img={product.imageUrl}
                    loading={orderLoading}
                />
            ))}
        </ul>
    );
};

export default CartItemsList;