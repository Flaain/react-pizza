import CartItem from "@/entities/Product/ui/CartItem";
import { cartSelector } from "@/shared/model/selectors";
import { useAppSelector } from "@/shared/model/store";
import { CartListProps } from "../../model/interfaces";

const CartItemsList = ({ cart }: CartListProps) => {
    const { orderLoading } = useAppSelector(cartSelector);

    return (
        <ul className='flex flex-col gap-5'>
            {cart.flatMap((pizza) =>
                pizza.items.map((item) => (
                    <li key={`${pizza.id} - ${item.id}`}>
                        <CartItem
                            {...item}
                            itemId={item.id}
                            productId={pizza.id}
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